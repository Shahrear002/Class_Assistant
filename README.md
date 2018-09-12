# Class_Assistant

### To Run the app (Server Only)

##### make sure, Class_Assistant/server directory & type the following command

```sh
$ npm run app
```

### To Run the app (Client Only - React)

##### make sure, Class_Assistant/server/client directory & type the following command

```sh
$ npm start
```

### To Run the app (Server & Client concurrently)

##### make sure, Class_Assistant/server directory & type the following command

```sh
$ npm run dev
```

## docker build:

#### cd to /server/client/

```sh
client : $ docker build -t react-app .
```

##### cd to /server/

```sh
server : $ docker build -t server-app .
```

### now run FROM

#### cd to /server/

```sh
run: $ docker-compose up
```
