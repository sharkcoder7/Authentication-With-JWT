# jwt Authentication implementation with Express and Mongodb

Feel free to comment, contribute, and open merge requests :)

# Install
```
$ git clone https://github.com/deneb0618/Authentication-With-JWT.git
$ cd express-login
$ npm install
```

You also need to create a create a `env.json` file at the root of the application (use env.exemple.json).

# Start

start `mongodb`

```
$ mongod
```

In a new window of the terminal
```
$ npm start
```

To run tests
```
$ npm run test
// or
$ npm run test-watch
```

# Routes

The routes available are :

### Sign up: `/api/users`

```
curl -s -D - POST \
  http://localhost:3000/api/users/signup \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'email=aphrodite%40test.com&password=aphrodite'
```

### Sign in: `/api/users/login`

```
curl -s -D - POST \
  http://localhost:3000/api/users/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'email=aphrodite%40test.com&password=aphrodite'
```

### Authenticate user : `/api/users/me`

```
curl -X GET \
  http://localhost:3000/api/users/me \
  -H 'cache-control: no-cache' \
  -H 'postman-token: aa4509ed-7372-d85b-9f83-c69f4a475c23' \
  -H 'x-auth: <MY_JWT_TOKEN>' \
  -d 'email=aphrodite4%40mythology.com&password=aphrodite'
```

### Logout user : `api/users/me/token`

```
curl -X DELETE \
  http://localhost:3000/api/users/me/token \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: f8b7f766-a86c-dae0-23c1-51e29fdf6406' \
  -H 'x-auth:  <MY_JWT_TOKEN>'
```
