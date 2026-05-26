# Backend - Proyecto TIC Hospitalario

Backend del sistema **Proyecto TIC Hospitalario**, desarrollado con Python, Flask, PostgreSQL, SQLAlchemy, JWT y arquitectura basada en microservicios.  
El backend se ejecuta mediante Docker Compose y expone sus servicios a través de un API Gateway.

---

## Descripción

Este backend permite gestionar la infraestructura tecnológica de un entorno hospitalario mediante diferentes microservicios especializados.

El sistema permite manejar:

- Autenticación de usuarios.
- Gestión de ubicaciones hospitalarias.
- Gestión de dispositivos.
- Gestión de tipos y estados de dispositivos.
- Registro de métricas.
- Gestión de tipos de métricas.
- Registro de alertas.
- Gestión de severidades y estados de alertas.

La comunicación con el frontend se realiza por medio del **API Gateway**, disponible en:

```txt
http://localhost:5000

