# 🍻 Yo Nunca - Juego de Beber

iIMPORTANTE PARA EL DEV SERVER :npx expo start --dev-client --scheme yonunca


App móvil multiplataforma (Android/iOS) del clásico juego de beber "Yo Nunca" para fiestas.

## 🎯 Características

### Juego
- ✅ 240 frases organizadas por dificultad (Medio, Picante, Muy Picante)
- ✅ Modo multijugador (2-20 jugadores)
- ✅ 120+ nombres aleatorios divertidos para jugadores
- ✅ Sistema anti-repetición inteligente
- ✅ Guardado automático de partidas
- ✅ Estadísticas en tiempo real y finales
- ✅ Estadísticas globales (récords, rachas, partidas jugadas)
- ✅ Frases personalizadas ilimitadas

### Visual
- ✅ Animación de cerveza en transiciones 🍺
- ✅ Burbujas animadas en pantalla de inicio 🫧
- ✅ Fuentes personalizadas (Bebas Neue + Nunito)
- ✅ Imagen de fondo personalizable
- ✅ Modo oscuro/claro con tema taberna
- ✅ Transiciones suaves sin parpadeos

### Técnico
- ✅ 100% offline (sin internet)
- ✅ Sin anuncios
- ✅ TypeScript con strict mode
- ✅ Performance optimizado

## 🛠️ Stack Tecnológico

- React Native
- Expo SDK 54+
- TypeScript
- React Navigation
- AsyncStorage

## 📦 Requisitos previos

- Node.js 18+ instalado
- npm o yarn
- Expo Go app en tu móvil (para desarrollo)
- Android Studio (opcional, para emulador)

## 🚀 Instalación y ejecución

### 1. Clonar repositorio

```bash
cd C:\Users\danie\APPS\yo-nunca
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar en desarrollo

```bash
npx expo start
```

### 4. Abrir en dispositivo

**Opción A: Expo Go (más fácil)**
- Instala "Expo Go" desde Play Store/App Store
- Escanea el QR code que aparece en terminal
- La app se abrirá en Expo Go

**Opción B: Emulador Android**
- Abre Android Studio → AVD Manager → Inicia emulador
- En terminal pulsa `a` (abrir en Android)

**Opción C: Emulador iOS (solo Mac)**
- En terminal pulsa `i` (abrir en iOS Simulator)

## 🏗️ Build para producción

### Generar APK (pruebas)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar
eas build:configure

# Build de preview (APK)
eas build --platform android --profile preview
```

### Generar AAB (Google Play)

```bash
eas build --platform android --profile production
```

## 📁 Estructura del proyecto

```
yo-nunca/
├── .claude/                    # Agentes y configuración de Claude Code
│   ├── agents/                 # Agentes especializados
│   │   ├── software-architect.md   # Arquitectura de software
│   │   ├── ux-designer.md          # UX/UI Design
│   │   ├── visual-designer.md      # Visual Design
│   │   ├── QUICKSTART.md           # Guía rápida de agentes
│   │   └── README.md               # Documentación de agentes
│   ├── commands/               # Comandos slash personalizados
│   │   ├── arch-*.md           # Comandos de arquitectura
│   │   ├── ux-*.md             # Comandos de UX
│   │   └── visual-*.md         # Comandos de diseño visual
│   └── skills/                 # Skills de tecnologías
│       ├── react/
│       ├── nextjs/
│       ├── shadcn-ui/
│       ├── docker/
│       ├── postgresql/
│       └── ...
├── src/                        # Código fuente
│   ├── screens/                # Pantallas principales
│   ├── components/             # Componentes reutilizables
│   ├── navigation/             # Configuración de navegación
│   ├── context/                # Context API (tema)
│   ├── hooks/                  # Custom hooks
│   ├── data/                   # Frases predefinidas
│   ├── utils/                  # Utilidades (storage, shuffle)
│   ├── constants/              # Constantes (colores)
│   ├── types/                  # TypeScript interfaces
│   └── legal/                  # Política de privacidad
├── assets/                     # Imágenes (icono, splash)
├── docs/                       # Documentación del proyecto
│   ├── planning/               # Documentos de planificación
│   ├── implementation/         # Documentos de implementación
│   ├── archive/                # Archivos históricos
│   ├── YO_NUNCA_DEVLOG.md      # DevLog del proyecto
│   └── INSTRUCCIONES_PARA_CLAUDE.md  # Instrucciones para IA
├── android/                    # Configuración Android nativa
├── fondo.png                   # Imagen de fondo de la app
├── App.tsx                     # Punto de entrada
├── package.json                # Dependencias
├── tsconfig.json               # Configuración TypeScript
├── app.json                    # Configuración Expo
└── eas.json                    # Configuración EAS Build
```

## 🎮 Cómo jugar

1. Reúne a tus amigos en círculo
2. Abre la app y pulsa "Jugar"
3. Lee en voz alta: "Yo nunca [frase]"
4. Todos los que SÍ lo hayan hecho, beben
5. Pulsa "Siguiente" para continuar

## 🧩 Funcionalidades principales

### Pantallas

- **HomeScreen:** Inicio con botones principales
- **GameScreen:** Muestra frases aleatorias sin repetir
- **CustomPhrasesScreen:** Gestiona frases personalizadas
- **SettingsScreen:** Configuración (tema, reset, etc.)

### Lógica anti-repetición

Las frases NO se repiten hasta agotar todo el pool (predefinidas + personalizadas). Cuando se agotan, se resetea automáticamente el pool.

### Persistencia

- Frases personalizadas: AsyncStorage (`@yonunca_custom_phrases`)
- Preferencia de tema: AsyncStorage (`@yonunca_theme`)

## 🎨 Personalización

### Cambiar colores

Edita [src/constants/Colors.ts](src/constants/Colors.ts):

```typescript
export const DarkTheme = {
  primary: '#FFD700',    // Cambiar color principal
  secondary: '#9D4EDD',  // Cambiar color secundario
  // ...
};
```

### Añadir más frases predefinidas

Edita [src/data/defaultPhrases.ts](src/data/defaultPhrases.ts):

```typescript
export const defaultPhrases: string[] = [
  "he mentido en mi CV",
  "tu nueva frase aquí",
  // ...
];
```

## ⚠️ Aviso legal

- App para **mayores de 18 años**
- Bebe responsablemente
- No conducir bajo los efectos del alcohol
- El contenido picante es opcional (puedes usar solo frases suaves)

## 🤖 Desarrollo con IA (Claude Code)

Este proyecto incluye agentes especializados de IA en la carpeta `.claude/` para ayudar en el desarrollo:

### Agentes Disponibles

- **Software Architect** (`/arch-review`, `/arch-init`) - Evaluación y diseño de arquitectura
- **UX/UI Designer** (`/ux-review`, `/ux-quickwins`) - Mejoras de experiencia de usuario
- **Visual Designer** (`/visual-review`, `/visual-colors`) - Diseño visual y sistemas de diseño

### Uso Rápido

```bash
# Evaluar arquitectura del proyecto
/arch-review

# Obtener mejoras rápidas de UX
/ux-quickwins

# Revisar diseño visual
/visual-review
```

Ver [`.claude/agents/QUICKSTART.md`](.claude/agents/QUICKSTART.md) para más detalles.

## 🔒 Privacidad

Esta app NO recopila datos personales. Todo se almacena localmente en tu dispositivo. Ver [Política de Privacidad](./docs/PRIVACY_POLICY.md) completa.

## 📄 Licencia

MIT License - Uso libre

## 🤝 Contribuciones

Pull requests bienvenidas. Para cambios grandes, abre primero un issue.

## 📧 Contacto

- Email: [danielfvera.codes@gmail.com]
- GitHub: [danielfvera]

## 🙏 Créditos

Desarrollado con ❤️ para fiestas épicas.

---

**¡Que empiece la fiesta! 🎉🍻**
