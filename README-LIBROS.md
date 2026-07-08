# 📚 Organizador de Libros

Una aplicación moderna para gestionar tu colección de libros con notas, drag & drop y persistencia automática.

## ✨ Características

- 📖 **Agregar libros** - Título, autor y descripción
- ✏️ **Editar en tiempo real** - Cambios se guardan automáticamente
- 🎯 **Drag & Drop** - Reordena tus libros fácilmente
- 💾 **Almacenamiento local** - Los datos persisten en el navegador
- 📱 **Responsive** - Funciona en desktop, tablet y móvil
- ⚡ **Rápido** - Sin conexión a internet requerida
- 🎨 **Diseño moderno** - Interfaz limpia y intuitiva

## 🚀 Inicio Rápido

### Opción 1: Abrir HTML Directamente (Sin instalación)

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**✅ Ventajas:**
- Zero instalación
- Funciona inmediatamente
- Perfecto para probar

---

### Opción 2: Proyecto Vite (Recomendado para desarrollo)

#### 1. Crear proyecto

```bash
npm create vite@latest libro-organizador -- --template react
cd libro-organizador
npm install
```

#### 2. Instalar Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 3. Configurar archivos

Reemplaza/copia estos archivos del proyecto:

- `tailwind.config.js`
- `postcss.config.js`
- `vite.config.js`
- `package.json`
- `BookOrganizer.jsx` → `src/BookOrganizer.jsx`
- `App.jsx` → `src/App.jsx`
- `main.jsx` → `src/main.jsx`
- `index.css` → `src/index.css`
- `index-vite.html` → `index.html`

#### 4. Instalar dependencias restantes

```bash
npm install react react-dom
```

#### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

#### 6. Compilar para producción

```bash
npm run build
```

Esto crea la carpeta `dist/` lista para desplegar.

---

## 📖 Cómo Usar

### Agregar un Libro

1. Ingresa el **título del libro** (ej: "El Quijote")
2. Ingresa el **autor** (ej: "Miguel de Cervantes")
3. Haz click en **"+ Agregar Libro"**
4. Se crea una tarjeta con el libro

### Agregar Descripción

1. Haz click en el campo **"Descripción, notas o comentarios..."**
2. Escribe tus notas sobre el libro
3. Los cambios se guardan **automáticamente**

### Reordenar Libros

1. Arrastra desde el **ícono de puntos** (⋮) al inicio de cada tarjeta
2. Suelta en la posición deseada
3. El nuevo orden se guarda **automáticamente**

### Eliminar un Libro

1. Haz click en el botón **"Eliminar"** en la tarjeta
2. Confirma la eliminación
3. El libro se elimina de tu colección

---

## 🔧 Estructura de Datos

Cada libro se almacena con esta estructura:

```javascript
{
  id: 1,                    // Identificador único
  title: "El Quijote",      // Título del libro
  author: "Miguel de Cervantes",  // Autor
  description: "..."        // Notas/comentarios
}
```

---

## 💾 Almacenamiento

Los datos se guardan en **localStorage** del navegador:

```javascript
localStorage['books'] // Array JSON con todos los libros
```

**Características:**
- ✅ Persiste entre sesiones
- ✅ Funciona offline
- ✅ ~5-10MB de capacidad por dominio
- ⚠️ Se pierde si borra historial del navegador

---

## 🎨 Personalización

### Cambiar colores del tema

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // Azul
      secondary: '#64748B',  // Gris
    }
  }
}
```

Luego actualiza las clases en el componente:

```jsx
className="bg-primary hover:bg-secondary"
```

### Agregar más campos

Edita `BookOrganizer.jsx`:

```javascript
// En la estructura de datos
{
  id: 1,
  title: "",
  author: "",
  description: "",
  year: 2024,        // ← Nuevo
  genre: "",         // ← Nuevo
  rating: 5          // ← Nuevo
}

// En el componente BookCard
<input placeholder="Año de publicación..." />
<input placeholder="Género..." />
<input type="number" min="1" max="5" placeholder="Calificación..." />
```

---

## 📱 Compatibilidad

| Navegador | Desktop | Mobile |
|-----------|---------|--------|
| Chrome    | ✅      | ✅     |
| Firefox   | ✅      | ✅     |
| Safari    | ✅      | ✅     |
| Edge      | ✅      | ✅     |

---

## 🌍 Desplegar a Producción

### Netlify (Recomendado)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

O conecta tu GitHub repo en https://netlify.com

### Vercel

```bash
npm install -g vercel
vercel --prod
```

O en https://vercel.com conecta tu repo

### GitHub Pages

```bash
# Actualiza vite.config.js
export default {
  base: '/libro-organizador/',  // Nombre de tu repo
}

npm run build
```

Luego en los settings del repo, habilita Pages desde la carpeta `dist/`

---

## 🔍 Estructura de Carpetas (Vite)

```
libro-organizador/
├── src/
│   ├── BookOrganizer.jsx     ← Componente principal
│   ├── App.jsx               ← Wrapper
│   ├── main.jsx              ← Punto de entrada
│   └── index.css             ← Estilos Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ❓ Preguntas Frecuentes

**P: ¿Dónde se guardan los datos?**  
R: En `localStorage` del navegador, en la clave `books`.

**P: ¿Puedo sincronizar entre dispositivos?**  
R: No con localStorage solo. Para eso necesitas un backend (Firebase, Supabase, etc).

**P: ¿Qué pasa si borro el historial?**  
R: Se pierde todo si seleccionas "Borrar cookies y datos de sitios". Sé cuidadoso.

**P: ¿Funciona sin internet?**  
R: Sí, completamente offline. Es una app 100% local.

**P: ¿Puedo exportar mis libros?**  
R: Sí, desde DevTools:
```javascript
// En la consola del navegador
copy(JSON.stringify(JSON.parse(localStorage.books), null, 2))
```

**P: ¿Cómo importo libros de un backup?**  
R: Desde la consola:
```javascript
localStorage.setItem('books', JSON.stringify([...]))
location.reload()
```

---

## 🚀 Mejoras Futuras

Ideas para expandir la app:

- [ ] Búsqueda y filtrado
- [ ] Calificación con ⭐
- [ ] Estado de lectura (Para leer, Leyendo, Leído)
- [ ] Categorías/Géneros
- [ ] Exportar/Importar JSON
- [ ] Integración con API de Google Books
- [ ] Sincronización con Goodreads
- [ ] Dark mode
- [ ] Multi-idioma

---

## 🐛 Troubleshooting

### Los datos no se guardan

```javascript
// Verifica si localStorage está habilitado
localStorage.getItem('books')

// Si está vacío, intenta crear un libro manualmente
// Luego verifica nuevamente
```

### Tailwind no aplica estilos

```bash
# Asegúrate de que el proceso dev está corriendo
npm run dev

# Si usas HTML directo, es normal en CDN
# Solución: Usa el proyecto Vite
```

### "React no está definido"

```javascript
// Asegúrate de importar React en la parte superior del archivo
import React from 'react'
// O en Vite es automático, no necesitas hacerlo
```

---

## 📝 Licencia

MIT - Libre para usar, modificar y compartir

---

## 💬 Soporte

Si encuentras problemas:

1. Abre **DevTools** (F12)
2. Revisa la **consola** en caso de errores
3. Prueba en **otro navegador**
4. **Borra los datos**:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

---

## 🎯 Versión Actual

- **Versión:** 1.0.0
- **Última actualización:** 2024
- **Estado:** Funcional y listo para producción

---

**¡Disfruta organizando tu colección de libros! 📚✨**

Made with ❤️ and React
