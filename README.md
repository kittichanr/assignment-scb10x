# Assignment-llm

this project is assignment to demo of web chat ai with typhoon open ai

### Stack

- Next.js 
- Python (Flask Api)
- Postgresql

### Prerequisite
- your machine need to have environment to start project follow this.
  - docker & docker-compose
  - python version >= 3
  - node version >= 18
- if you not have at above please install and setup first

### Installation for start project
1. Database
   1. run docker compose to instance database in your local `docker-compose -f docker-compose.yml up`
   2. test connection database in local
      1. username: `postgres`
      2. password: `password`
      3. database_name: `llm`
      4. host: `http://localhost`
      5. port: `5432`

2. Backend
   1. go to folder `/backend` in terminal `cd backend`
   2. copy `.env.example` to `.env`
      1. you can change any value that you want but default value it already work. 
   3. create environment python, install dependencies, migrated database run script `make init` (use only first time)
   4. run server `make run`

3. Frontend
   1. open new terminal and go to folder `/frontend` in terminal `cd frontend`
   2. copy `.env.example` to `.env`
      1. you can change any value that you want but default value it already work.
   3. `npm install -g pnpm` if you already pnpm package can skip.
   4. `pnpm install` for install dependencies
   5. `pnpm dev` for start next.js


### How to play
1. you need to register account first `http://localhost:3000/sign-up`
2. sign in for go to home page `http://localhost:3000/sign-in`
3. in the homepage you can chat with ai and adjust parameter for increase ability of model ai.
4. I hope you enjoy this demo thank you 🎉