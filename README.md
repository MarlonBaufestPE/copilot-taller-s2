# JWT Authentication API with FastAPI

Esta es una aplicación Web API desarrollada con Python y FastAPI que implementa autenticación JWT (JSON Web Tokens).

## Características

- **Autenticación JWT**: Sistema de autenticación basado en tokens JWT
- **Login**: Endpoint para obtener un token de acceso
- **Refresh Token**: Endpoint para renovar tokens expirados
- **Ruta Protegida**: Endpoint de ejemplo que requiere autenticación
- **Expiración de Tokens**: Tokens con expiración de 300 segundos (5 minutos)
- **Docker**: Contenedorización completa con Docker y Docker Compose
- **Poetry**: Gestión de dependencias con Poetry

## Requisitos Previos

### Opción 1: Docker (Recomendado)
- Docker
- Docker Compose

### Opción 2: Instalación Local
- Python 3.9 o superior
- Poetry

## Instalación y Ejecución

### Usando Docker (Recomendado)

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

## Documentación Interactiva

FastAPI genera automáticamente documentación interactiva:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

Puedes probar todos los endpoints directamente desde estas interfaces.

## Estructura del Proyecto

```
copilot-taller-s2/
├── backend/
│   ├── main.py              # Aplicación FastAPI principal
│   ├── pyproject.toml       # Configuración de Poetry y dependencias
│   └── Dockerfile           # Configuración de Docker
├── docker-compose.yml       # Orquestación de contenedores
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

## Dependencias Principales

- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI de alto rendimiento
- **python-jose**: Implementación de JWT
- **passlib**: Hashing de contraseñas
- **pydantic**: Validación de datos

## Seguridad

⚠️ **Importante**: Esta es una implementación de demostración. Para producción:

1. Cambia `SECRET_KEY` en `main.py` por una clave segura
2. Usa variables de entorno para credenciales
3. Implementa una base de datos real en lugar de usuarios en memoria
4. Considera usar HTTPS
5. Implementa rate limiting
6. Añade logs de auditoría

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

### El contenedor no inicia
- Verifica que Docker esté ejecutándose
- Asegúrate de que el puerto 8000 no esté en uso

### Error de autenticación
- Verifica que estés usando las credenciales correctas (admin/admin123)
- Asegúrate de que el token no haya expirado (300 segundos)
- Verifica el formato del header: `Authorization: ******

### Token expirado
- Usa el endpoint `/refresh` para obtener un nuevo token
- O vuelve a hacer login en `/login`

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
