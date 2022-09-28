# RESTful API Node Server Boilerplate


By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.


- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [NPM](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Docker support**
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:


PORT=3000


REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81

# Port number
PORT=3000

# URL of itunes api
ITUNES_HOST_URL=https://itunes.apple.com

#Redis parameters
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:


`POST /v1/favoritos` - agregar cancion favorita
`GET /v1/search_tracks` - busca canciones artista


## License

[MIT](LICENSE)




swagger

http://localhost:3000/v1/favoritos/
