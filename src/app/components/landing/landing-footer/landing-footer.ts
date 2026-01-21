import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-footer.html',
    styleUrl: './landing-footer.css'
})
export class LandingFooter {

    currentYear = new Date().getFullYear();

    constructor(private router: Router) { }

    scrollTo(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    irAAuth(): void {
        this.router.navigate(['/auth']);
    }
}
