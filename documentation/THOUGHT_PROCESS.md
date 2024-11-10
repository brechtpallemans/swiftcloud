### step 1: download data

### step 2: start a Taylor Swift playlist

### step 3: create a backend project using NestJS

Why?

- Interview requires TypeScript experience, great way to show that off using NestJS
- Comes with out of the box TypeORM support, useful to generate migrations for a Postgres DB
- Out of the box API routing and swagger API documentation
- Dependency Injection, great architecture to scale if the app ever get's millions of songs.

How?

Follow [the official documentation](https://docs.nestjs.com/first-steps) to start a new sub directory under this project:

```
nest new swiftcloud

> npm
```

### step 4: restructure project for scale

The issue with NestJS is that all is seen as a module, I prefer to work layered (similar to Spring Boot) because it allows me to reuse code better.

- Modules (DI)
- Controllers (Routing)
- Services (Logic)
- DB
- Models (Schema)
- Utils (Functional)
- Configuration (Environment)

### step 5: copy lint configuration from another project

### step 6: add swagger configuration

### step 7: add logger and db connection

How to get a local db?

```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=swiftcloud -d --name postgres postgres
```

### step 8: make a model using draw.io

### step 9: program the model using TypeORM classes and generate migrations

### step 10: write a data parsing script to add the data to the database

> This would normally be a cron job in the backend service, or an external job. But because it's a one off migration, I opt to write a script so I can redo it once after deployment easily and no manual data parsing is needed.

### step 11: add api controllers and implement querying algorithms

### step 12: deploy

Spin up a lightsail instance at 5$/month.

Run a docker container for the db and run the api in a docker container.

Install nginx and use letsencrypt to host the api on swiftcloud.pallemans.com.

### step 13: write the readme
