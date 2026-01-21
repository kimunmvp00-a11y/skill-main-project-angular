import { Component, inject, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Estado del componente
  usuario: Usuario | null = null;
  rutaActiva = '';
  
  // Subscripciones
  private subscription = new Subscription();

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.suscribirseARutas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private cargarDatosUsuario(): void {
    const userSub = this.authService.usuario$.subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        console.error('❌ Error al cargar usuario en navbar:', error);
      }
    });

    this.subscription.add(userSub);
  }

  private suscribirseARutas(): void {
    // Obtener ruta inicial
    this.rutaActiva = this.router.url;

    // Suscribirse a cambios de ruta
    const routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.rutaActiva = event.urlAfterRedirects;
      });

    this.subscription.add(routeSub);
  }

  // ========================================================================================
  // MÉTODOS DE NAVEGACIÓN
  // ========================================================================================

  irAOnboarding(): void {
    console.log('📋 Navegando a onboarding...');
    this.router.navigate(['/onboarding']);
  }

  irAChat(): void {
    console.log('💬 Navegando al chat...');
    this.router.navigate(['/chat']);
  }

  cerrarSesion(): void {
    console.log('👋 Cerrando sesión desde navbar...');
    this.authService.cerrarSesion().then(() => {
      this.router.navigate(['/auth']);
    }).catch((error) => {
      console.error('❌ Error al cerrar sesión:', error);
    });
  }

  // ========================================================================================
  // MÉTODOS DE UTILIDAD
  // ========================================================================================

  obtenerIniciales(nombre?: string): string {
    if (!nombre) return 'U';
    
    const palabras = nombre.split(' ');
    if (palabras.length === 1) {
      return palabras[0].charAt(0).toUpperCase();
    }
    
    return (palabras[0].charAt(0) + palabras[1].charAt(0)).toUpperCase();
  }

  estaActiva(ruta: string): boolean {
    return this.rutaActiva === ruta || this.rutaActiva.startsWith(ruta + '/');
  }

  obtenerTituloRuta(): string {
    switch (this.rutaActiva) {
      case '/onboarding':
        return '📋 Bienvenida';
      case '/chat':
        return '💬 Chat';
      default:
        return '🏠 Inicio';
    }
  }

}