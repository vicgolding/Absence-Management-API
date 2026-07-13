Absence Management API
======================

The Absence Management API is a simple CRUD REST API that allows employees to request or
log absences, and for their manager to approve or deny said requests.

A request can be one of the following types:

Holiday (Ferien), illness (Krankheit), course (Weiterbildung), other (Sonstiges).

Built as learning project using .NET and React, and following DDD principles.

Project structure
---
- Backend (.NET 8)
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

Tasks and To-Dos
---

- [X] Functioning backend implementation using .NET/C#
- [X] Project structure follows a simple DDD architecture
- [X] API endpoint for getting all requests
- [X] API endpoint for getting a specific request by its GUID
- [X] API endpoint for creating a new request
- [X] API endpoint for updating a specific request by its GUID
- [X] API endpoint for deleting a specific request by its GUID
- [X] API endpoint for approving a specific request by its GUID
- [X] API endpoint for denying a specific request by its GUID
- [X] Implement business rule: Only pending requests can be approved or denied
- [ ] Implement business rule: No time overlaps between employees
- [X] Implement business rule: Approved/denied requests are read-only
- [X] Functioning frontend implementation using React
- [X] Frontend implementation: Overview of all requests
- [X] Frontend implementation: Form for new request
- [X] Frontend implementation: Ability to approve request
- [X] Frontend implementation: Ability to deny request
- [X] Frontend implementation: Ability to delete request
- [X] Frontend implementation: View of current request status
- [X] Frontend implementation: Simple success and error notifications
- [X] Frontend implementation: Simple form validation
- [ ] Implement tests
- [ ] Optional: Docker deployment
- [X] README: Brief project description (what the project does, why the project is useful)
- [X] README: Project structure
- [ ] README: How to get started (prerequisites, installation guide)
- [ ] README: Guide on how to run the tests
- [ ] README: How to use the system
- [ ] README: How to deploy the system

Built with
---

- SQLite (file-based) - Database
- .NET/C# - Backend
- React - Frontend
- Bootstrap / Reactstrap - UI Framework
- Fetch API - communication with backend

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