# Fitness Tracker

A full-stack gym and nutrition tracking app built with C# ASP.NET Core, React, and Azure.

## Tech Stack

- **Backend:** C# ASP.NET Core 8 Web API
- **Database:** SQL Server (via Docker locally, Azure SQL in production)
- **Frontend:** React + Recharts *(coming in Week 3)*
- **Hosting:** Azure App Service *(coming in Week 7)*
- **CI/CD:** GitHub Actions *(coming in Week 8)*

---

## Week 1 Setup — Getting Started

### Prerequisites

Install these before you begin:

1. [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. [Visual Studio Code](https://code.visualstudio.com/) with the **C# Dev Kit** extension
4. [Git](https://git-scm.com/)

---

### Step 1 — Start SQL Server in Docker

From the root of the project (where docker-compose.yml lives):

```bash
docker-compose up -d
```

This pulls and starts SQL Server in a container. It will be available at `localhost:1433`.

Verify it is running:

```bash
docker ps
```

You should see `fitness-tracker-db` in the list.

---

### Step 2 — Restore NuGet packages

```bash
cd backend/FitnessTracker
dotnet restore
```

---

### Step 3 — Run your first database migration

This creates the database schema and seeds the starter exercise data:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

> If `dotnet ef` is not found, install it with:
> `dotnet tool install --global dotnet-ef`

---

### Step 4 — Run the API

```bash
dotnet run
```

The API will start on `http://localhost:5000`.

---

### Step 5 — Test in Swagger

Open your browser and go to:

```
http://localhost:5000/swagger
```

You should see the Swagger UI with all your endpoints listed. Try clicking **GET /api/exercises** and hitting **Execute** — you should get back the seeded exercise list.

---

## Project Structure

```
fitness-tracker/
├── backend/
│   └── FitnessTracker/
│       ├── Controllers/        # API endpoints
│       ├── Data/               # Database context
│       ├── Models/             # Data models
│       ├── Program.cs          # App entry point
│       └── appsettings.json    # Config (connection strings)
├── docker-compose.yml          # Local SQL Server
└── .gitignore
```

---

## Week 1 Milestone Checklist

- [ ] Docker Desktop installed and running
- [ ] SQL Server container running (`docker ps`)
- [ ] `dotnet restore` completes without errors
- [ ] Migration created and applied
- [ ] API starts with `dotnet run`
- [ ] Swagger UI loads at `http://localhost:5000/swagger`
- [ ] GET /api/exercises returns the seeded exercise list
- [ ] Code pushed to GitHub

Once all boxes are ticked, you are ready for Week 2.
