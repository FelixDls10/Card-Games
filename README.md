# Architect Memory - Memory Card Game

Un juego interactivo de memoria basado en cartas con elementos de oficina/computadora. Empareja las cartas para encontrar los pares antes del tiempo se agote.

## 🎮 Características

- **Tres niveles de dificultad**: Fácil (3×2), Medio (4×3), Difícil (4×4)
- **Seguimiento de métricas**: Tiempo transcurrido, movimientos realizados, pares encontrados
- **Sistema de sonido**: Efectos de sonido para acciones del juego
- **Accesibilidad**: Anuncios de pantalla para usuarios con discapacidades visuales
- **Tema adaptable**: Modo claro y oscuro
- **Soporte multiidioma**: Español e inglés
- **Responsive**: Adaptable a dispositivos móviles y escritorio
- **Estadísticas**: Historial de juegos completados con métricas
- **Pausa**: Posibilidad de pausar el juego en cualquier momento

## 🛠️ Stack Tecnológico

- **React 18.3** - Librería UI
- **Vite 6.2** - Bundler y dev server
- **Tailwind CSS 4** - Estilos con utilidades CSS
- **Motion** - Animaciones fluidas
- **Lucide React** - Iconografía

## 📦 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── screens/        # Pantallas principales (Home, Game, Victory, Stats)
│   ├── Header.jsx      # Encabezado con controles
│   ├── Sidebar.jsx     # Navegación lateral
│   ├── BottomNav.jsx   # Navegación inferior (móvil)
│   ├── PauseModal.jsx  # Modal de pausa
│   └── ...
├── hooks/              # Custom hooks
│   ├── useGameEngine.js    # Lógica del juego
│   ├── useTimer.js         # Cronómetro
│   └── useSound.jsx        # Manejo de sonidos
├── constants.js        # Configuración de dificultad y símbolos
├── i18n.js             # Sistema de internacionalización
├── App.jsx             # Componente raíz
└── main.jsx            # Punto de entrada
```

## 🎯 Cómo Jugar

1. Selecciona el nivel de dificultad en la pantalla de inicio
2. Haz clic en las cartas para revelar los símbolos
3. Intenta emparejar dos cartas iguales
4. Gana cuando encuentres todos los pares en el menor tiempo y movimientos posibles
5. Visualiza tus estadísticas en la sección de Estadísticas

## 🔧 Configuración

### Símbolos
Los símbolos del juego se definen en `constants.js` y incluyen elementos de oficina/computadora como ratón, auriculares, bocinas, CPU, escritorio, silla, teclado y monitor.

### Idiomas
El sistema de idiomas está en `i18n.js` y soporta español e inglés de forma predeterminada.

### Temas
Alterna entre tema oscuro y claro desde el encabezado o la barra lateral.
