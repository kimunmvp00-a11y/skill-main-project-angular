import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
    icono: string;
    titulo: string;
    descripcion: string;
    color: 'yellow' | 'purple' | 'blue';
}

@Component({
    selector: 'app-landing-features',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-features.html',
    styleUrl: './landing-features.css'
})
export class LandingFeatures {

    features: Feature[] = [
        {
            icono: 'route',
            titulo: 'Rutas de Aprendizaje Personalizadas',
            descripcion: 'Cursos adaptados a tu perfil profesional, metas y disponibilidad. IA que entiende tu camino.',
            color: 'yellow'
        },
        {
            icono: 'trending_up',
            titulo: 'Habilidades del Futuro',
            descripcion: 'Desarrolla competencias en alta demanda: IA, Data Science, Liderazgo Digital y más.',
            color: 'purple'
        },
        {
            icono: 'support_agent',
            titulo: 'Acompañamiento Experto',
            descripcion: 'Coaches y mentores certificados que guían tu proceso de crecimiento profesional.',
            color: 'blue'
        }
    ];

    getColorClasses(color: 'yellow' | 'purple' | 'blue'): string {
        const colors = {
            yellow: 'bg-card-yellow/20 border-card-yellow/30',
            purple: 'bg-accent-purple/20 border-accent-purple/30',
            blue: 'bg-card-blue/30 border-card-blue/40'
        };
        return colors[color];
    }

    getIconBgClass(color: 'yellow' | 'purple' | 'blue'): string {
        const colors = {
            yellow: 'bg-card-yellow',
            purple: 'bg-accent-purple',
            blue: 'bg-card-blue'
        };
        return colors[color];
    }
}
