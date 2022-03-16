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

    generate migration/models:

    <!-- users: -->
    <!-- npx sequelize model:create --name User --attributes email:string,first_name:string,last_name:string,hashed_password:string,buying_power:decimal -->

    watchlist:
    npx sequelize model:create --name Watchlist --attributes user_id:integer,stock_id:integer,list_name:string

    assets:
    npx sequelize model:create --name Asset --attributes user_id:integer,stock_id:integer,quantity:decimal,avg_price:decimal

    transactions:
    npx sequelize model:create --name Transaction --attributes user_id:integer,stock_id:integer,price:decimal,quantity:decimal

    stocks:
    npx sequelize model:create --name Stock --attributes ticker:string,company_name:string,market_price:decimal

    linked_banks:
    npx sequelize model:create --name Linked_bank --attributes user_id:integer,name:string,account_number:integer,routing_number:integer
