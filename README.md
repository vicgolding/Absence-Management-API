Absence Management API
======================

The Absence Management API is a simple REST API with CRUD methods.

It allows employees to request or log absences,
and for their manager to approve or deny said requests.

A request can be one of the following types:

Holiday (Ferien), illness (Krankheit), course (Weiterbildung), other (Sonstiges).

This was conceived as an onboarding project to introduce .NET, React,
and Domain-Driven Design principles.

- The .NET backend service is used for the API, routing, serving data, CORS configuration,
and other server-side concerns.
- In the frontend, the React app is used for all UI concerns.
- API requests are automatically proxied to the backend.

Project structure
---

- Backend
    - Program.cs
    - Domain layer
        - Entities
            - AbsenceRequest
            - Employee
        - Enums
            - AbsenceStatus
            - AbsenceType
        - Interfaces
            - IAbsenceRepository
    - Infrastructure layer
        - ApplicationDbContext
        -  Repositories
        - AbsenceRepository
    - Application layer
        - Controllers
            - AbsenceRequestsController
- Frontend presentation layer
    - client-app/src/App.js
    - client-app/src/functions.js

The working directory for the build command is the project root.

The Program.cs file serves as the application's main entry point
and contains the startup code.

Built with
---

- SQLite (file-based) - Database
- .NET v10.0/C# - Backend
- React v19.2.7 - Frontend
- npm - Package manager
- Vite - Frontend build tool
- TypeScript
- Bootstrap v5.3.8 - UI Framework
- Bootstrap Icons v1.13.1 - Icon library
- Reactstrap v9.2.3 - React component library
- Toastify v11.1.0 - React toast notifications library
- Fetch API - JavaScript interface for calling the API and making HTTP requests
- Selenium - Browser automation framework and ecosystem
- Mocha - JavaScript test framework
- Chai - Test assertion library

Getting Started
---

### Prerequisites
- Node.js with npm (included)
  - Verify with `node -v`
- .NET 10.0 SDK
  - Verify with `dotnet --list-sdks`

### Installation

First, clone (or fork your own copy of) this repository onto your local machine:

```
git clone https://github.com/vicgolding/Absence-Management-API.git
```

#### Backend API Service

Change to the directory (cd) that will contain the project.

```
cd Absence-Management-API
```

Build and run the app by executing the following command in the working directory:

```
dotnet build
```

#### Client App

Install all dependencies (third-party npm packages):

```
cd client-app
npm install
```


## Usage

1. To run the server project, run this command in the `./Absence-Management-API` directory:

```
dotnet run --launch-profile https
```

The frontend JavaScript development server can be run independently,
but has to be launched manually.

2. To start the development server and launch the React app in development mode,

run this in the `./Absence-Management-API/client-app` directory:

```
npm start
```

The web server starts the app and makes it available on localhost.

Environment and URLs
---

The API server serves endpoints at
[https://localhost:5013/](https://localhost:5013/).

The React app serves the client application at
[https://localhost:5173/](https://localhost:5173/).

The OpenAPI specification is reachable at
[https://localhost:5013/scalar/](https://localhost:5013/scalar/).

### Supported endpoints

The requests return structured, JSON-encoded responses.

| HTTP method | Endpoint                              | Purpose                                 | Resource URL                                                | Has body |
|-------------|---------------------------------------|-----------------------------------------|-------------------------------------------------------------|----------|
| GET         | /api/absence-requests                 | Retrieve a list of all absence requests | https://localhost:5013/api/absence-requests                 | Yes      |
| GET         | /api/absence-requests/{id}            | Retrieve one specific absence request   | https://localhost:5013/api/absence-requests/12345           | Yes      |
| POST        | /api/absence-requests                 | Create a new absence request            | https://localhost:5013/api/absence-requests/                | Yes      |
| PUT         | /api/absence-requests/{id}            | Replace an entire absence request       | https://localhost:5013/api/absence-requests/12345           | Yes      |
| DELETE      | /api/absence-requests/{id}            | Delete one specific absence request     | https://localhost:5013/api/absence-requests/12345           | Yes      |
| POST        | /api/absence-requests/approve?id={id} | Approve one specific absence request    | https://localhost:5013/api/absence-requests/approve?id={id} | No       |
| POST        | /api/absence-requests/deny?id={id}    | Deny one specific absence request       | https://localhost:5013/api/absence-requests/deny?id={id}    | No       |

Testing
---

- [v1.0.0 Test Plan](https://github.com/vicgolding/Absence-Management-API/wiki/v1.0.0-Test-Plan)
- [Example Bug Report](https://github.com/vicgolding/Absence-Management-API/wiki/Example-Bug-Report)

### How to run tests

First, ensure that the servers and applications are running.

#### API Tests

You can test the API using curl on the command line, for example:

```
curl https://localhost:5013/api/absence-requests --header 'Accept: application/json'
```

Or by using Scalar: [https://localhost:5013/scalar/](https://localhost:5013/scalar/)


#### Frontend Tests

Frontend tests are located here:
`Absence-Management-API/client-app/test/functions.test.js`

To run all tests with the following command from the client app directory:

```
npm test
```

The test runner, Mocha, will automatically run every test in the test directory.

Deployment (TODO)
---

Node.js is only required to be installed on the server for the development build.

Build the client app for production to the build folder:

```
npm run build
```

Contribute
---

- Source Code: [github.com/vicgolding/Absence-Management-API](https://github.com/vicgolding/Absence-Management-API)

Support
---

Let us know if you have any issues.
Contact us at: hello@vicgolding.com

Resources
---

This project would not have been possible without the following resources:



License
---

The project is licensed under the GNU GENERAL PUBLIC LICENSE v3.0.