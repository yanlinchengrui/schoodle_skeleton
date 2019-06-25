# Schoodle

## Project 

Schoodle is an event polling app where friends can create events and have their friends vote on which days they are available.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body-parser 1.15.x or above
- Cookie-session 1.3.x or above
- Dotenv 2.0.x or above
- EJS 2.4.x or above
- Express 4.13.x or above
- Knex 0.11.x or above
- Moment 2.24.x or above
- PG 6.0.x or above

## Screenshots
