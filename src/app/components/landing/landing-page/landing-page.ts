import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingNavbar } from '../landing-navbar/landing-navbar';
import { LandingHero } from '../landing-hero/landing-hero';
import { LandingFeatures } from '../landing-features/landing-features';
import { LandingCourses } from '../landing-courses/landing-courses';
import { LandingTestimonials } from '../landing-testimonials/landing-testimonials';
import { LandingCta } from '../landing-cta/landing-cta';
import { LandingFooter } from '../landing-footer/landing-footer';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        LandingNavbar,
        LandingHero,
        LandingFeatures,
        LandingCourses,
        LandingTestimonials,
        LandingCta,
        LandingFooter
    ],
    templateUrl: './landing-page.html',
    styleUrl: './landing-page.css'
})
export class LandingPage { }
