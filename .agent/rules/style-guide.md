---
trigger: always_on
---

# Guía de Diseño SkillMain - Design System Completo

## 📋 Tabla de Contenidos
1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Sistema de Colores](#sistema-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado y Grid](#espaciado-y-grid)
5. [Componentes Base](#componentes-base)
6. [Patrones de Diseño](#patrones-de-diseño)
7. [Responsive Design](#responsive-design)
8. [Animaciones y Transiciones](#animaciones-y-transiciones)
9. [Ejemplos de Implementación](#ejemplos-de-implementación)

---

## 🎨 Filosofía de Diseño

### Principios Core
- **Mobile First**: Diseñar primero para dispositivos móviles y escalar hacia arriba
- **Modernidad Vibrante**: Colores audaces, formas redondeadas, elementos dinámicos
- **Claridad Funcional**: Interfaz limpia que prioriza la usabilidad
- **Consistencia Visual**: Mismo lenguaje de diseño en todos los artefactos

### Características Visuales Distintivas
- Bordes redondeados generosos (24px - 40px)
- Colores vibrantes con overlays semitransparentes
- Sombras suaves y difusas
- Elementos flotantes y blobs decorativos
- Tarjetas con hover interactivo

---

## 🎨 Sistema de Colores

### Paleta Principal

```javascript
// Configuración Tailwind requerida
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#ff5734",        // Coral vibrante - CTAs principales
        "background-light": "#f7f7f5", // Fondo claro principal
        "background-dark": "#151313",  // Fondo oscuro principal
        accent: {
          purple: "#be94f5",       // Tarjetas/elementos decorativos
          yellow: "#fccc42",       // Tarjetas/highlights
          dark: "#151313"          // Texto sobre fondos claros
        }
      }
    }
  }
}
```

### Colores de Tarjetas
```css
/* Colores específicos para cards de cursos */
.card-yellow: #fccc42   /* Marketing, creative, branding */
.card-purple: #be94f5   /* Tech, data, analytics */
.card-blue: #b2e3f9     /* Leadership, soft skills */
.dark-gray: #1c1c1c     /* Elementos oscuros, sidebar */
```

### Uso de Colores

#### Fondos
- **Light Mode**: `bg-background-light` (#f7f7f5)
- **Dark Mode**: `bg-background-dark` (#151313)
- **Tarjetas**: `bg-white dark:bg-[#252525]`
- **Elementos elevados**: `bg-white/80 backdrop-blur-md`

#### Texto
- **Primario Light**: `text-accent-dark` (#151313)
- **Primario Dark**: `text-white` o `text-background-light`
- **Secundario**: `text-gray-500`, `text-gray-400`
- **Terciario/Disabled**: `text-gray-400 dark:text-gray-600`

#### Acentos
- **CTAs principales**: `bg-primary text-white`
- **Hover CTAs**: `hover:opacity-90` o `hover:bg-primary/90`
- **Links**: `text-primary hover:underline`
- **Badges**: Usar colores de tarjeta según categoría

---

## ✍️ Tipografía

### Fuente Display - Kodchasan
**Uso**: Headings, títulos, logo, navegación

```html
<!-- Import requerido -->
<link href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@400;500;600;700&display=swap" rel="stylesheet"/>
```

```css
/* Configuración Tailwind */
fontFamily: {
  display: ["Kodchasan", "sans-serif"]
}

/* Aplicación */
h1, h2, h3, .font-display {
  font-family: 'Kodchasan', sans-serif;
}
```

### Fuente Body - Inter (fallback: sans-serif)
**Uso**: Texto de párrafos, forms, UI elements

```css
body {
  font-family: 'Inter', sans-serif;
}
```

### Escala Tipográfica

#### Mobile (Base)
```css
/* Headings */
.h1-mobile: text-3xl (30px) font-bold
.h2-mobile: text-2xl (24px) font-bold
.h3-mobile: text-xl (20px) font-bold

/* Body */
.body-large: text-base (16px)
.body-normal: text-sm (14px)
.body-small: text-xs (12px)
```

#### Tablet (sm: 640px+)
```css
.h1-tablet: text-4xl (36px) font-bold
.h2-tablet: text-3xl (30px) font-bold
.h3-tablet: text-2xl (24px) font-bold
```

#### Desktop (lg: 1024px+)
```css
.h1-desktop: text-5xl lg:text-7xl (48px - 72px) font-bold
.h2-desktop: text-3xl md:text-5xl (30px - 48px) font-bold
.h3-desktop: text-2xl (24px) font-bold
```

### Jerarquía de Peso
- **700 (Bold)**: Títulos principales, CTAs, labels importantes
- **600 (Semibold)**: Subtítulos, navigation items
- **500 (Medium)**: Body text enfatizado
- **400 (Regular)**: Body text normal

### Tratamiento Especial

#### Logo
```html
<span class="text-2xl sm:text-3xl font-bold tracking-tighter font-display">
  Skill<span class="text-primary">Main</span>
</span>
```

#### Hero Headlines
```html
<h1 class="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-display">
  Texto con <span class="text-primary">palabra destacada</span>
</h1>
```

---

## 📐 Espaciado y Grid

### Sistema de Espaciado Responsive

#### Padding de Contenedores
```css
/* Mobile */
.container-padding: p-4 (16px)
.section-padding: p-6 (24px)

/* Tablet (sm: 640px) */
.container-padding: sm:p-6 (24px)
.section-padding: sm:p-8 (32px)

/* Desktop (lg: 1024px) */
.container-padding: lg:p-8 (32px)
.section-padding: lg:p-12 (48px)

/* Extra Large (xl: 1280px) */
.section-padding-xl: xl:p-16 (64px)
```

#### Gaps entre Elementos
```css
/* Elementos pequeños (inputs, botones) */
.gap-sm: gap-3 sm:gap-4 (12px - 16px)

/* Secciones de contenido */
.gap-md: gap-6 sm:gap-8 (24px - 32px)

/* Secciones principales */
.gap-lg: gap-8 sm:gap-12 (32px - 48px)
```

#### Espaciado Vertical
```css
/* Entre secciones */
.section-spacing: py-12 lg:py-24 (48px - 96px)

/* Dentro de tarjetas */
.card-spacing: space-y-4 sm:space-y-6 (16px - 24px)
```

### Grid System

#### Layout Principal
```html
<!-- Contenedor máximo -->
<div class="max-w-7xl mx-auto">
  <!-- Grid responsive -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Contenido -->
  </div>
</div>
```

#### Grids Comunes

**2 Columnas (50/50)**
```html
<div class="grid lg:grid-cols-2 gap-12 items-center">
  <!-- Contenido izquierdo -->
  <!-- Contenido derecho -->
</div>
```

**3 Columnas (Cards)**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Tarjeta 1 -->
  <!-- Tarjeta 2 -->
  <!-- Tarjeta 3 -->
</div>
```

**12 Columnas (Tabla/Lista)**
```html
<div class="grid grid-cols-12 items-center gap-4">
  <div class="col-span-6">Título</div>
  <div class="col-span-3">Metadata</div>
  <div class="col-span-3">Acción</div>
</div>
```

---

## 🧩 Componentes Base

### Botones

#### Botón Primario (CTA Principal)
```html
<button class="bg-primary text-white px-6 py-3 sm:px-10 sm:py-5 rounded-2xl font-bold text-sm sm:text-lg hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
  Texto del Botón
</button>
```

#### Botón Secundario
```html
<button class="bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 px-6 py-3 sm:px-10 sm:py-5 rounded-2xl font-bold text-sm sm:text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all">
  Texto del Botón
</button>
```

#### Botón con Icono
```html
<button class="bg-primary text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-sm sm:text-lg hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
  Get Started
  <span class="material-icons-outlined">arrow_forward</span>
</button>
```

#### Botón Pequeño (Continue en Cards)
```html
<button class="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
  Continue
</button>
```

### Inputs de Formulario

#### Input de Texto
```html
<div class="space-y-1.5">
  <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1" for="input-id">
    Label del Input
  </label>
  <input 
    type="text" 
    id="input-id"
    class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 dark:bg-dark-gray border-2 border-gray-200 dark:border-gray-700 rounded-custom focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm sm:text-base"
    placeholder="Placeholder text"
  />
</div>
```

#### Select/Dropdown
```html
<select class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 dark:bg-dark-gray border-2 border-gray-200 dark:border-gray-700 rounded-custom focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm sm:text-base">
  <option value="" disabled selected>Selecciona una opción</option>
  <option value="1">Opción 1</option>
  <option value="2">Opción 2</option>
</select>
```

#### Search Input
```html
<div class="relative w-full md:w-96">
  <input 
    type="text"
    class="w-full bg-white dark:bg-dark-gray border border-gray-200 dark:border-gray-700 rounded-full px-6 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
    placeholder="Search skills, courses..."
  />
  <button class="absolute right-1 top-1 bg-primary text-white p-1 rounded-full flex items-center justify-center">
    <span class="material-icons-outlined text-lg">search</span>
  </button>
</div>
```

### Tarjetas (Cards)

#### Card de Curso (Full Implementation)
```html
<div class="bg-card-yellow p-6 rounded-xl flex flex-col h-full text-gray-900 border-2 border-transparent hover:border-gray-900 transition-all cursor-pointer">
  <!-- Header con badge y bookmark -->
  <div class="flex justify-between items-start mb-6">
    <span class="bg-dark-gray text-white text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
      CATEGORÍA
    </span>
    <span class="material-icons-outlined">bookmark</span>
  </div>
  
  <!-- Título del curso -->
  <h3 class="text-xl font-bold mb-8 leading-tight">
    Nombre del Curso Completo
  </h3>
  
  <!-- Footer con progreso y CTA -->
  <div class="mt-auto">
    <!-- Progress bar -->
    <div class="flex justify-between text-xs font-bold mb-2">
      <span>Progress</span>
      <span>5/20 lessons</span>
    </div>
    <div class="w-full h-3 bg-black/10 rounded-full overflow-hidden mb-6">
      <div class="bg-dark-gray h-full w-1/4"></div>
    </div>
    
    <!-- Avatares y botón -->
    <div class="flex items-center justify-between">
      <div class="flex -space-x-2">
        <img src="avatar1.jpg" alt="User" class="w-8 h-8 rounded-full border-2 border-card-yellow"/>
        <img src="avatar2.jpg" alt="User" class="w-8 h-8 rounded-full border-2 border-card-yellow"/>
        <div class="w-8 h-8 rounded-full bg-dark-gray text-white flex items-center justify-center text-[10px] font-bold border-2 border-card-yellow">
          +120
        </div>
      </div>
      <button class="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
        Continue
      </button>
    </div>
  </div>
</div>
```

#### Card Informativa Simple
```html
<div class="p-10 rounded-[40px] bg-accent-yellow/10 border border-accent-yellow/20 hover:scale-[1.02] transition-transform">
  <!-- Icono -->
  <div class="w-16 h-16 bg-accent-yellow rounded-3xl flex items-center justify-center mb-8">
    <span class="material-icons-outlined text-accent-dark text-3xl">psychology</span>
  </div>
  
  <!-- Contenido -->
  <h3 class="text-2xl font-bold mb-4">Título de la Feature</h3>
  <p class="text-accent-dark/70 dark:text-background-light/70">
    Descripción de la característica o beneficio.
  </p>
</div>
```

### Navegación

#### Navbar Desktop/Mobile
```html
<nav class="fixed w-full z-50 px-6 py-4">
  <div class="max-w-7xl mx-auto flex justify-between items-center bg-white/80 dark:bg-accent-dark/80 backdrop-blur-md rounded-full px-8 py-3 border border-black/5 dark:border-white/5">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold tracking-tighter font-display">
        Skill<span class="text-primary">Main</span>
      </span>
    </div>
   
    <!-- Links (hidden en mobile) -->
    <div class="hidden md:flex items-center gap-8 font-medium">
      <a href="#" class="hover:text-primary transition-colors">Cursos</a>
      <a href="#" class="hover:text-primary transition-colors">Empresas</a>
      <a href="#" class="hover:text-primary transition-col