import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, Navbar],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class Onboarding implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Estado del componente
  usuario: Usuario | null = null;
  cargando = true;
  error = '';
  
  // Subscripción para limpiar
  private subscription = new Subscription();

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarDatosUsuario(): void {
    console.log('🔄 Cargando datos del usuario...');
    
    const userSub = this.authService.usuario$.subscribe({
      next: (usuario) => {
        console.log('👤 Usuario recibido:', usuario);
        this.usuario = usuario;
        this.cargando = false;
        
        // Si no hay usuario, redirigir a auth
        if (!usuario) {
          console.log('❌ No hay usuario autenticado, redirigiendo...');
          this.router.navigate(['/auth']);
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar usuario:', error);
        this.error = 'Error al cargar los datos del usuario';
        this.cargando = false;
      }
    });

    this.subscription.add(userSub);
  }

  // ========================================================================================
  // MÉTODOS DE NAVEGACIÓN
  // ========================================================================================

  irAChat(): void {
    console.log('🚀 Navegando al chat...');
    this.router.navigate(['/chat']);
  }

  irAOnboarding(): void {
    console.log('📋 Ya estás en onboarding');
  }

  cerrarSesion(): void {
    console.log('👋 Cerrando sesión...');
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

  obtenerTiempoDesdeCreacion(): string {
    if (!this.usuario?.fechaCreacion) return 'Fecha no disponible';
    
    const now = new Date();
    const creacion = this.usuario.fechaCreacion instanceof Date 
      ? this.usuario.fechaCreacion 
      : new Date(this.usuario.fechaCreacion);
    
    const diff = now.getTime() - creacion.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    if (dias < 30) return `Hace ${dias} días`;
    if (dias < 365) {
      const meses = Math.floor(dias / 30);
      return meses === 1 ? 'Hace 1 mes' : `Hace ${meses} meses`;
    }
    
    const años = Math.floor(dias / 365);
    return años === 1 ? 'Hace 1 año' : `Hace ${años} años`;
  }

  formatearFecha(fecha: Date): string {
    if (!fecha) return 'Fecha no disponible';
    
    const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
    
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}