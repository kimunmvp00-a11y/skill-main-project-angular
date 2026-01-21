import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-hero.html',
    styleUrl: './landing-hero.css'
})
export class LandingHero {

    constructor(private router: Router) { }

    irAAuth(): void {
        this.router.navigate(['/auth']);
    }

    scrollTo(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
