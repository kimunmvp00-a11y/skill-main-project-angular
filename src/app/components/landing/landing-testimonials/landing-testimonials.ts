import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonio {
    nombre: string;
    rol: string;
    empresa: string;
    texto: string;
    avatar: string;
    rating: number;
}

@Component({
    selector: 'app-landing-testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-testimonials.html',
    styleUrl: './landing-testimonials.css'
})
export class LandingTestimonials {

    testimonioActual = 0;

    testimonios: Testimonio[] = [
        {
            nombre: 'María González',
            rol: 'Product Manager',
            empresa: 'TechCorp',
            texto: 'SkillMain transformó mi carrera. En 6 meses pasé de desarrolladora a Product Manager gracias a las rutas de aprendizaje personalizadas.',
            avatar: 'MG',
            rating: 5
        },
        {
            nombre: 'Carlos Rodríguez',
            rol: 'Data Scientist',
            empresa: 'InnovateCo',
            texto: 'Los coaches me ayudaron a identificar exactamente qué habilidades necesitaba. Ahora lidero el equipo de Data Science de mi empresa.',
            avatar: 'CR',
            rating: 5
        },
        {
            nombre: 'Ana Martínez',
            rol: 'Digital Marketing Lead',
            empresa: 'FutureInc',
            texto: 'La flexibilidad de aprender a mi ritmo y el contenido actualizado son increíbles. Recomiendo SkillMain a todos mis colegas.',
            avatar: 'AM',
            rating: 5
        }
    ];

    getStars(rating: number): number[] {
        return Array(rating).fill(0);
    }

    siguiente(): void {
        this.testimonioActual = (this.testimonioActual + 1) % this.testimonios.length;
    }

    anterior(): void {
        this.testimonioActual = (this.testimonioActual - 1 + this.testimonios.length) % this.testimonios.length;
    }

    irA(index: number): void {
        this.testimonioActual = index;
    }
}
