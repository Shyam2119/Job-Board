# Data & REST API Reference

TalentFlow features 7 REST API endpoints built with Next.js Route Handlers (`app/api/`), connecting directly to Neon PostgreSQL via Prisma ORM.

## REST Endpoints

### 1. `GET /api/jobs`
- **Query Params**: `q`, `category`, `workMode`, `type`, `experience`, `industry`, `featured`, `limit`, `page`
- **Response**: `{ jobs: Job[], total: number, totalPages: number }`

### 2. `GET /api/jobs/[id]`
- **Response**: `{ job: Job }` or 404

### 3. `POST /api/jobs`
- **Body**: Posted job form details (`title`, `company`, `salary`, `description`, etc.)
- **Response**: Created job object with CUID

### 4. `GET /api/applications` & `POST /api/applications`
- **POST Body**: `{ jobId, fullName, email, phone, coverLetter, resumeUrl }`
- **Response**: Application record + increments job `applicantCount` in PostgreSQL

### 5. `GET /api/saved` & `POST /api/saved`
- **GET Params**: `sessionId`
- **POST Body**: `{ jobId, sessionId }`
- **Response**: Toggles saved bookmark state in PostgreSQL

### 6. `GET /api/companies`
- **Response**: List of hiring companies with logos, job counts, and ratings

### 7. `GET /api/stats`
- **Response**: `{ jobs, companies, seekers, placements }`
