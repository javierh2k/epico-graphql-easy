# epico-server

Capa de servicios desarrollada en NodeJS

##Configuración Node >= 9.10
`cp .env.example .env`
`nvm install 9.10`
`nvm use 9.10`
`npm install -g typescript  tails-cli typeorm ts-node`

 
#USAGE CLI
  $ tails scaffold


##start development
`docker-compose up -d`



##start proyect

> http://localhost:4000/api


docker exec -it server npm run migration:generate BaseMigration
docker exec -it server npm run migration:run

eslint --init

sudo docker-compose up --build


docker exec -it server-epic mysqldump -uroot -psecret admin > ./db-dump.sql
docker exec -it server-epic mysql -uroot -psecret admin < ./db-dump.sql

