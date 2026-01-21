import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-cta',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './landing-cta.html',
    styleUrl: './landing-cta.css'
})
export class LandingCta {

    email = '';
    enviando = false;
    enviado = false;

    constructor(private router: Router) { }

    enviarEmail(): void {
        if (!this.email) return;

        this.enviando = true;

        // Simular envío
        setTimeout(() => {
            this.enviando = false;
            this.enviado = true;
            this.email = '';

            // Reset después de 3 segundos
            setTimeout(() => {
                this.enviado = false;
            }, 3000);
        }, 1000);
    }

    irAAuth(): void {
        this.router.navigate(['/auth']);
    }
}
