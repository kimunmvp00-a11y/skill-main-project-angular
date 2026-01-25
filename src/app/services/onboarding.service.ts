import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore';
import { Skill } from '../models/skill';
import { InterestToGrow } from '../models/interestToGrow';
import { ProfetionalExp } from '../models/profetionalExp';
import { Studie } from '../models/studie';
import { Perfil } from '../models/profile';
import { BehaviorSubject, Observable } from 'rxjs';

export interface OnboardingState {
    currentStep: number;
    selectedInterests: InterestToGrow[];
    selectedSkills: Skill[];
    experiences: ProfetionalExp[];
    studies: Studie[];
}

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    private firestoreService = inject(FirestoreService);

    private stateSubject = new BehaviorSubject<OnboardingState>({
        currentStep: 0,
        selectedInterests: [],
        selectedSkills: [],
        experiences: [],
        studies: []
    });

    state$ = this.stateSubject.asObservable();

    // Obtener intereses disponibles desde Firestore
    async loadAvailableInterests(): Promise<InterestToGrow[]> {
        try {
            const interests = await this.firestoreService.obtenerDocumentos<any>('interestToGrow');
            return interests.map(doc => ({ ...doc, uid: doc.id }));
        } catch (error) {
            console.error('Error loading interests:', error);
            return [];
        }
    }

    // Obtener habilidades disponibles desde Firestore
    async loadAvailableSkills(): Promise<Skill[]> {
        try {
            const skills = await this.firestoreService.obtenerDocumentos<any>('skills');
            return skills.map(doc => ({ ...doc, uid: doc.id }));
        } catch (error) {
            console.error('Error loading skills:', error);
            return [];
        }
    }

    // Actualizar estado
    updateState(updates: Partial<OnboardingState>): void {
        const currentState = this.stateSubject.value;
        this.stateSubject.next({ ...currentState, ...updates });
    }

    // Navegar entre pasos
    goToStep(step: number): void {
        this.updateState({ currentStep: step });
    }

    nextStep(): void {
        const currentState = this.stateSubject.value;
        if (currentState.currentStep < 3) {
            this.updateState({ currentStep: currentState.currentStep + 1 });
        }
    }

    previousStep(): void {
        const currentState = this.stateSubject.value;
        if (currentState.currentStep > 0) {
            this.updateState({ currentStep: currentState.currentStep - 1 });
        }
    }

    // Guardar progreso parcial
    async savePartialProgress(userId: string): Promise<void> {
        const state = this.stateSubject.value;

        const perfil: Partial<Perfil> = {
            usuario_uid: userId,
            onboardingCompletado: false,
            onboardingStep: state.currentStep,
            interests: state.selectedInterests,
            skills: state.selectedSkills,
            profetionalExps: state.experiences,
            studies: state.studies,
            ultimaActualizacion: new Date()
        };

        try {
            await this.firestoreService.guardarDocumentoConId('perfiles', userId, perfil as Perfil);
            console.log('✅ Progreso parcial guardado');
        } catch (error) {
            console.error('❌ Error guardando progreso parcial:', error);
            throw error;
        }
    }

    // Completar onboarding
    async completeOnboarding(userId: string): Promise<void> {
        const state = this.stateSubject.value;

        const perfil: Perfil = {
            usuario_uid: userId,
            fechaCreacion: new Date(),
            ultimaActualizacion: new Date(),
            onboardingCompletado: true,
            onboardingStep: 4,
            interests: state.selectedInterests,
            skills: state.selectedSkills,
            profetionalExps: state.experiences,
            studies: state.studies
        };

        try {
            await this.firestoreService.guardarDocumentoConId('perfiles', userId, perfil);
            console.log('✅ Onboarding completado');
            this.resetState();
        } catch (error) {
            console.error('❌ Error completando onboarding:', error);
            throw error;
        }
    }

    // Cargar progreso existente
    async loadProgress(userId: string): Promise<void> {
        try {
            const perfil = await this.firestoreService.obtenerDocumento<Perfil>('perfiles', userId);

            if (perfil && !perfil.onboardingCompletado) {
                this.stateSubject.next({
                    currentStep: perfil.onboardingStep || 0,
                    selectedInterests: perfil.interests || [],
                    selectedSkills: perfil.skills || [],
                    experiences: perfil.profetionalExps || [],
                    studies: perfil.studies || []
                });
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    // Resetear estado
    resetState(): void {
        this.stateSubject.next({
            currentStep: 0,
            selectedInterests: [],
            selectedSkills: [],
            experiences: [],
            studies: []
        });
    }

    getCurrentState(): OnboardingState {
        return this.stateSubject.value;
    }
}
