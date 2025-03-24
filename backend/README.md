
# Ticketing System Backend

This is a Go backend for the Ticketing System application. It provides RESTful APIs for managing shows, tickets, and orders.

## Features

- Show management (CRUD operations)
- Ticket type management
- Seat selection and reservation
- Order processing
- Integration with MySQL database

## Technology Stack

- Go (Golang)
- Gin Web Framework
- MySQL
- Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine
- Go 1.21+ (for local development)

### Setup

1. Clone the repository
2. Navigate to the backend directory
3. Copy `.env.example` to `.env` and update the values if needed

```bash
cp .env.example .env
```

### Running with Docker

1. Start the application using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Build and start the Go API server
- Start a MySQL database server
- Initialize the database with the schema and sample data

2. The API will be available at: `http://localhost:8080/api`

### Running Locally (without Docker)

1. Make sure you have a MySQL server running
2. Update the .env file with your MySQL connection details
3. Run the application:

```bash
go run main.go
```

## API Endpoints

### Shows

- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get a specific show
- `POST /api/shows` - Create a new show
- `PUT /api/shows/:id` - Update a show
- `DELETE /api/shows/:id` - Delete a show

### Ticket Types

- `GET /api/ticket-types` - Get all ticket types
- `GET /api/ticket-types/:id` - Get a specific ticket type

### Seats

- `GET /api/shows/:id/seats` - Get all seats for a show
- `GET /api/shows/:id/seats/:type` - Get seats by type for a show

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order

### Sponsors

- `GET /api/sponsors` - Get all sponsors

## Database Schema

The database includes the following tables:

- `shows` - Information about comedy shows
- `ticket_types` - Available ticket types
- `seats` - Seating information for each show
- `customers` - Customer information
- `orders` - Order information
- `order_items` - Items in each order
- `sponsors` - Sponsor information

## Development

### Structure

- `main.go` - Entry point and router setup
- `schema.sql` - Database schema and sample data
- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker Compose configuration

### Adding New Endpoints

To add a new endpoint:

1. Create a handler function in `main.go`
2. Add the route to the router in the `initRoutes()` function

Example:

```go
func getSomeResource(c *gin.Context) {
    // Implementation
}

func initRoutes() *gin.Engine {
    // ...
    api.GET("/some-resource", getSomeResource)
    // ...
}
```
