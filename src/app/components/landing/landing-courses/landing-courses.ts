import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Curso {
    titulo: string;
    categoria: string;
    progreso: number;
    totalLecciones: number;
    leccionesCompletadas: number;
    estudiantes: number;
    color: 'yellow' | 'purple' | 'blue';
}

@Component({
    selector: 'app-landing-courses',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-courses.html',
    styleUrl: './landing-courses.css'
})
export class LandingCourses {

    constructor(private router: Router) { }

    cursos: Curso[] = [
        {
            titulo: 'Marketing Digital Avanzado',
            categoria: 'MARKETING',
            progreso: 25,
            totalLecciones: 20,
            leccionesCompletadas: 5,
            estudiantes: 1240,
            color: 'yellow'
        },
        {
            titulo: 'Data Science & Machine Learning',
            categoria: 'TECNOLOGÍA',
            progreso: 60,
            totalLecciones: 32,
            leccionesCompletadas: 19,
            estudiantes: 890,
            color: 'purple'
        },
        {
            titulo: 'Liderazgo en Equipos Remotos',
            categoria: 'LIDERAZGO',
            progreso: 40,
            totalLecciones: 15,
            leccionesCompletadas: 6,
            estudiantes: 2100,
            color: 'blue'
        }
    ];

    getCardBgClass(color: 'yellow' | 'purple' | 'blue'): string {
        const colors = {
            yellow: 'bg-card-yellow',
            purple: 'bg-accent-purple',
            blue: 'bg-card-blue'
        };
        return colors[color];
    }

    getBorderClass(color: 'yellow' | 'purple' | 'blue'): string {
        const colors = {
            yellow: 'border-card-yellow',
            purple: 'border-accent-purple',
            blue: 'border-card-blue'
        };
        return colors[color];
    }

    formatStudents(num: number): string {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace('.0', '') + 'K';
        }
        return num.toString();
    }

    irACursos(): void {
        this.router.navigate(['/auth']);
    }
}
