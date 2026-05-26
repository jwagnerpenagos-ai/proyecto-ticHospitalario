# Proyecto TIC Hospitalario

Sistema web para la **gestión y monitoreo de infraestructura tecnológica hospitalaria**.  
El proyecto permite administrar ubicaciones, dispositivos, métricas y alertas dentro de un entorno hospitalario, utilizando una arquitectura basada en **React**, **microservicios con Flask**, **API Gateway**, **PostgreSQL** y **Docker**.

---

## Descripción

**Proyecto TIC Hospitalario** es una plataforma diseñada para centralizar la administración de recursos tecnológicos en un hospital.

El sistema facilita la gestión de:

- Ubicaciones físicas del hospital.
- Dispositivos tecnológicos.
- Tipos y estados de dispositivos.
- Métricas operativas.
- Tipos de métricas.
- Alertas asociadas a dispositivos.
- Severidades y estados de alerta.

La aplicación cuenta con autenticación, control visual por roles, operaciones CRUD y una interfaz organizada para facilitar su uso y presentación.

---

## Objetivo

Desarrollar una solución web que permita gestionar y monitorear la infraestructura tecnológica hospitalaria, integrando diferentes módulos funcionales mediante una arquitectura distribuida basada en microservicios.

---

## Características principales

- Autenticación de usuarios.
- Control visual por roles.
- Usuario administrador con permisos de gestión.
- Usuario normal con permisos de consulta.
- Dashboard con resumen general del sistema.
- Gestión de ubicaciones hospitalarias.
- Gestión de dispositivos tecnológicos.
- Gestión de métricas operativas.
- Gestión de alertas.
- Catálogos auxiliares para evitar ingresar identificadores manualmente.
- Backend dockerizado.
- Comunicación centralizada mediante API Gateway.
- Interfaz moderna y organizada.

---

## Arquitectura general

El proyecto está dividido en dos partes principales:

### Frontend

Aplicación web desarrollada con React.  
Se encarga de la interfaz de usuario, navegación, formularios, tablas, modales, autenticación visual y consumo del backend mediante Axios.

### Backend

Conjunto de microservicios desarrollados con Flask.  
Cada servicio tiene una responsabilidad específica y se comunica a través de un API Gateway.

El backend utiliza PostgreSQL como base de datos y Docker Compose para levantar todos los servicios de forma unificada.

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Lucide React

### Backend

- Python
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- PostgreSQL
- PyJWT
- Requests
- Werkzeug
- Docker
- Docker Compose

---

## Estructura del proyecto

```txt
proyecto-ticHospitalario/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── gateway/
│   ├── auth_service/
│   ├── device_service/
│   ├── location_service/
│   ├── metrics_service/
│   ├── alerts_service/
│   ├── docker-compose.yml
│   └── requirements.txt
│
└── README.md
```

---

## Roles del sistema

### Administrador

El administrador puede crear, consultar, editar y eliminar información en los módulos principales del sistema.

Puede gestionar:

- Ubicaciones.
- Dispositivos.
- Tipos de dispositivo.
- Estados de dispositivo.
- Métricas.
- Tipos de métrica.
- Alertas.
- Severidades.
- Estados de alerta.

### Usuario normal

El usuario normal puede consultar la información del sistema, pero no puede crear, editar ni eliminar registros.

---

## Módulos funcionales

### Home

Página principal de presentación del sistema.  
Permite acceder al registro o al inicio de sesión.

### Autenticación

Módulo encargado del registro, inicio de sesión y manejo del token de autenticación.

### Dashboard

Panel principal con resumen de información relevante del sistema, como cantidad de ubicaciones, dispositivos, métricas y alertas registradas.

### Ubicaciones

Permite gestionar las áreas físicas del hospital, como UCI, Urgencias, Laboratorio, Sistemas o Farmacia.

Cada ubicación puede incluir nombre, edificio, sala y descripción.

### Dispositivos

Permite gestionar los dispositivos tecnológicos del hospital.

Cada dispositivo se relaciona con:

- Un tipo de dispositivo.
- Un estado.
- Una ubicación.

También incluye catálogos para administrar tipos y estados de dispositivos.

### Métricas

Permite registrar mediciones operativas asociadas a dispositivos.

Cada métrica se relaciona con:

- Un dispositivo.
- Un tipo de métrica.
- Un valor registrado.

Los tipos de métrica pueden tener nombre, unidad y descripción.

### Alertas

Permite registrar eventos o incidentes asociados a dispositivos.

Cada alerta incluye:

- Dispositivo.
- Severidad.
- Estado.
- Mensaje.
- Fecha de creación.
- Fecha de resolución, si aplica.

Las severidades y estados de alerta se gestionan desde catálogos internos del módulo.

---

## Ejecución del proyecto

### Backend

El backend se ejecuta desde la carpeta `backend` utilizando Docker Compose.

El API Gateway queda disponible en:

`http://localhost:5000`

### Frontend

El frontend se ejecuta desde la carpeta `frontend` utilizando npm.

La aplicación web queda disponible normalmente en:

`http://localhost:5173`

---

## Dependencias

### Backend

Las dependencias del backend se encuentran en:

`backend/requirements.txt`

### Frontend

Las dependencias del frontend se encuentran en:

`frontend/package.json`

---

## Flujo recomendado de uso

1. Levantar el backend.
2. Levantar el frontend.
3. Registrar el primer usuario administrador.
4. Iniciar sesión.
5. Crear ubicaciones.
6. Crear tipos y estados de dispositivos.
7. Crear dispositivos.
8. Crear tipos de métricas.
9. Crear métricas.
10. Crear severidades y estados de alerta.
11. Crear alertas.
12. Probar el ingreso con usuario normal para validar el modo consulta.

---

## Datos sugeridos para demostración

### Ubicaciones

| Nombre | Edificio | Sala |
|---|---|---|
| UCI | Bloque A | 101 |
| Urgencias | Bloque B | 201 |
| Laboratorio Clínico | Bloque C | 305 |
| Sistemas | Bloque Administrativo | 410 |

### Tipos de dispositivo

| Nombre |
|---|
| Servidor |
| Router |
| Switch |
| Monitor de signos vitales |
| Estación de trabajo |

### Estados de dispositivo

| Nombre |
|---|
| Activo |
| Inactivo |
| Mantenimiento |
| Fallando |

### Tipos de métrica

| Nombre | Unidad |
|---|---|
| CPU | % |
| RAM | % |
| Temperatura | °C |
| Latencia | ms |
| Almacenamiento | % |

### Severidades de alerta

| Nombre | Nivel |
|---|---|
| Baja | 1 |
| Media | 2 |
| Alta | 3 |
| Crítica | 4 |

### Estados de alerta

| Nombre |
|---|
| Abierta |
| En revisión |
| Resuelta |

---

## Pruebas principales

Durante la validación del sistema se recomienda probar:

- Registro de usuario.
- Inicio de sesión.
- Cierre de sesión.
- Protección de rutas privadas.
- Visualización diferenciada entre administrador y usuario normal.
- Creación, edición y eliminación de ubicaciones.
- Creación, edición y eliminación de dispositivos.
- Creación, edición y eliminación de métricas.
- Creación, edición y eliminación de alertas.
- Gestión de catálogos auxiliares.
- Comportamiento de tablas con varios registros.
- Funcionamiento general del dashboard.

---

## Consideraciones importantes

- El backend debe estar activo antes de usar el frontend.
- El frontend consume únicamente el API Gateway.
- El primer usuario registrado puede ser usado como administrador si el sistema maneja el criterio de `id = 1`.
- Los catálogos deben crearse antes de registrar dispositivos, métricas o alertas.
- No se recomienda eliminar catálogos que ya estén asociados a registros principales.
- Si el token expira, se debe iniciar sesión nuevamente.

---

## Estado actual

El proyecto cuenta con:

- Frontend funcional.
- Backend dockerizado.
- API Gateway operativo.
- Microservicios conectados.
- Base de datos PostgreSQL.
- Autenticación mediante token.
- Control visual por roles.
- CRUD en los módulos principales.
- Catálogos auxiliares integrados.
- Interfaz preparada para demostración académica.

---

## Posibles mejoras futuras

- Manejo de roles directamente desde base de datos.
- Paginación y filtros avanzados.
- Gráficas para métricas.
- Notificaciones en tiempo real.
- Auditoría de acciones.
- Pruebas automatizadas.
- Despliegue en la nube.

---

## Autor

**Jose Felipe Wagner Penagos**

Proyecto académico de gestión de infraestructura tecnológica hospitalaria.

---

## Repositorio

**proyecto-ticHospitalario**
