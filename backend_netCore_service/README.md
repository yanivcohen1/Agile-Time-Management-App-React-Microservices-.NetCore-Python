# .NET Core Auth Service

This is the authentication and user management service, built with ASP.NET Core 9.0 and MongoDB.

## 🚀 Technologies

*   **Framework**: ASP.NET Core 9.0 Web API
*   **Database**: MongoDB (via Entity Framework Core)
*   **Testing**: xUnit, FluentAssertions, WebApplicationFactory
*   **Documentation**: Swagger / OpenAPI

## 🛠 Setup & Installation

### Prerequisites
*   .NET 9.0 SDK
*   MongoDB (running locally on default port 27017)

### Configuration
Configuration is managed via ppsettings.json and YAML files:
*   dev.appsettings.yaml: Development settings.
*   prod.appsettings.yaml: Production settings.

## 🏃‍♂️ Running the Service

### Restore Dependencies
`ash
dotnet restore
`

### Run Application
Runs the API on http://localhost:5000 and https://localhost:5001.

`ash
cd AuthApi
dotnet run
`

### Run Tests
Executes the integration tests.

`ash
dotnet test
`

## 🔑 Key Features
*   **JWT Authentication**: Secure token-based auth.
*   **Role-Based Access**: Admin and User roles.
*   **Todo Management**: CRUD operations for Todos (linked to Users).
*   **Health Checks**: /health endpoint.
