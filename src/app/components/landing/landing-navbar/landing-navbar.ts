import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-navbar.html',
    styleUrl: './landing-navbar.css'
})
export class LandingNavbar {
    menuAbierto = false;

    constructor(private router: Router) { }

    toggleMenu(): void {
        this.menuAbierto = !this.menuAbierto;
    }

    cerrarMenu(): void {
        this.menuAbierto = false;
    }

    irAAuth(): void {
        this.router.navigate(['/auth']);
    }

    scrollTo(sectionId: string): void {
        this.cerrarMenu();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
