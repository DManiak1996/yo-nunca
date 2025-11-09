# 📱 Checklist Completo: Play Store Android

Guía paso a paso para testear y publicar "Yo Nunca" en Google Play Store.

---

## 🎯 Resumen del Flujo

```
┌─────────────────┐
│  DESARROLLO     │  npx expo start (Expo Go)
│  Expo Go        │  ✅ UI/UX changes
│                 │  ❌ AdMob NO funciona
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PREVIEW BUILD  │  eas build --profile preview
│  Testing        │  ✅ TODO funciona (incluido AdMob)
│                 │  ✅ Testing en dispositivo real
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PRODUCTION     │  eas build --profile production
│  Play Store     │  ✅ APK final optimizado
│                 │  ✅ Upload a Play Store Console
└─────────────────┘
```

---

## FASE 1: DESARROLLO CON EXPO GO

### ¿Qué es Expo Go?
Expo Go es una app que permite testear tu proyecto sin compilar. Es rápido pero tiene limitaciones.

### Cómo usarlo

```bash
# En el directorio del proyecto
npx expo start --tunnel --port 8082
```

### ✅ Lo que SÍ funciona en Expo Go:
- Navegación entre pantallas
- Onboarding
- Configuración de jugadores
- Toda la lógica de juego
- UI/UX changes
- AsyncStorage
- Cambios de estilos y Design Tokens

### ❌ Lo que NO funciona en Expo Go:
- **Google AdMob** (requiere código nativo)
- BannerAdComponent se renderiza pero sin anuncios
- Anuncios intersticiales no aparecen
- Anuncios con recompensa no funcionan

### ⚠️ IMPORTANTE:
**NO puedes testear anuncios en Expo Go.** Debes crear un build de preview (siguiente fase) para ver los anuncios funcionando.

---

## FASE 2: PREVIEW BUILD (TESTING COMPLETO)

Esta es la fase CRÍTICA antes de publicar. Aquí testeas TODO en un dispositivo Android real.

### 2.1 Instalar EAS CLI (solo primera vez)

```bash
npm install -g eas-cli
```

### 2.2 Iniciar sesión en Expo

```bash
eas login
```

Te pedirá tu email y contraseña de Expo. Si no tienes cuenta, créala en https://expo.dev

### 2.3 Crear Preview Build

```bash
# Este comando compila un APK con anuncios de TEST de Google
eas build --profile preview --platform android
```

**Tiempo de compilación:** 10-20 minutos (depende de la cola de Expo)

**Resultado:** Recibirás una URL para descargar el APK

### 2.4 Instalar APK en dispositivo Android

1. **Descargar el APK** desde la URL proporcionada por EAS
2. **Transferir a tu Android** (via cable USB, email, Drive, etc.)
3. **Habilitar instalación desde fuentes desconocidas:**
   - Settings → Security → Allow installation from unknown sources
4. **Instalar el APK** desde el gestor de archivos

### 2.5 Testing Completo en Dispositivo Real

**Checklist de Testing:**

#### A) Testing de Anuncios
- [ ] **Banner en HomeScreen**: ¿Aparece el banner de Google AdMob?
- [ ] **Intersticial cada 4 juegos**: Juega 4 partidas, ¿aparece el anuncio?
- [ ] **Anuncios son de TEST**: Verifica que digan "Test Ad" o similar
- [ ] **No hay crashes**: Los anuncios cargan sin errores

#### B) Testing de Onboarding
- [ ] **Primera instalación**: ¿Aparece el onboarding en instalación limpia?
- [ ] **4 pasos funcionan**: Navegación adelante/atrás, botón "Saltar"
- [ ] **Guardado de estado**: Después de completar, no vuelve a aparecer
- [ ] **Ver tutorial de nuevo**: Desde Settings, funciona el botón

#### C) Testing de Accesibilidad
- [ ] **Habilitar TalkBack**: Settings → Accessibility → TalkBack
- [ ] **Probar navegación**: ¿Los elementos tienen labels descriptivos?
- [ ] **Touch targets**: ¿Los botones son fáciles de tocar?
- [ ] **Contraste de texto**: ¿Todo el texto es legible?

#### D) Testing de Flujos Principales
- [ ] **AgeGate**: Verificación de edad funciona
- [ ] **Selección de juego**: Clásico, Hot, Atrevido, Extremo
- [ ] **Modo Detectives**: Funciona correctamente
- [ ] **Configuración de jugadores**: 2-10 jugadores, nombres, avatares
- [ ] **Gameplay**: Todas las mecánicas funcionan (vidas, eliminaciones)
- [ ] **Estadísticas**: GlobalStatsScreen muestra datos correctos
- [ ] **Settings**: Todos los ajustes funcionan
- [ ] **Frases personalizadas**: Agregar/editar/eliminar funciona

#### E) Testing de Rendimiento
- [ ] **Carga inicial**: La app carga rápido (<3 segundos)
- [ ] **Transiciones**: Navegación suave entre pantallas
- [ ] **Sin memory leaks**: Jugar 20+ partidas sin crashes
- [ ] **Rotación de pantalla**: La app respeta portrait lock

#### F) Testing en Múltiples Dispositivos
Testea en al menos 2 dispositivos Android diferentes:
- [ ] **Dispositivo 1**: [Modelo/Android version]
- [ ] **Dispositivo 2**: [Modelo/Android version]
- [ ] **Diferentes tamaños**: Smartphone y tablet (si es posible)

### 2.6 Documentar Bugs Encontrados

Si encuentras bugs, documentalos:
```
- Bug: [Descripción]
- Pasos para reproducir: [1, 2, 3...]
- Dispositivo: [Modelo]
- Android: [Versión]
- Severidad: CRÍTICO / ALTA / MEDIA / BAJA
```

**CRÍTICO:** Bloquea publicación (crashes, anuncios no cargan, etc.)
**ALTA:** Importante pero no bloquea (UI rota, funcionalidad menor)
**MEDIA/BAJA:** Mejoras cosméticas o edge cases

### 2.7 Iterar (si es necesario)

Si encuentras bugs:
1. **Fijar bugs en el código**
2. **Commit y push cambios**
3. **Crear nuevo Preview Build**: `eas build --profile preview --platform android`
4. **Testear de nuevo**

**Repite hasta que TODO funcione perfectamente.**

---

## FASE 3: PREPARACIÓN PRE-PRODUCCIÓN

Antes de crear el build de producción, completa estos requisitos:

### 3.1 Configurar AdMob de Producción

**ACTUALMENTE:** La app usa Test IDs de Google (solo para desarrollo)

**ANTES DE PRODUCCIÓN:**
1. **Crear cuenta de AdMob**: https://admob.google.com
2. **Crear aplicación "Yo Nunca"** en AdMob
3. **Obtener App ID y Ad Unit IDs** (ver `/docs/ADMOB_SETUP.md`)
4. **Reemplazar Test IDs en el código**:
   - `app.json`: Reemplazar `androidAppId` con tu App ID real
   - `src/components/BannerAdComponent.tsx`: Reemplazar con tu Banner Ad Unit ID
   - `src/hooks/useInterstitialAd.ts`: Reemplazar con tu Interstitial Ad Unit ID

⚠️ **NO uses Test IDs en producción** o AdMob suspenderá tu cuenta.

### 3.2 Publicar Privacy Policy

**OBLIGATORIO PARA PLAY STORE:**

1. **Archivo listo**: `privacy-policy.html` (ya existe en tu proyecto)
2. **Publicar en GitHub Pages**:
   - Sube el archivo a tu repo
   - Settings → Pages → Source: main branch
   - URL generada: `https://[tu-usuario].github.io/yo-nunca/privacy-policy.html`
3. **Verificar que funciona**: Abre la URL en navegador
4. **Guardar URL**: La necesitarás para Play Store Console

**Alternativas a GitHub Pages**: Google Sites, Netlify, hosting propio (ver `/docs/PRIVACY_POLICY_SETUP.md`)

### 3.3 Crear Assets para Play Store

**REQUERIDOS por Google Play Store:**

#### A) Ícono de App (1024x1024 PNG)
- [ ] Ya existe en `/assets/icon.png` (verificar que sea 1024x1024)
- [ ] Fondo sólido (no transparente)
- [ ] Sin texto (solo logo/icono)

#### B) Feature Graphic (1024x500 PNG)
- [ ] Crear gráfico promocional
- [ ] Incluir nombre de la app y tagline
- [ ] Sin texto pequeño (debe verse bien en miniatura)
- [ ] Herramientas: Canva, Figma, Photoshop

#### C) Capturas de Pantalla (mínimo 2, máximo 8)
**Requerimientos:**
- Formato: PNG o JPG
- Mínimo: 2 screenshots
- Máximo: 8 screenshots
- Dimensiones recomendadas: 1080x1920 (portrait) o 1920x1080 (landscape)

**Screenshots sugeridos:**
1. HomeScreen (pantalla principal)
2. CategorySelectionScreen (selección de juego)
3. PlayerSetupScreen (configuración de jugadores)
4. GameScreenMultiplayer (gameplay en acción)
5. GlobalStatsScreen (estadísticas)
6. OnboardingScreen (tutorial de bienvenida)

**Cómo capturar:**
- Usa un dispositivo real o emulador
- Captura pantallas limpias (sin notificaciones)
- Considera agregar marcos de dispositivo (opcional pero profesional)

#### D) Descripción de la App

**Descripción corta (80 caracteres máximo):**
```
🍺 Yo Nunca - El mejor juego de fiesta para descubrir secretos con amigos
```

**Descripción completa (4000 caracteres máximo):**
Crea una descripción atractiva que incluya:
- ¿Qué es el juego?
- Características principales
- Modos de juego
- ¿Por qué es especial?
- Mencionar "gratis con anuncios no intrusivos"

Ejemplo (adáptalo a tu estilo):
```
🎉 YO NUNCA - EL JUEGO DE FIESTA DEFINITIVO

¿Quieres conocer los secretos más ocultos de tus amigos? ¿Buscas el juego perfecto para animar tus fiestas? ¡Yo Nunca es para ti!

🍺 ¿CÓMO SE JUEGA?
El clásico juego de fiesta ahora en tu móvil. Lee las preguntas de "Yo Nunca", y si lo has hecho, ¡pierdes una vida! El último jugador en pie gana.

🎮 MODOS DE JUEGO
• Clásico: El Yo Nunca tradicional de toda la vida
• Hot: Preguntas más picantes para romper el hielo
• Atrevido: Para grupos sin filtros
• Extremo: Solo para los más valientes
• Detectives: Descubre QUIÉN hizo qué

👥 CARACTERÍSTICAS
• 2-10 jugadores en un solo dispositivo
• Miles de preguntas variadas
• Frases personalizadas (añade tus propias preguntas)
• Estadísticas globales
• Avatares personalizables
• Tutorial interactivo
• Gratis con anuncios no intrusivos

🎨 DISEÑO INTUITIVO
Interfaz moderna y fácil de usar. Enfocada 100% en tu diversión.

💰 COMPLETAMENTE GRATIS
Gratis con anuncios discretos. Tu experiencia es nuestra prioridad.

🔒 PRIVACIDAD
Tus datos (nombres, frases, estadísticas) permanecen en tu dispositivo. Solo AdMob recopila datos para anuncios (como todas las apps gratuitas).

⚠️ Para mayores de 16 años

📧 Contacto: [tu-email@ejemplo.com]
🔗 Privacy Policy: [URL de tu privacy policy]
```

### 3.4 Clasificación de Contenido

**ESRB / PEGI Rating:**

La app contiene:
- Referencias a alcohol
- Preguntas de contenido adulto (modo Hot, Atrevido, Extremo)
- No hay violencia ni contenido sexual explícito

**Rating recomendado**:
- PEGI: 16+
- ESRB: Teen o Mature 17+

**En Play Store Console:**
- Completa el cuestionario de clasificación de contenido
- Responde honestamente sobre el contenido de la app
- Google determinará el rating automáticamente

### 3.5 Verificar Datos del Desarrollador

En Play Store Console, asegúrate de completar:
- [ ] **Nombre del desarrollador**: [Tu nombre o empresa]
- [ ] **Email de contacto**: Público, para que usuarios te contacten
- [ ] **Sitio web** (opcional): Si tienes uno
- [ ] **Dirección física** (opcional pero recomendado)

---

## FASE 4: PRODUCTION BUILD

Una vez que TODO esté listo y testeado:

### 4.1 Actualizar app.json

Verifica estos campos en `app.json`:

```json
{
  "expo": {
    "name": "Yo Nunca",
    "slug": "yo-nunca",
    "version": "1.0.0",
    "android": {
      "package": "com.anonymous.yonunca",  // Verifica que sea único
      "versionCode": 1,                     // Incrementa para updates futuros
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2C1810"
      },
      "permissions": [
        "ACCESS_NETWORK_STATE",
        "INTERNET"
      ]
    }
  }
}
```

**Importante:**
- `version`: Versión visible para usuarios (1.0.0, 1.0.1, etc.)
- `versionCode`: Número interno (1, 2, 3...). DEBE incrementarse en cada update.

### 4.2 Crear Production Build

```bash
# Crear APK optimizado de producción
eas build --profile production --platform android
```

**Tiempo:** 15-30 minutos

**Resultado:** URL para descargar APK final (optimizado y firmado)

### 4.3 Descargar y Verificar APK

1. **Descargar APK** de la URL proporcionada
2. **Verificar tamaño**: Objetivo <50MB (Play Store limit: 150MB para APK)
3. **Instalar en dispositivo** y hacer smoke test rápido:
   - La app abre sin crashes
   - Los anuncios de PRODUCCIÓN aparecen (si ya configuraste IDs reales)
   - Todo funciona igual que en preview

⚠️ **NO distribuyas este APK públicamente** hasta que esté aprobado por Play Store.

---

## FASE 5: PUBLICACIÓN EN PLAY STORE

### 5.1 Crear Cuenta de Google Play Developer

**Costo:** $25 USD (pago único, de por vida)

**Pasos:**
1. Ve a https://play.google.com/console
2. Haz clic en "Crear cuenta de desarrollador"
3. Paga $25 USD con tarjeta de crédito/débito
4. Completa tu perfil de desarrollador
5. Acepta los términos y condiciones

**Tiempo de aprobación:** Instantáneo a 48 horas

### 5.2 Crear Nueva Aplicación

1. En Play Store Console, haz clic en **"Crear aplicación"**
2. **Nombre de la app**: "Yo Nunca"
3. **Idioma predeterminado**: Español (España) o Español (Latinoamérica)
4. **Tipo**: Aplicación
5. **Gratis o de pago**: Gratis
6. **Declaraciones obligatorias**: Acepta las políticas

### 5.3 Completar Información de la App

#### Store Presence (Presencia en la tienda)

**Main Store Listing:**
- [ ] **Título de la app**: Yo Nunca (máx. 50 caracteres)
- [ ] **Descripción corta**: [La que creaste en 3.3.D]
- [ ] **Descripción completa**: [La que creaste en 3.3.D]
- [ ] **Ícono de la app**: Subir `icon.png` (1024x1024)
- [ ] **Feature Graphic**: Subir gráfico 1024x500
- [ ] **Capturas de pantalla**: Subir 2-8 screenshots
- [ ] **Categoría**: Juegos → Casual o Juegos → Fiesta
- [ ] **Tags** (opcional): fiesta, yo nunca, juego para beber

**Contact Details:**
- [ ] **Email**: Tu email de contacto público
- [ ] **Teléfono** (opcional)
- [ ] **Sitio web** (opcional)
- [ ] **Privacy Policy URL**: La URL de GitHub Pages o tu hosting

#### Store Settings

- [ ] **Contenido de la app**: Completa el cuestionario
- [ ] **Target audience**: 16+ años
- [ ] **News app**: No
- [ ] **Declaración de seguridad de datos**: Completa el cuestionario (declara uso de AdMob)

### 5.4 Configurar Versión de Producción

**Release → Production:**

1. Haz clic en **"Create release"**
2. **Subir APK**: Arrastra el APK de producción (de EAS Build)
3. **Nombre de la versión** (opcional): "1.0.0 - Lanzamiento inicial"
4. **Notas de la versión** (release notes en español):
   ```
   🎉 Primera versión de Yo Nunca

   • 4 modos de juego (Clásico, Hot, Atrevido, Extremo)
   • Modo Detectives para descubrir secretos
   • 2-10 jugadores
   • Frases personalizadas
   • Estadísticas globales
   • Tutorial interactivo

   ¡Descarga gratis y empieza la fiesta! 🍺
   ```
5. Guarda la versión

### 5.5 Revisión Antes de Enviar

**Checklist final:**
- [ ] Privacy Policy URL funciona (no devuelve 404)
- [ ] Capturas de pantalla suben correctamente
- [ ] Descripción no tiene errores gramaticales
- [ ] APK subido correctamente (tamaño razonable)
- [ ] Clasificación de contenido completada
- [ ] Email de contacto es correcto
- [ ] No hay advertencias en Play Console

### 5.6 Enviar a Revisión

1. Revisa todos los campos marcados como "obligatorios"
2. Haz clic en **"Review release"** (Revisar versión)
3. Verifica que no haya errores
4. Haz clic en **"Start rollout to Production"** (Comenzar lanzamiento)

**Confirmación:** Google te pedirá confirmar. Haz clic en "Rollout".

### 5.7 Proceso de Revisión de Google

**Tiempo estimado:** 1-7 días (usualmente 24-48 horas)

**Estados posibles:**
- **"En revisión"**: Google está verificando tu app
- **"Aprobada"**: ¡Tu app está publicada! 🎉
- **"Rechazada"**: Google encontró problemas (recibirás email con motivo)

**Motivos comunes de rechazo:**
- Privacy Policy inaccesible o incompleta
- Contenido engañoso en descripción/screenshots
- APK con crashes o bugs graves
- Violación de políticas de Google (malware, contenido prohibido)
- Funcionalidad rota o incompleta

### 5.8 Si es Rechazada

1. **Lee el email de Google** con el motivo del rechazo
2. **Corrige los problemas** indicados
3. **Crea un nuevo build** (si es necesario)
4. **Actualiza información en Play Console**
5. **Envía de nuevo a revisión**

---

## FASE 6: POST-PUBLICACIÓN

### 6.1 Monitoreo Inicial

**Primeras 48 horas:**
- [ ] **Verifica que esté en Play Store**: Busca "Yo Nunca" en Play Store
- [ ] **Instala desde Play Store**: Instala tu propia app desde la tienda oficial
- [ ] **Revisa estadísticas**: Play Console → Statistics (instalaciones, desinstalaciones)
- [ ] **Lee reviews**: Responde a los primeros usuarios rápidamente

### 6.2 Marketing Inicial (Opcional)

**Crecimiento orgánico:**
- Comparte en redes sociales (Instagram, Twitter/X, TikTok)
- Pide a amigos que dejen reseñas (5 estrellas si les gusta)
- Publica en subreddits relevantes (r/androidapps, r/boardgames)
- Crea contenido sobre la app (videos, fotos de fiestas)

### 6.3 Monitoreo de AdMob

**Primeros días:**
- [ ] **Ve a AdMob Console**: https://apps.admob.com/
- [ ] **Verifica impresiones**: ¿Los anuncios se están mostrando?
- [ ] **Verifica eCPM**: ¿Cuánto ganas por 1000 impresiones?
- [ ] **Sin infracciones**: Verifica que no haya alertas de política

**Ingresos estimados:**
- 10 usuarios/día → $1-5/mes
- 100 usuarios/día → $20-60/mes
- 1,000 usuarios/día → $260-600/mes

### 6.4 Responder a Reviews

**Buenas prácticas:**
- Responde a TODAS las reseñas (positivas y negativas)
- Agradece las reseñas positivas
- Escucha feedback constructivo
- Soluciona bugs reportados en reviews

**Ejemplo de respuesta:**
```
¡Gracias por tu reseña! 🎉 Nos alegra que disfrutes Yo Nunca.
Si tienes sugerencias, escríbenos a [tu-email]. ¡Seguimos mejorando la app!
```

### 6.5 Planear Actualizaciones

**Roadmap post-lanzamiento:**

**v1.1 (1-2 meses después):**
- Corregir bugs reportados por usuarios
- Agregar pack de preguntas nuevo
- Mejorar UI/UX basado en feedback

**v1.2 (3-4 meses):**
- Anuncios con recompensa para desbloquear contenido premium
- Modo de juego nuevo (si hay demanda)

**v2.0 (6+ meses):**
- Considerar versión PRO sin anuncios ($2.99)
- Multijugador online (si la base de usuarios crece)

---

## 🔍 TROUBLESHOOTING

### Problema: Expo Go no muestra cambios
**Solución:**
- Cierra Expo Go completamente
- Ejecuta `npx expo start --clear`
- Escanea el QR de nuevo

### Problema: EAS Build falla
**Solución:**
- Lee el error en la consola de Expo
- Verifica que `app.json` y `eas.json` estén correctos
- Ejecuta `npm install` para verificar dependencias
- Revisa logs completos en https://expo.dev/accounts/[tu-cuenta]/projects/yo-nunca/builds

### Problema: AdMob no muestra anuncios en preview build
**Solución:**
- Verifica que tengas internet activo
- Los Test Ads de Google a veces tardan unos segundos
- Espera 30-60 segundos después de abrir la app
- Revisa logs con `adb logcat` para ver errores de AdMob

### Problema: Play Store rechaza la app
**Solución:**
- Lee el email de Google cuidadosamente
- Motivos comunes:
  - Privacy Policy inaccesible → Verifica la URL
  - Contenido engañoso → Ajusta descripción/screenshots
  - Funcionalidad rota → Testea más exhaustivamente
- Corrige y re-envía

### Problema: La app crashea en algunos dispositivos
**Solución:**
- Revisa logs en Play Console → Quality → Android vitals
- Identifica el dispositivo/Android version problemático
- Testea en ese modelo específico (o emulador)
- Considera agregar error boundaries en React

---

## 📚 RECURSOS ÚTILES

- **Expo Docs**: https://docs.expo.dev/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Google Play Console**: https://play.google.com/console
- **AdMob**: https://admob.google.com/
- **Play Store Policies**: https://play.google.com/about/developer-content-policy/
- **Material Design Guidelines**: https://m3.material.io/

---

## ✅ RESUMEN: CHECKLIST RÁPIDA

**Antes de Preview Build:**
- [ ] Todo testeado en Expo Go (excepto anuncios)
- [ ] Sin errores de TypeScript

**Antes de Production Build:**
- [ ] Preview build testeado exhaustivamente en dispositivo real
- [ ] AdMob configurado con IDs de producción
- [ ] Privacy Policy publicada en URL pública
- [ ] Assets de Play Store creados (icon, feature graphic, screenshots)

**Antes de Enviar a Play Store:**
- [ ] Production build creado y verificado
- [ ] Cuenta de Play Developer activa ($25 pagados)
- [ ] Toda la información de la app completada en Play Console
- [ ] Clasificación de contenido completada
- [ ] Declaración de seguridad de datos completada

**Post-Publicación:**
- [ ] Monitorear reviews y responder
- [ ] Verificar estadísticas de AdMob
- [ ] Planear próximas actualizaciones

---

**¡Buena suerte con el lanzamiento! 🚀🎉**
