Absence Management API
======================

The Absence Management API is a simple CRUD REST API that allows employees to request or
log absences, and for their manager to approve or deny said requests.

A request can be one of the following types:

Holiday (Ferien), illness (Krankheit), course (Weiterbildung), other (Sonstiges).

Built as learning project using .NET and React, and following DDD principles.

Project structure
---
- Backend (.NET)
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
- Frontend presentation layer (React)
    - client-app/src/App.js
    - client-app/src/functions.js

Built with
---

- SQLite (file-based) - Database
- .NET v10.0/C# - Backend
- React v19.2.7 - Frontend
- Bootstrap v5.3.8 - UI Framework
- Bootstrap Icons v1.13.1 - Icon library
- Reactstrap v9.2.3 - React component library
- Toastify v11.1.0 - React toast notifications library
- Fetch API - JavaScript interface for making HTTP requests

Contribute
---

- Source Code: [github.com/vicgolding/Absence-Management-API](https://github.com/vicgolding/Absence-Management-API)

Support
---

Let us know if you have any issues.
Contact us at: hello@vicgolding.com

License
---

The project is licensed under the GNU GENERAL PUBLIC LICENSE v3.0.