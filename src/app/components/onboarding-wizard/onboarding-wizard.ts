import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnboardingService, OnboardingState } from '../../services/onboarding.service';
import { AuthService } from '../../services/auth';
import { Skill } from '../../models/skill';
import { InterestToGrow } from '../../models/interestToGrow';
import { ProfetionalExp } from '../../models/profetionalExp';
import { Studie } from '../../models/studie';

@Component({
    selector: 'app-onboarding-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './onboarding-wizard.html',
    styleUrl: './onboarding-wizard.css'
})
export class OnboardingWizard implements OnInit {
    private onboardingService = inject(OnboardingService);
    private authService = inject(AuthService);
    private router = inject(Router);

    state!: OnboardingState;
    userId = '';
    loading = false;
    saving = false;

    // Opciones disponibles
    availableInterests: InterestToGrow[] = [];
    availableSkills: Skill[] = [];

    // Nuevos items temporales para agregar
    newExperience: Partial<ProfetionalExp> = {};
    newStudy: Partial<Studie> = {};

    async ngOnInit() {
        this.loading = true;

        // Obtener el ID del usuario autenticado
        const user = await this.authService.obtenerUsuarioActual();
        if (user) {
            this.userId = user.uid;

            // Cargar progreso existente o inicializar estado
            await this.onboardingService.loadProgress(this.userId);
        }

        // Suscribirse al estado
        this.onboardingService.state$.subscribe(state => {
            this.state = state;
        });

        // Cargar opciones de Firestore
        this.availableInterests = await this.onboardingService.loadAvailableInterests();
        this.availableSkills = await this.onboardingService.loadAvailableSkills();

        this.loading = false;
    }

    get currentStep(): number {
        return this.state?.currentStep || 0;
    }

    get progress(): number {
        return ((this.currentStep + 1) / 4) * 100;
    }

    // Navegación
    nextStep() {
        this.onboardingService.nextStep();
    }

    previousStep() {
        this.onboardingService.previousStep();
    }

    goToStep(step: number) {
        this.onboardingService.goToStep(step);
    }

    // Toggle selection de intereses/skills
    toggleInterest(interest: InterestToGrow) {
        const selected = this.state.selectedInterests;
        const index = selected.findIndex(i => i.uid === interest.uid);

        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(interest);
        }

        this.onboardingService.updateState({ selectedInterests: selected });
    }

    isInterestSelected(interest: InterestToGrow): boolean {
        return this.state.selectedInterests.some(i => i.uid === interest.uid);
    }

    toggleSkill(skill: Skill) {
        const selected = this.state.selectedSkills;
        const index = selected.findIndex(s => s.uid === skill.uid);

        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(skill);
        }

        this.onboardingService.updateState({ selectedSkills: selected });
    }

    isSkillSelected(skill: Skill): boolean {
        return this.state.selectedSkills.some(s => s.uid === skill.uid);
    }

    // Gestión de experiencia profesional
    addExperience() {
        if (this.newExperience.cargo && this.newExperience.nombreEmpresa) {
            const exp: ProfetionalExp = {
                uid: `exp-${Date.now()}`,
                cargo: this.newExperience.cargo,
                nombreEmpresa: this.newExperience.nombreEmpresa,
                descripcion: this.newExperience.descripcion || '',
                categoria: this.newExperience.categoria || '',
                fechaInicio: this.newExperience.fechaInicio || new Date(),
                fechaFin: this.newExperience.fechaFin,
                fechaCreacion: new Date()
            };

            const experiences = [...this.state.experiences, exp];
            this.onboardingService.updateState({ experiences });

            // Limpiar formulario
            this.newExperience = {};
        }
    }

    removeExperience(uid: string) {
        const experiences = this.state.experiences.filter(e => e.uid !== uid);
        this.onboardingService.updateState({ experiences });
    }

    // Gestión de estudios
    addStudy() {
        if (this.newStudy.titulo && this.newStudy.nombreInstitucion) {
            const study: Studie = {
                uid: `study-${Date.now()}`,
                titulo: this.newStudy.titulo,
                nombreInstitucion: this.newStudy.nombreInstitucion,
                fechaInicio: this.newStudy.fechaInicio || new Date(),
                fechaFin: this.newStudy.fechaFin,
                fechaCreacion: new Date()
            };

            const studies = [...this.state.studies, study];
            this.onboardingService.updateState({ studies });

            // Limpiar formulario
            this.newStudy = {};
        }
    }

    removeStudy(uid: string) {
        const studies = this.state.studies.filter(s => s.uid !== uid);
        this.onboardingService.updateState({ studies });
    }

    // Guardar y continuar más tarde
    async saveAndContinueLater() {
        this.saving = true;
        try {
            await this.onboardingService.savePartialProgress(this.userId);
            await this.router.navigate(['/onboarding']);
        } catch (error) {
            console.error('Error guardando progreso:', error);
        } finally {
            this.saving = false;
        }
    }

    // Completar onboarding
    async completeOnboarding() {
        this.saving = true;
        try {
            await this.onboardingService.completeOnboarding(this.userId);
            await this.router.navigate(['/onboarding']);
        } catch (error) {
            console.error('Error completando onboarding:', error);
        } finally {
            this.saving = false;
        }
    }

    // Utilidades
    getStepTitle(): string {
        const titles = [
            '¿Qué te gustaría aprender?',
            '¿Cuáles son tus habilidades?',
            'Experiencia Profesional',
            'Educación'
        ];
        return titles[this.currentStep] || '';
    }

    getStepIcon(): string {
        const icons = ['🎯', '💡', '💼', '🎓'];
        return icons[this.currentStep] || '';
    }

    canProceed(): boolean {
        switch (this.currentStep) {
            case 0:
                return true; // Intereses son opcionales
            case 1:
                return true; // Habilidades son opcionales
            case 2:
                return true; // Experiencia es opcional
            case 3:
                return true; // Estudios son opcionales
            default:
                return false;
        }
    }
}
