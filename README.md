```markdown
markdownCopy code
# Blockhouse - Takehome Project

## Overview

Blockhouse is a full-stack web application built with a **Next.js** frontend and a **Django** API backend. The project includes interactive data visualizations using various charts that dynamically fetch data from the Django API. The application has been Dockerized for easy setup and deployment.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Running the Application](#running-the-application)
5. [Docker Configuration](#docker-configuration)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)
8. [Future Enhancements](#future-enhancements)

## Technologies Used

- **Frontend**: Next.js (React) with TypeScript
- **Backend**: Django with Django REST Framework
- **Styling**: Tailwind CSS
- **Charts**: Recharts for charting and data visualizations
- **Docker**: Containerization for both frontend and backend
- **Database**: SQLite (for development)
- **API**: RESTful API endpoints powered by Django

## Project Structure

```bash
blockhouse/
├── backend/
│   ├── blockhouse/           # Django project folder
│   ├── charts/               # Django app for charts API
│   ├── Dockerfile            # Docker configuration for the backend
│   ├── manage.py             # Django management file
│   └── requirements.txt      # Backend dependencies
├── frontend/
│   ├── app/                  # Next.js pages and components
│   ├── Dockerfile            # Docker configuration for the frontend
│   ├── package.json          # Frontend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── docker-compose.yml        # Docker Compose file for orchestrating frontend and backend
└── README.md                 # Project documentation

```

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Docker and Docker Compose
- Node.js (for local development without Docker)
- Python 3.9+ (for backend development)

### 1. Clone the Repository

```bash
bashCopy code
git clone https://github.com/your-repo/blockhouse.git
cd blockhouse

```

### 2. Docker Setup

The project is fully containerized using Docker. Both the frontend (Next.js) and backend (Django) are set up to run inside containers.

### Build and Run the Application

```bash
bashCopy code
docker-compose up --build

```

This command builds both the frontend and backend containers and starts the services:

- Frontend (Next.js) at [http://localhost:3000](http://localhost:3000/)
- Backend (Django API) at [http://localhost:8000](http://localhost:8000/)

### Stopping the Containers

```bash
bashCopy code
docker-compose down

```

### 3. Running the Application (Without Docker)

### Backend (Django)

Navigate to the backend folder:

```bash
bashCopy code
cd backend

```

Install the dependencies:

```bash
bashCopy code
pip install -r requirements.txt

```

Run the Django development server:

```bash
bashCopy code
python manage.py runserver

```

The backend will be available at [http://localhost:8000](http://localhost:8000/).

### Frontend (Next.js)

Navigate to the frontend folder:

```bash
bashCopy code
cd frontend

```

Install the dependencies:

```bash
bashCopy code
npm install

```

Run the Next.js development server:

```bash
bashCopy code
npm run dev

```

The frontend will be available at [http://localhost:3000](http://localhost:3000/).

## Docker Configuration

### Docker Compose Configuration

The `docker-compose.yml` file orchestrates both services:

```yaml
yamlCopy code
version: "3.8"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"

```

### Frontend Dockerfile

The `frontend/Dockerfile` sets up the Next.js app and ensures the app is built and served in production mode:

```
dockerfileCopy code
# Dockerfile for Next.js Frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

```

### Backend Dockerfile

The `backend/Dockerfile` sets up the Django app, installs the required Python packages, and starts the server:

```
dockerfileCopy code
# Dockerfile for Django Backend
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

```

## API Endpoints

The Django backend provides the following API endpoints to fetch data for the charts:

- **Candlestick Chart Data**: `/api/candlestick-data/`
- **Line Chart Data**: `/api/line-chart-data/`
- **Bar Chart Data**: `/api/bar-chart-data/`
- **Pie Chart Data**: `/api/pie-chart-data/`

All data is hardcoded for the purpose of this take-home project.

## Testing

### Django Backend Tests

To run tests for the Django backend, ensure `pytest` is installed and run:

```bash
bashCopy code
pytest

```

### Next.js Frontend Tests

For the Next.js frontend, you can use Jest for testing. To run the tests:

```bash
bashCopy code
npm run test

```

## Future Enhancements

- **Pagination or Filtering**: Implement pagination or filters for large datasets in the charts.
- **Authentication**: Add user authentication to secure the dashboard.
- **Deployment**: Deploy the project to platforms like Vercel (for frontend) and Heroku (for backend) or host both using Docker on AWS/GCP.
