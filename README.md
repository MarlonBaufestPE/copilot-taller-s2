# JWT Authentication Full Stack Application

Esta es una aplicación full stack que implementa autenticación JWT (JSON Web Tokens) con:
- **Backend**: API REST desarrollada con Python y FastAPI
- **Frontend**: Aplicación web desarrollada con React y Vite

## 📁 Estructura del Proyecto

```
copilot-taller-s2/
├── backend/          # API REST con FastAPI
│   ├── main.py       # Aplicación principal
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/         # Aplicación React
│   ├── src/
│   ├── public/
│   └── package.json
├── DESIGN.md         # Estándar de diseño FlowOps
├── docker-compose.yml
└── README.md         # Este archivo
```

## Características

### Backend (FastAPI)
- **Autenticación JWT**: Sistema de autenticación basado en tokens JWT
- **Login**: Endpoint para obtener un token de acceso
- **Refresh Token**: Endpoint para renovar tokens expirados
- **Ruta Protegida**: Endpoint de ejemplo que requiere autenticación
- **Expiración de Tokens**: Tokens con expiración de 300 segundos (5 minutos)
- **CORS**: Configurado para comunicación con frontend
- **Docker**: Contenedorización completa con Docker y Docker Compose

### Frontend (React)
- **Página de Login**: Formulario de autenticación
- **Página de Bienvenida**: Dashboard protegido
- **Rutas Protegidas**: Control de acceso basado en JWT
- **Sesión Persistente**: Tokens guardados en localStorage
- **Diseño Moderno**: Implementa el estándar FlowOps - Surgical Precision
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## Requisitos Previos

### Para ejecutar con Docker (Recomendado)
- Docker
- Docker Compose

### Para ejecutar localmente
- Python 3.9 o superior
- Node.js 16.x o superior
- Poetry (para backend)
- npm o yarn (para frontend)

## Instalación y Ejecución

### 🚀 Inicio Rápido (Ejecutar Localmente)

#### 1. Backend

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python3 -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias
pip install fastapi uvicorn "python-jose[cryptography]" "passlib[bcrypt]" python-multipart pydantic pydantic-settings bcrypt==4.1.2

# Ejecutar el servidor
uvicorn main:app --reload

# El backend estará disponible en: http://localhost:8000
```

#### 2. Frontend

```bash
# En otra terminal, navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev

# El frontend estará disponible en: http://localhost:5173
```

#### 3. Acceder a la Aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Usa las credenciales de prueba:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. Inicia sesión y explora el dashboard

### 🐳 Usando Docker (Recomendado)

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd copilot-taller-s2
```

2. **Construir y ejecutar con Docker Compose**
```bash
docker-compose up --build
```

La API estará disponible en: `http://localhost:8000`

3. **Detener la aplicación**
```bash
docker-compose down
```

### Usando Poetry (Instalación Local)

1. **Navegar al directorio backend**
```bash
cd backend
```

2. **Instalar dependencias con Poetry**
```bash
poetry install
```

3. **Ejecutar la aplicación**
```bash
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

La API estará disponible en: `http://localhost:8000`

## Credenciales por Defecto

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Endpoints de la API

### 1. Root Endpoint
```
GET /
```
Devuelve información básica sobre la API.

**Respuesta:**
```json
{
  "message": "JWT Authentication API",
  "version": "1.0.0",
  "endpoints": {
    "login": "/login",
    "refresh": "/refresh",
    "protected": "/protected"
  }
}
```

### 2. Login (Obtener Token)
```
POST /login
```

Autentica al usuario y devuelve un token JWT con expiración de 300 segundos.

**Body (JSON):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "access_token": "******",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 3. Refresh Token (Renovar Token)
```
POST /refresh
```

Renueva un token JWT existente, devolviendo uno nuevo con 300 segundos de expiración.

**Headers:**
```
Authorization: ******
```

**Respuesta:**
```json
{
  "access_token": "******",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 4. Ruta Protegida
```
GET /protected
```

Endpoint de ejemplo que requiere autenticación para acceder.

**Headers:**
```
Authorization: ******
```

**Respuesta:**
```json
{
  "username": "admin",
  "message": "You have successfully accessed a protected route!"
}
```

### 5. Health Check
```
GET /health
```

Endpoint para verificar el estado de la aplicación.

**Respuesta:**
```json
{
  "status": "healthy"
}
```

## Ejemplos de Uso

### Usando cURL

#### 1. Obtener un Token
```bash
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

#### 2. Acceder a una Ruta Protegida
```bash
curl -X GET "http://localhost:8000/protected" \
  -H "Authorization: ******"
```

#### 3. Renovar un Token
```bash
curl -X POST "http://localhost:8000/refresh" \
  -H "Authorization: ******"
```

### Usando Python (requests)

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/login",
    json={"username": "admin", "password": "admin123"}
)
token = response.json()["access_token"]

# Acceder a ruta protegida
headers = {"Authorization": f"******"}
response = requests.get("http://localhost:8000/protected", headers=headers)
print(response.json())

# Renovar token
response = requests.post("http://localhost:8000/refresh", headers=headers)
new_token = response.json()["access_token"]
```

### Usando Postman

1. **Login**:
   - Método: POST
   - URL: `http://localhost:8000/login`
   - Body: Raw JSON
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. **Ruta Protegida**:
   - Método: GET
   - URL: `http://localhost:8000/protected`
   - Headers: 
     - Key: `Authorization`
     - Value: `******

3. **Refresh Token**:
   - Método: POST
   - URL: `http://localhost:8000/refresh`
   - Headers: 
     - Key: `Authorization`
     - Value: `******

## 💻 Frontend React

El frontend es una aplicación moderna desarrollada con React que implementa:

### Características
- **Autenticación visual**: Formulario de login elegante y responsive
- **Dashboard protegido**: Página de bienvenida con información del usuario
- **Gestión de sesión**: Manejo automático de tokens JWT
- **Diseño FlowOps**: Implementa el estándar de diseño definido en DESIGN.md
- **Rutas protegidas**: Redirección automática si no hay sesión activa

### Estructura
```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   └── ProtectedRoute.jsx
│   ├── context/          # Context API para autenticación
│   │   └── AuthContext.jsx
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   └── Welcome.jsx
│   ├── services/         # Servicios de API
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

### Uso del Frontend

1. **Página de Login** (`/`):
   - Ingresa usuario y contraseña
   - Muestra errores de autenticación
   - Guarda el token JWT en localStorage
   - Redirige a la página de bienvenida

2. **Página de Bienvenida** (`/welcome`):
   - Muestra información del usuario autenticado
   - Obtiene datos del endpoint protegido del backend
   - Permite cerrar sesión
   - Protegida con JWT

### Personalización

Para cambiar la URL del backend, edita `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

Para más detalles sobre el frontend, consulta `frontend/README.md`.

## Documentación Interactiva

FastAPI genera automáticamente documentación interactiva:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

Puedes probar todos los endpoints directamente desde estas interfaces.

## Estructura del Proyecto

```
copilot-taller-s2/
├── backend/                 # Backend API con FastAPI
│   ├── main.py              # Aplicación FastAPI principal
│   ├── pyproject.toml       # Configuración de Poetry y dependencias
│   └── Dockerfile           # Configuración de Docker
├── frontend/                # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── context/         # Context API
│   │   ├── pages/           # Páginas de la app
│   │   ├── services/        # Servicios y API
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── README.md            # Documentación del frontend
├── DESIGN.md                # Estándar de diseño FlowOps
├── docker-compose.yml       # Orquestación de contenedores
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

## Dependencias Principales

### Backend
- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI de alto rendimiento
- **python-jose**: Implementación de JWT
- **passlib**: Hashing de contraseñas
- **pydantic**: Validación de datos
- **bcrypt**: Algoritmo de hashing seguro

### Frontend
- **React**: Biblioteca para interfaces de usuario
- **Vite**: Build tool y dev server moderno
- **React Router**: Navegación entre páginas
- **Tailwind CSS**: Framework de estilos utilitarios
- **Axios**: Cliente HTTP para peticiones al backend

## Seguridad

⚠️ **Importante**: Esta es una implementación de demostración. Para producción:

### Backend
1. Cambia `SECRET_KEY` en `main.py` por una clave segura
2. Usa variables de entorno para credenciales
3. Implementa una base de datos real en lugar de usuarios en memoria
4. Considera usar HTTPS
5. Implementa rate limiting
6. Añade logs de auditoría

### Frontend
1. Usa HTTPS en producción
2. Implementa refresh tokens automáticos
3. Considera usar httpOnly cookies en lugar de localStorage
4. Valida todas las entradas del usuario
5. Implementa CSP (Content Security Policy)
6. Añade protección contra XSS y CSRF

## Desarrollo

### Ejecutar en Modo de Desarrollo
```bash
cd backend
poetry run uvicorn main:app --reload
```

### Ejecutar Tests (si se implementan)
```bash
cd backend
poetry run pytest
```

## Solución de Problemas

### Backend

#### El contenedor no inicia
- Verifica que Docker esté ejecutándose
- Asegúrate de que el puerto 8000 no esté en uso

#### Error de autenticación
- Verifica que estés usando las credenciales correctas (admin/admin123)
- Asegúrate de que el token no haya expirado (300 segundos)
- Verifica el formato del header: `Authorization: ******

#### Token expirado
- Usa el endpoint `/refresh` para obtener un nuevo token
- O vuelve a hacer login en `/login`

### Frontend

#### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en `http://localhost:8000`
- Comprueba la configuración de CORS en el backend
- Revisa la consola del navegador para errores específicos

#### Error de CORS
- Asegúrate de que el backend tenga CORS configurado correctamente en `main.py`
- Verifica que el frontend esté corriendo en `http://localhost:5173`

#### Página en blanco
- Abre la consola del navegador (F12) para ver errores
- Verifica que todas las dependencias estén instaladas (`npm install`)
- Intenta limpiar y reconstruir: `npm run build`

#### Token expira rápido
- Por defecto, los tokens expiran en 5 minutos
- Esto es intencional para demostración
- En producción, ajusta `ACCESS_TOKEN_EXPIRE_SECONDS` en el backend

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.
