<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/brechtpallemans/swiftcloud">
    <img src="https://i.pinimg.com/736x/eb/e3/ec/ebe3ec08efe160162c4efc719872f46f.jpg" width=150>
  </a>
  <h3 align="center">SwiftCloud API</h3>
  <p align="center">
    Demo project for interview purposes.
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#project-file-structure">Project File Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#run-the-application">Run the application</a></li>
        <li><a href="#generate-the-migrations">Generate the migrations</a></li>
        <li><a href="#data-parsing-script">Data parsing script</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">How it works</a></li>
    <li><a href="#maintainers">Maintainers</a></li>
  </ol>
</details>

## About The Project

The API serves song metadata coming from a Google Sheet shared in an email describing the interview assignment.

[Google Sheet Document](https://docs.google.com/spreadsheets/d/1iNGwJWu4ghwM_jP3U81SRU9oneYqN4DTjW7j9t3lMh8/edit?usp=sharing)

The data is parsed to a PostgreSQL database. You can find the model of this database in the [draw.io file](https://github.com/brechtpallemans/swiftcloud/blob/main/documentation/model.drawio). In order to view this file, import it in the [Draw.io online app](https://draw.io/) or install the [Draw.io integration extension](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) in Visual Studio Code.

### Built With

The backend is built with NestJS and programming language used is TypeScript.

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Project File Structure

The issue with NestJS is that all is seen as a module, I prefer to work layered (similar to Spring Boot) because it allows me to reuse code better.

The layers that I used are in this order from higher level to low level:

- Modules (DI)
- Controllers (Routing)
- Services (Logic)
- DB
- Models (Schema)
- Utils (Functional)
- Configuration (Environment)

## Getting Started

### Prerequisites

Please install the following:

- [NVM - Node Version Manager](https://github.com/nvm-sh/nvm) or node version 20 or higher
- Docker

(optional) Set node version

```bash
nvm use
```

### Setup

Create the `.env` file at the `swiftcloud` folder, copy the `.env.example` file and replace the values with your own.

Setup a database:

```bash
# create docker container of a postgres database service (if you don't already have it)
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -d --name postgres-local postgres

# shell into the postgres
docker exec -it postgres-local bash

# create a new database called "swiftcloud"
psql postgresql://postgres:password@localhost:5432 -c "CREATE DATABASE swiftcloud;"

# exit the docker shell
exit
```

Install packages:

```bash
cd swiftcloud
npm ci
```

### Run the application

Build and start production server:

```bash
npm run build
npm run start
```

Run a development server, this will watch for code changes:

```bash
npm run dev
```

Run with Docker

```bash
docker build -t swiftcloud-api .

docker run -p 4000:4000 --env-file .env --network="host" --name swiftcloud-api -d swiftcloud-api
```

### Generate the migrations

In case you make changes to the model, you need to generate the database migration files. They will automatically apply once the server is started on any environment.

```bash
npm run migration:generate src/migrations/{{your-file-name}}
```

### Data parsing script

In this project, the initial data set is transformed to the database model and inserted using a script. This can be found in the swiftcloud-data-parser directory.

Create the `.env` file at the `swiftcloud-data-parser` folder, copy the `.env.example` file and replace the values with your own.

Install the packages:

```bash
cd swiftcloud-data-parser
npm ci
```

Run the script:

```bash
npm run dev
```

## Usage

For using the API, please refer to the [Swagger Documentation](https://swiftcloud.pallemans.com/api). Not all querying possibilities are documented because they heavily rely on the model that is queried.

The API supports the following features:

- Querying a list of data
  - Standard pagination and offset based pagination
  - Relational querying
  - Sorting
  - Searching
  - OR query
  - Different query operators (like, not, between)
- Querying a single entity by id
  - Relational querying

An example query would be the following:

Give me all songs and their monthly stats that are released between 2019 and 2020, ordered by release year:
https://swiftcloud.pallemans.com/songs?releaseYear.$between=2019,2020&order=releaseYear&include=album,songMonthlyStats

## How it works

The query is parsed using a set of predefined tags that match the TypeORM FindOperators. This is then send to the TypeORM repository.find method, which parses the query to a SQL where statement. The possibilities are therefore similar to what you can do with basic SQL where clauses.

## Maintainers

| name                                                              | email                 | GitHub                                                |
| ----------------------------------------------------------------- | --------------------- | ----------------------------------------------------- |
| [Brecht Pallemans](https://www.linkedin.com/in/brecht-pallemans/) | brecht.p@appman.co.th | [brechtpallemans](https://github.com/brechtpallemans) |
