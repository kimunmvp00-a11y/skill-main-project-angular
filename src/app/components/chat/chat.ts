import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth';
import { ChatService } from '../../services/chat';
import { Usuario } from '../../models/usuario';
import { MensajeChat } from '../../models/chat';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit, OnDestroy, AfterViewChecked {
  
  private authService = inject(AuthService);
  private chatService = inject(ChatService);
  private router = inject(Router);
  
  // Referencia al contenedor de mensajes para hacer scroll automático
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  usuario: Usuario | null = null;                    // Información del usuario actual
  mensajes: MensajeChat[] = [];                   // Lista de mensajes del chat
  mensajeTexto = '';                     // Texto del mensaje que está escribiendo el usuario
  enviandoMensaje = false;               // Indica si se está enviando un mensaje
  asistenteEscribiendo = false;          // Indica si el asistente está generando una respuesta
  cargandoHistorial = false;             // Indica si se está cargando el historial
  mensajeError = '';                     // Mensaje de error para mostrar al usuario
  
  private suscripciones: Subscription[] = [];
  
  // Control para hacer scroll automático
  private debeHacerScroll = false;

  async ngOnInit(): Promise<void> {
    try {
      this.configurarSuscripciones();
      // El chat se inicializará cuando tengamos el usuario
    } catch (error) {
      console.error('❌ Error al inicializar el chat:', error);
      this.mensajeError = 'Error al cargar el chat. Intenta recargar la página.';
    }
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach(sub => sub.unsubscribe());
  }

  /**
   * Se ejecuta después de que Angular actualiza la vista
   * Lo usamos para hacer scroll automático cuando hay nuevos mensajes
   */
  ngAfterViewChecked(): void {
    if (this.debeHacerScroll) {
      this.scrollHaciaAbajo();
      this.debeHacerScroll = false;
    }
  }

  private configurarSuscripciones(): void {
    // Suscribirse al usuario autenticado
    const subUsuario = this.authService.usuario$.subscribe(async usuario => {
      this.usuario = usuario;
      if (!usuario) {
        this.router.navigate(['/auth']);
      } else {
        // Inicializamos el chat cuando tenemos el usuario
        await this.inicializarChat();
      }
    });

    // Suscribirse a los mensajes del chat
    const subMensajes = this.chatService.mensajes$.subscribe(mensajes => {
      this.mensajes = mensajes;
      this.debeHacerScroll = true;
    });
    
    // Suscribirse al estado del asistente
    const subAsistente = this.chatService.asistenteRespondiendo$.subscribe(respondiendo => {
      this.asistenteEscribiendo = respondiendo;
      if (respondiendo) {
        this.debeHacerScroll = true;
      }
    });
    
    this.suscripciones.push(subUsuario, subMensajes, subAsistente);
  }

  private async verificarAutenticacion(): Promise<void> {
    // Esperamos a que tengamos el usuario desde la suscripción
    if (!this.usuario) {
      await this.router.navigate(['/auth']);
      throw new Error('Usuario no autenticado');
    }
  }

  private async inicializarChat(): Promise<void> {
    if (!this.usuario) return;
    
    this.cargandoHistorial = true;
    
    try {
      // Inicializamos el chat con el ID del usuario
      await this.chatService.inicializarChat(this.usuario.uid);
      
    } catch (error) {
      console.error('❌ Error al inicializar chat en componente:', error);
      throw error;
      
    } finally {
      this.cargandoHistorial = false;
    }
  }



  async enviarMensaje(): Promise<void> {
    // Validamos que hay texto para enviar
    if (!this.mensajeTexto.trim()) {
      return;
    }
    
    // Limpiamos errores previos
    this.mensajeError = '';
    this.enviandoMensaje = true;
    
    // Guardamos el texto del mensaje y limpiamos el input
    const texto = this.mensajeTexto.trim();
    this.mensajeTexto = '';
    
    try {
      // Enviamos el mensaje usando el servicio de chat
      await this.chatService.enviarMensaje(texto);
      
      // Hacemos focus en el input para continuar escribiendo
      this.enfocarInput();
      
    } catch (error: any) {
      console.error('❌ Error al enviar mensaje:', error);
      
      // Mostramos el error al usuario
      this.mensajeError = error.message || 'Error al enviar el mensaje';
      
      // Restauramos el texto en el input
      this.mensajeTexto = texto;
      
    } finally {
      this.enviandoMensaje = false;
    }
  }

  manejarTeclaPresionada(evento: KeyboardEvent): void {
    // Enter sin Shift envía el mensaje
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      this.enviarMensaje();
    }
  }


  private scrollHaciaAbajo(): void {
    try {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } catch (error) {
      // Error al hacer scroll
    }
  }


  private enfocarInput(): void {
    setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 100);
  }


  formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formatea el contenido de los mensajes del asistente
   * Convierte texto plano en HTML básico
   */
  formatearMensajeAsistente(contenido: string): string {
    return contenido
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  trackByMensaje(index: number, mensaje: MensajeChat): string {
    return mensaje.id || `${mensaje.tipo}-${mensaje.fechaEnvio.getTime()}`;
  }


}
