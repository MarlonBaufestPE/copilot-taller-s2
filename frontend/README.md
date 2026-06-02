# Frontend - React con Autenticación JWT

Aplicación web frontend desarrollada en React que se integra con el backend de autenticación JWT.

## 📋 Características

- **Página de Login**: Formulario de inicio de sesión con validación
- **Autenticación JWT**: Manejo seguro de tokens JWT
- **Rutas Protegidas**: Acceso controlado a páginas según autenticación
- **Página de Bienvenida**: Dashboard con información del usuario autenticado
- **Sesión Persistente**: El token se guarda en localStorage
- **Expiración Automática**: Redirección automática al login cuando el token expira
- **Diseño Moderno**: Implementa el estándar de diseño FlowOps - Surgical Precision

## 🎨 Diseño

La aplicación sigue el estándar de diseño **FlowOps - Surgical Precision** definido en `DESIGN.md`:

- **Colores**: Paleta minimalista con #111827 como color principal
- **Tipografía**: Inter para todos los textos
- **Componentes**: Cards con efecto glass, botones redondeados
- **Layout**: Grid composition con espaciado de 4px base
- **Animaciones**: Transiciones suaves de 150ms

## 🛠️ Tecnologías

- **React 18**: Framework de UI
- **Vite**: Build tool y dev server
- **React Router**: Navegación y rutas
- **Tailwind CSS**: Framework de estilos
- **Axios**: Cliente HTTP para comunicación con el backend
- **Context API**: Gestión de estado de autenticación

## 📦 Requisitos Previos

- Node.js 16.x o superior
- npm o yarn
- Backend corriendo en `http://localhost:8000`

## 🚀 Instalación

1. **Navegar a la carpeta del frontend**:
```bash
cd frontend
```

2. **Instalar dependencias**:
```bash
npm install
```

## 💻 Uso

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### Vista Previa de Producción

```bash
npm run preview
```

## 🔐 Credenciales de Prueba

Para iniciar sesión, utiliza las siguientes credenciales:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 📁 Estructura del Proyecto

```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── ProtectedRoute.jsx
│   ├── context/         # Context API
│   │   └── AuthContext.jsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   └── Welcome.jsx
│   ├── services/        # Servicios y APIs
│   │   └── api.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html
├── package.json
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js
└── vite.config.js       # Configuración de Vite
```

## 🔄 Flujo de Autenticación

1. **Login**:
   - El usuario ingresa credenciales en la página de login
   - La aplicación envía una petición POST a `/login` del backend
   - Si las credenciales son correctas, recibe un token JWT
   - El token se guarda en localStorage
   - El usuario es redirigido a `/welcome`

2. **Acceso a Rutas Protegidas**:
   - Cada petición al backend incluye el token en el header `Authorization`
   - El componente `ProtectedRoute` verifica si hay un token válido
   - Si no hay token, redirige automáticamente al login

3. **Expiración del Token**:
   - El token expira después de 300 segundos (5 minutos)
   - Cuando el backend responde con 401, el interceptor de axios:
     - Limpia el token del localStorage
     - Redirige al usuario al login

4. **Logout**:
   - El usuario hace click en "Cerrar Sesión"
   - El token se elimina del localStorage
   - Se redirige al login

## 🎯 Características de Seguridad

- **Tokens JWT**: Autenticación basada en tokens
- **localStorage**: Almacenamiento seguro del token en el navegador
- **Interceptores Axios**: Manejo automático de autenticación y errores
- **Rutas Protegidas**: Control de acceso a nivel de componente
- **Limpieza de Sesión**: Eliminación automática de tokens inválidos o expirados

## 🔌 Integración con el Backend

La aplicación se comunica con el backend FastAPI a través de los siguientes endpoints:

- `POST /login`: Autenticación de usuario
- `GET /protected`: Obtención de datos protegidos (requiere token)
- `POST /refresh`: Renovación de token (opcional)

La URL base del backend está configurada en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## 🎨 Personalización

### Cambiar URL del Backend

Edita `src/services/api.js` y modifica:

```javascript
const API_BASE_URL = 'https://tu-backend-url.com';
```

### Modificar Estilos

Los estilos están configurados en:
- `tailwind.config.js`: Configuración del tema (colores, fuentes, etc.)
- `src/index.css`: Estilos globales y clases personalizadas

### Ajustar Tiempo de Expiración

El tiempo de expiración del token (5 minutos) está configurado en el backend. Para cambiarlo, modifica `ACCESS_TOKEN_EXPIRE_SECONDS` en `backend/main.py`.

## 🐛 Solución de Problemas

### El frontend no se conecta al backend

1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Comprueba que CORS esté configurado correctamente en el backend
3. Revisa la consola del navegador para ver errores específicos

### Error de CORS

Si ves errores de CORS, asegúrate de que en `backend/main.py` esté configurado:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### El token expira muy rápido

El token está configurado para expirar en 5 minutos por defecto. Esto es intencional para fines de demostración. En producción, considera usar un tiempo mayor y implementar refresh tokens.

## 📝 Notas Adicionales

- Esta es una aplicación de demostración para propósitos educativos
- En producción, considera usar HTTPS
- Implementa refresh tokens para una mejor experiencia de usuario
- Añade validación de formularios más robusta
- Considera usar variables de entorno para configuración

## 📄 Licencia

Este proyecto está bajo la misma licencia que el repositorio principal.
