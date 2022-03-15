backend:
    install dependencies:
        npm i bcryptjs cookie-parser cors csurf dotenv express express-async-handler express-validator faker helmet jsonwebtoken morgan per-env pg@^="8.4.1" sequelize@5 sequelize-cli@5

        npm i -D dotenv-cli nodemon

        <!-- install for api -->
        npm i finnhub
    create user:
        psql postgres
        CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;
    create database with user:
        npx sequelize init
        npx dotenv sequelize db:create

    initialize database:
    npx sequelize init;
    npx sequelize db:migrate
