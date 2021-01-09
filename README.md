# Project Boilerplate

## Pre-requisites

1. Make sure you have installed in your machine:

- Docker
- Robo3T (Optional, but recommended for viewing MongoDB)

## Starting the containers

- You must have a .env file in your root folder to start this project. Please, reach me out on Slack or joaopaulofurtado@live.com for getting a proper copy of your .env file. **Without it, your project won't run.**

1. Run:

```
docker-compose up
```

## Accessing your database on Robo3T

- Make sure that before accessing your database, your docker db container is up and running.
- Please install the free edition of Robo3T
- Click on "File" option, then on "Connect..."
- Create a new connection
- "Connection" tab
  - Set name as "Project Boilerplate"
  - Address should be "localhost"
  - Port: 27017
- "Authentication" tab
  - Database: "admin"
  - User Name: "admin"
  - Password: ask joaopaulofurtado@live.com
  - Auth mecanism: "SCRAM-SHA-1"

## Accessing API Routes

- Download postman
- Ask project admin for Workspace invitation.
