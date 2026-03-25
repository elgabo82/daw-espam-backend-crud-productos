# Aplicación de Gestión de Catálogo de Productos
***
### Módulos

* express
* mysql2 
* sequelize
* cors
* dotenv
* jsonwebtoken
* bcryptjs

## Uso del repositorio

```bash
npm i express mysql2 sequelize cors dotenv jsonwebtoken bcryptjs

```


## Inicio del proyecto

### Opción 1
```bash
npm run dev

```

### Opción 2
```bash
nodemon.js src/server.js ó node

```

###


Contenido del archivo .env

PORT=5000
HTTPS_PORT=3543
DB_HOST=servidor
DB_PORT=3306
DB_NAME=nombre_base_datos
DB_USER=usuario_base
DB_PASSWORD=ClaveBase
DB_DIALECT=mysql

JWT_SECRET=su-clave-super-secreta-generada
JWT_EXPIRES_IN=1h

SSL_ENABLED=true
SSL_KEY_PATH=./src/assets/certs/privkey.pem
SSL_CERT_PATH=./src/assets/certs/cert.pem
SSL_CA_PATH=./src/assets/certs/chain.pem
###

Revisar la información relacionada de las bases de datos.
P.D: Actualmente MariaDB/MySQL

* Gabriel Morejón
