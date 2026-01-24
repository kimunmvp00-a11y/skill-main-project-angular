import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/landing/landing-page/landing-page').then(m => m.LandingPage),
        title: "SkillMain - Impulsa tu Carrera Profesional"
    },
    {
        path: 'auth',
        loadComponent: () => import('./components/auth/auth').then(m => m.Auth),
        title: "Iniciar sesión - SkillMain"
    },
    {
        path: 'onboarding-wizard',
        loadComponent: () => import('./components/onboarding-wizard/onboarding-wizard').then(m => m.OnboardingWizard),
        title: "Completa tu perfil - SkillMain",
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding',
        loadComponent: () => import('./components/onboarding/onboarding').then(m => m.Onboarding),
        title: "Bienvenida - SkillMain",
        canActivate: [AuthGuard]
    },
    {
        path: 'chat',
        loadComponent: () => import('./components/chat/chat').then(m => m.Chat),
        title: "Chat - SkillMain",
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
