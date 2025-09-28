# 🚉 Stations Service

Microservicio encargado de la **gestión de estaciones** para el sistema Perla Metro.  
Permite crear, visualizar, editar y eliminar estaciones, además de aplicar filtros por nombre, ubicación y estado.  

Este servicio se integra en la **[API Main](https://github.com/Eltosergi/perla-metro-apigateway)** mediante Ocelot, donde se maneja la autenticación y autorización (JWT + roles).

---

## 📌 Características principales
- Crear estaciones (`POST /stations`)
- Listar todas las estaciones (`GET /stations`)
- Buscar estación por ID (`GET /stations/:id`)
- Editar estaciones (`PUT /stations/:id`)
- Eliminar estaciones (`DELETE /stations/:id`)
- Filtros por nombre, ubicación y estado (`GET /stations?nombre=...&ubicacion=...&estado=...`)
- Seeder inicial de estaciones (`npm run seed`)
- Dockerización lista para despliegue en **Render** (servicio) y **Railway** (base de datos)

---

## ⚙️ Tecnologías utilizadas
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) como base de datos
- [Docker](https://www.docker.com/)
- [Railway](https://railway.app/) para la base de datos en la nube
- [Render](https://render.com/) para el despliegue del servicio

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd perla-metro-stations-service
````

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz con el siguiente contenido (ajusta según tu entorno):

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=stations_db
```

Si usas Docker o Railway, el `DB_HOST` debe ser `mysql` (nombre del contenedor) o el host de Railway.

### 4. Inicializar la base de datos

Ejecuta el script SQL inicial para crear la tabla:

```sql
CREATE DATABASE stations_db;
USE stations_db;

CREATE TABLE stations (
    id CHAR(36) PRIMARY KEY,         -- UUID v4
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    tipo ENUM('origen', 'destino', 'intermedia') NOT NULL,
    estado ENUM('activa', 'inactiva') DEFAULT 'activa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT unique_station UNIQUE (nombre, ubicacion)
);
```

Opcional: ejecutar el seeder incluido para cargar estaciones iniciales.
```bash
npm run seed
```

---

## 🐳 Ejecución con Docker

### 1. Construir y levantar contenedores

```bash
docker compose up --build
```

### 2. Ver logs

```bash
docker compose logs -f
```

### 3. Acceder al servicio

El servicio estará disponible en:
👉 `http://localhost:3000/stations`

---

## 🔑 Autenticación y autorización

Este servicio **no maneja JWT directamente**.
Toda la seguridad se centraliza en la **API Main** con Ocelot:

* `GET /stations` → accesible para cualquier usuario autenticado.
* `POST /stations`, `PUT /stations/:id`, `DELETE /stations/:id` → solo usuarios con rol **Admin**.

---

## 📡 Endpoints principales

### Obtener todas las estaciones

```http
GET /stations
```

### Obtener estación por ID

```http
GET /stations/:id
```

### Crear nueva estación

```http
POST /stations
Content-Type: application/json

{
  "nombre": "Estación Central",
  "ubicacion": "Santiago",
  "tipo": "origen"
}
```

### Editar estación

```http
PUT /stations/:id
```

### Eliminar estación (soft delete)

```http
DELETE /stations/:id
```

### Filtros

```http
GET /stations?nombre=Central&estado=activa
```

---

## 📖 Mini manual de usuario

1. Levantar el servicio con `npm run dev` (local) o Docker.
2. Crear la base de datos en MySQL (local o Railway).
3. Probar los endpoints con Postman o cURL.
4. En producción, acceder mediante la **API Main** (Ocelot), que controla roles y seguridad.

---

## ☁️ Despliegue en la nube

Para desplegar este servicio en la nube, puede utilizar [Render](https://render.com/), y conectarlo con su base de datos que puede desplegar gratuitamente utilizando [Railway](https://railway.com/).

También puede desplegar el servicio localmente y sólo desplegar la base de datos en Railway.

Al desplegar la base de datos en Railway, se le entregarán datos como la URL de conexión con la base de datos, estos datos debe colocarlos en el .env de su repositorio local o en las variables de entorno del sitio donde esté desplegando el Backend.

---

## 👨‍💻 Autor

* Daniel Alexis Tomigo Contreras - 21.564.036-1
