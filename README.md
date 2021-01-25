# Project Boilerplate

# Project Overview (Video)

[API](https://youtu.be/ccyTRSPek7U)
[MOBILE](https://youtu.be/K2lbm0qMLoI)
[WEB](https://youtu.be/6b4eUkXB81A)

# Folder structure

- Create a folder structure like this (Just create a root folder manually, cd into it and start cloning the projects from Github):

  /ProjectBoilerplate

  - /pb-api
  - /pb-web
  - /pb-mobile

- Note that "pb" stands for project boilerplate.
- You can find the repository links in our Jira board.

## Pre-requisites

1. Make sure you have installed in your machine:

- Docker
- Robo3T (Optional, but recommended for viewing MongoDB)

## Starting the containers

- You must have a .env file in your **pb-api, pb-web and pb-mobile** folders to start this project. Please, reach me out on Slack or joaopaulofurtado@live.com for getting a proper copy of your .envs files. **Without it, your project won't run properly.**

1. Run:

```
docker-compose up
```

# Accessing our database on Compass GUI

- When creating a new connection, paste:

```
mongodb://admin:32258190@localhost:27017/localhost?authSource=admin
```

- PS: admin is your MONGO_INITDB_ROOT_USERNAME and 32258190 is your MONGO_INITDB_ROOT_PASSWORD

## Accessing our database on Robo3T (recommended)

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

- Download Postman
- Ask project admin for Workspace invitation.
