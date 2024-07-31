# BAZAR (E-COMMERCE PLATFORM)

### Table of Contents

1. <a href="#intro">Introduction</a>
2. <a href="#features">Features</a>
3. <a href="#tech">Technologies Used</a>
4. <a href="#install">Installation</a>
5. <a href="#usage">Usage</a>
6. <a href="#doc">API Documentation</a>
7. <a href="#related">Related repositories</a>

### <span id="intro">Introduction</span>
This project is a MVC based monolithic backend system for an e-commerce platform. It provides APIs for managing products, users, orders, and other functionalities required for an online store.

### <span id="features">Features</span>

- User authentication and authorization
- Email based reminder service
- Shopping cart functionality
- Orders history 
- Order processing
- Product filters
- Product management

### <span id="tech">Technologies Used</span>

- Programming Language: Javascript (Node.js)
- Database: MySQL
- ORM: Sequelize, Sequelize cli
- Authentication: JWT

### <span id="install">Installation</span>

1. Clone the repository

``` 
git clone https://github.com/Gaurav-Wagh1/bazar-platform.git
```
2. Move to the project's root directory
```
cd bazar-platform
```
3. Install dependencies

```
npm install
```
4. Create a .env file in root directory and add your environment variables. Check .env.sample for assistance


5. Create a config.json file inside `bazar-platform\src\config` directory with following content
```
{
    "development": {
      "username": "root",
      "password": "your-db-password",
      "database": "bitespeed-task-db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  
```

6. Move to the src/ directory
```
cd src
```

7. Run the given commands
```
npx sequelize db:create
npx sequelize db:migrate
```

### <span id="usage">Usage</span>
1. Start the server from root directory 
``` 
npm start
```

2. Access the API:
Open the API client (ex. Postman) to interact with the endpoints.

### <span id="doc">API Documentation</span>

For complete list of endpoints and detailed documentation, please refer to [API Documentation](docs/API.md).

### <span id="related">Related repositories</span>

* [Bazar platform front-end](https://github.com/Gaurav-Wagh1/bazar-platform-frontend)