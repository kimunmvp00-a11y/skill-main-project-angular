import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { GENDER_OPTIONS } from '../../models/gender.model';
import { EMPLOYMENT_STATUS_OPTIONS } from '../../models/employment-status.model';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  private authService = inject(AuthService);
  private router = inject(Router);
  autenticando = false;
  mensajeError = '';

  // Estado del formulario
  modoFormulario: 'login' | 'registro' = 'login';
  mostrarFormularioEmail = false;

  // Datos del formulario
  email = '';
  password = '';
  nombre = '';
  confirmarPassword = '';
  genero = '';
  edad = '';
  situacionLaboral = '';
  genderOptions = GENDER_OPTIONS;
  employmentStatusOptions = EMPLOYMENT_STATUS_OPTIONS;

  // Estados de carga específicos
  autenticandoGoogle = false;
  autenticandoEmail = false;

  async iniciarSesionConGoogle(): Promise<void> {
    this.mensajeError = '';
    this.autenticandoGoogle = true;
    this.autenticando = true;

    try {
      const usuario = await this.authService.iniciarSesionConGoogle();

      if (usuario) {
        await this.router.navigate(['/chat']);

      } else {
        this.mensajeError = 'No se pudo obtener la información del usuario';
        console.error('❌ No se obtuvo información del usuario');
      }

    } catch (error: any) {
      console.error('❌ Error durante la autenticación:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        this.mensajeError = 'Has cerrado la ventana de autenticación. Intenta de nuevo.';
      } else if (error.code === 'auth/popup-blocked') {
        this.mensajeError = 'Tu navegador bloqueó la ventana de autenticación. Permite popups y vuelve a intentar.';
      } else if (error.code === 'auth/network-request-failed') {
        this.mensajeError = 'Error de conexión. Verifica tu internet y vuelve a intentar.';
      } else {
        this.mensajeError = 'Error al iniciar sesión. Por favor intenta de nuevo.';
      }

    } finally {
      this.autenticandoGoogle = false;
      this.autenticando = false;
    }
  }

  // ========================================================================================
  // MÉTODOS DE FORMULARIO EMAIL/PASSWORD
  // ========================================================================================

  toggleFormularioEmail(): void {
    this.mostrarFormularioEmail = !this.mostrarFormularioEmail;
    this.limpiarFormulario();
    this.mensajeError = '';
  }

  cambiarModoFormulario(): void {
    this.modoFormulario = this.modoFormulario === 'login' ? 'registro' : 'login';
    this.limpiarFormulario();
    this.mensajeError = '';
  }

  limpiarFormulario(): void {
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.confirmarPassword = '';
    this.genero = '';
    this.edad = '';
    this.situacionLaboral = '';
  }

  validarFormulario(): boolean {
    if (!this.email || !this.password) {
      this.mensajeError = 'Email y contraseña son obligatorios';
      return false;
    }

    if (this.password.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    if (this.modoFormulario === 'registro') {
      if (!this.nombre) {
        this.mensajeError = 'El nombre es obligatorio para el registro';
        return false;
      }

      if (this.password !== this.confirmarPassword) {
        this.mensajeError = 'Las contraseñas no coinciden';
        return false;
      }
    }

    return true;
  }

  async procesarFormularioEmail(): Promise<void> {
    if (!this.validarFormulario()) {
      return;
    }

    this.mensajeError = '';
    this.autenticandoEmail = true;
    this.autenticando = true;

    try {
      let usuario;

      if (this.modoFormulario === 'registro') {
        usuario = await this.authService.registrarConEmail(
          this.email,
          this.password,
          this.nombre,
          this.genero,
          this.edad,
          this.situacionLaboral
        );
      } else {
        usuario = await this.authService.iniciarSesionConEmail(this.email, this.password);
      }

      if (usuario) {
        await this.router.navigate(['/chat']);
      } else {
        this.mensajeError = 'No se pudo completar la operación';
      }

    } catch (error: any) {
      console.error('❌ Error en formulario email:', error);
      this.manejarErrorEmail(error);

    } finally {
      this.autenticandoEmail = false;
      this.autenticando = false;
    }
  }

  private manejarErrorEmail(error: any): void {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.mensajeError = 'Este email ya está registrado. Intenta iniciar sesión.';
        break;
      case 'auth/weak-password':
        this.mensajeError = 'La contraseña es muy débil. Usa al menos 6 caracteres.';
        break;
      case 'auth/invalid-email':
        this.mensajeError = 'El email no tiene un formato válido.';
        break;
      case 'auth/user-not-found':
        this.mensajeError = 'No existe una cuenta con este email.';
        break;
      case 'auth/wrong-password':
        this.mensajeError = 'Contraseña incorrecta.';
        break;
      case 'auth/invalid-credential':
        this.mensajeError = 'Email o contraseña incorrectos.';
        break;
      case 'auth/network-request-failed':
        this.mensajeError = 'Error de conexión. Verifica tu internet.';
        break;
      default:
        this.mensajeError = 'Error inesperado. Por favor intenta de nuevo.';
    }
  }

  ngOnInit(): void {
    this.authService.estaAutenticado$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['/chat']);
      }
    });
  }
}
