# Musasampo - Group 4

MUSASAMPO - Fulfilling all your music needs with a single website. We offer services for bands and fans alike.

Musasampo contains of 4 Parts:

* PostgreSQL
* MySQL
* API for the chat function
* API for the music and user features
* Websocket
* React frontend

Requirements: Node.js, Docker, Docker-compose


## 1. PostgreSQL

Database for storing chat messages, users, channels and user-channel connections.


### Getting Started

Pull the newest image from Docker Hub

    docker pull postgres 
    
Make an empty directory for storing data outside of the container.
    
    mkdir -p $HOME/docker/volumes/postgres 


Start the Postgres Container

    docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=<Your_Password> -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres 

-p: Bind port 5432 on localhost to port 5432 within the container. After setting up firewall rules the container is accessible from outside at http://<your_ip>:5432.

-v: Mount $HOME/docker/volumes/postgres on the host machine to the container side volume path /var/lib/postgresql/data created inside the container. This ensures that postgres data persists even after the container is removed.

### Inserting Data

##### 1. Create a Database

        docker exec -it <container_id> bash
        psql -U postgres
        
Create Database SQL statement.  

        CREATE DATABASE <database_name>;
        
Connect to your database 

        \c <database_name>
        
##### 2. Create a Table

For creating the table run following SQL Statement:

    CREATE TABLE <table_name>(
      column1_name SERIAL PRIMARY KEY,
      column2_name integer
    );
 
##### 3. Inserting data (CLI)

    INSERT INTO table_name(column1, column2, …)
    VALUES (value1, value2, …);


## 2. MySQL

TBD.


## 3. API for the chat function

API for making requests to the PostgreSQL Database.

### Getting Started

Files: https://github.com/ProdDesProject/Group4/tree/chat-css/postgres-server

Building your image

    docker-compose build
    
Run the images
 
    docker-compose up
    
The API is now accessible under http://<your_ip>:3000    
 
 
## 4. API for the music and user features    

TBD.


## 5. Websocket

Websocket for sending messages between connected clients.

### Getting Started

Files: https://github.com/ProdDesProject/Group4/tree/chat-css/Websocket

Building your image

    docker-compose build
    
Run the images
 
    docker-compose up

The Websocket is now accessible under ws://<your_ip>:3030

## 6. React frontend


### Overview

<img src="https://github.com/HauptschuIe/IoT-Project/blob/master/images/frontend.png" width="400" height="200">

### Deployment

Create the Dockerfile.

    touch Dockerfile

Edit Dockerfile.

    nano Dockerfile
    
Insert following code.

    FROM nginx
    COPY . /usr/share/nginx/html

Create a build directory with a production build of the react app

    npm run build

Create a directory containing the Dockerfile and the production build.
Create Nginx docker Image and start an instance of the image.

    docker build -t nginx .
    docker run --name nginx -d -p 8080:80 nginx
