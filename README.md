# 🏡 Pizarra Familiar

> Aplicación web interactiva, intuitiva, moderna y sincronizada en tiempo real para organizar las citas, reuniones, tareas y compromisos del hogar entre **Papá y Mamá**, promoviendo el equilibrio de la carga mental y evitando la sobrecarga de actividades.

---

## 🌟 Funcionalidades Principales

### 1. 🧠 Asistente Inteligente al Crear Actividad
- **Indicador de Carga del Día en Tiempo Real**:
  - 🟢 **Día tranquilo (0-2 actividades)**: Carga ligera, ideal para sumar tareas sin saturación.
  - 🟡 **Día moderado (3-4 actividades)**: Carga moderada, advertencia de precaución.
  - 🔴 **Día sobrecargado (5+ actividades)**: Alerta destacada de sobrecarga y advertencia para prevenir agotamiento parental.
- **Mini-lista Interactiva**: Antes de guardar, muestra todas las actividades ya agendadas para esa persona en esa fecha específica.
- **Detector de Solapamiento Horario**: Avisa si una nueva cita choca en un rango de 45 minutos con otro compromiso agendado.
- **Sugerencia de Corresponsabilidad**: Botón inteligente para delegar automáticamente al otro progenitor si tiene menor carga ese día.

### 2. 📅 Dashboard Principal / Pizarra "Hoy"
- **Organización Cronológica**: Bloques visuales para *Mañana* (hasta las 12:00), *Tarde* (12:00 a 19:00), *Noche* (19:00 en adelante) y *Horario Flexible*.
- **Módulo de "Cierre del Día"**:
  - 🏆 **Logros de Hoy**: Barra de progreso y lista de actividades completadas con micro-animación de confetti.
  - 🎯 **Desafío de Mañana**: Vista anticipada del primer compromiso del día siguiente e indicador de carga de mañana.

### 3. ⚖️ Indicador de Balance de Carga Mental
- Barra gráfica multi-segmento con el desglose porcentual de responsabilidades (Papá, Mamá, Ambos, Hijos).
- Diagnóstico automatizado de corresponsabilidad (*Equilibrado*, *Moderado*, *Desbalance*).
- Desglose por categorías (Escuela, Salud, Compras, Traslados, Hogar, Ocio).
- Consejos prácticos para redistribuir tareas y evitar el agotamiento parental.

### 4. 🗓️ Vistas de Calendario y Filtros Avanzados
- **Hoy**: Vista diaria centrada con contadores de pendientes y logros.
- **Semana**: Calendario de 7 columnas interactivas (Lunes a Domingo) con insignias de carga diaria por color y botón rápido de "+ Agregar".
- **Lista Completa**: Buscador en vivo, ordenamiento por fecha o prioridad, filtros por responsable y categoría.

### 5. ⚡ Sincronización en Tiempo Real y Persistencia
- **BroadcastChannel API**: Sincronización instantánea entre múltiples pestañas y ventanas sin necesidad de recargar.
- **LocalStorage con Semilla Inicial**: Incluye datos realistas precargados desde el segundo 1.
- **Centro de Datos**: Exportación e importación de respaldos en formato `.json` y botón de restauración de demostración.

---

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons.
- **Animaciones y Efectos**: Canvas Confetti.
- **Empaquetador**: Vite 5.
- **Automatización & E2E**: Playwright (con Google Chrome nativo).

---

## 🛠️ Comandos de Ejecución

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar pruebas automatizadas de navegador (Playwright)
node validate-pizarra.js
```

---

## 📂 Directorio Recomendado como Espacio de Trabajo
Para abrir directamente este proyecto en tu editor:
`C:\Users\USUARIO\.gemini\antigravity\scratch\pizarra-familiar`
