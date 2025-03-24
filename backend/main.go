
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Show struct {
	ID        int       `json:"id"`
	Date      time.Time `json:"date"`
	Time      string    `json:"time"`
	City      string    `json:"city"`
	Venue     string    `json:"venue"`
	Address   string    `json:"address"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type TicketType struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Available   bool    `json:"available"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
}

type Seat struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Status string `json:"status"`
	Type   string `json:"type"`
}

type Order struct {
	ID        int       `json:"id"`
	ShowID    int       `json:"show_id"`
	CustomerID int      `json:"customer_id"`
	Total     float64   `json:"total"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type OrderItem struct {
	ID          int     `json:"id"`
	OrderID     int     `json:"order_id"`
	TicketTypeID int    `json:"ticket_type_id"`
	SeatID      string  `json:"seat_id"`
	Price       float64 `json:"price"`
	Quantity    int     `json:"quantity"`
}

type Customer struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Sponsor struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Logo string `json:"logo"`
}

var db *sql.DB

func initDB() {
	var err error
	
	// Load environment variables from .env file
	err = godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file")
	}
	
	// Get database connection details from environment variables
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	
	// Default values if environment variables are not set
	if dbUser == "" {
		dbUser = "root"
	}
	if dbHost == "" {
		dbHost = "localhost:3306"
	}
	if dbName == "" {
		dbName = "ticketing"
	}
	
	// Create the database connection string
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", dbUser, dbPass, dbHost, dbName)
	
	// Connect to the database
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	
	// Check the connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	
	log.Println("Connected to the database successfully")
}

func initRoutes() *gin.Engine {
	r := gin.Default()
	
	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))
	
	// API routes
	api := r.Group("/api")
	{
		api.GET("/shows", getShows)
		api.GET("/shows/:id", getShow)
		api.POST("/shows", createShow)
		api.PUT("/shows/:id", updateShow)
		api.DELETE("/shows/:id", deleteShow)
		
		api.GET("/ticket-types", getTicketTypes)
		api.GET("/ticket-types/:id", getTicketType)
		
		api.GET("/shows/:id/seats", getSeats)
		api.GET("/shows/:id/seats/:type", getSeatsByType)
		
		api.POST("/orders", createOrder)
		api.GET("/orders/:id", getOrder)
		
		api.GET("/sponsors", getSponsors)
	}
	
	return r
}

func getShows(c *gin.Context) {
	shows := []Show{}
	
	rows, err := db.Query("SELECT id, date, time, city, venue, address, status, created_at, updated_at FROM shows ORDER BY date")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var show Show
		if err := rows.Scan(&show.ID, &show.Date, &show.Time, &show.City, &show.Venue, &show.Address, &show.Status, &show.CreatedAt, &show.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		shows = append(shows, show)
	}
	
	c.JSON(http.StatusOK, shows)
}

func getShow(c *gin.Context) {
	id := c.Param("id")
	
	var show Show
	err := db.QueryRow("SELECT id, date, time, city, venue, address, status, created_at, updated_at FROM shows WHERE id = ?", id).
		Scan(&show.ID, &show.Date, &show.Time, &show.City, &show.Venue, &show.Address, &show.Status, &show.CreatedAt, &show.UpdatedAt)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Show not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, show)
}

func createShow(c *gin.Context) {
	var show Show
	if err := c.ShouldBindJSON(&show); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	result, err := db.Exec(
		"INSERT INTO shows (date, time, city, venue, address, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
		show.Date, show.Time, show.City, show.Venue, show.Address, show.Status)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	id, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	show.ID = int(id)
	c.JSON(http.StatusCreated, show)
}

func updateShow(c *gin.Context) {
	id := c.Param("id")
	
	var show Show
	if err := c.ShouldBindJSON(&show); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	_, err := db.Exec(
		"UPDATE shows SET date = ?, time = ?, city = ?, venue = ?, address = ?, status = ?, updated_at = NOW() WHERE id = ?",
		show.Date, show.Time, show.City, show.Venue, show.Address, show.Status, id)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, show)
}

func deleteShow(c *gin.Context) {
	id := c.Param("id")
	
	_, err := db.Exec("DELETE FROM shows WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Show deleted successfully"})
}

func getTicketTypes(c *gin.Context) {
	ticketTypes := []TicketType{}
	
	rows, err := db.Query("SELECT id, name, price, available, code, description FROM ticket_types")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var ticketType TicketType
		if err := rows.Scan(&ticketType.ID, &ticketType.Name, &ticketType.Price, &ticketType.Available, &ticketType.Code, &ticketType.Description); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ticketTypes = append(ticketTypes, ticketType)
	}
	
	c.JSON(http.StatusOK, ticketTypes)
}

func getTicketType(c *gin.Context) {
	id := c.Param("id")
	
	var ticketType TicketType
	err := db.QueryRow("SELECT id, name, price, available, code, description FROM ticket_types WHERE id = ?", id).
		Scan(&ticketType.ID, &ticketType.Name, &ticketType.Price, &ticketType.Available, &ticketType.Code, &ticketType.Description)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Ticket type not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, ticketType)
}

func getSeats(c *gin.Context) {
	showID := c.Param("id")
	
	// In a real application, you would query the database to get all seats for a show
	// For this example, we'll return mock data for different seat types
	
	// Get VIP seats
	vipSeats := []Seat{}
	vipRows, err := db.Query("SELECT id, name, status, 'VIP' as type FROM seats WHERE show_id = ? AND type = 'VIP'", showID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer vipRows.Close()
	
	for vipRows.Next() {
		var seat Seat
		if err := vipRows.Scan(&seat.ID, &seat.Name, &seat.Status, &seat.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		vipSeats = append(vipSeats, seat)
	}
	
	// Get regular seats
	regSeats := []Seat{}
	regRows, err := db.Query("SELECT id, name, status, 'REG' as type FROM seats WHERE show_id = ? AND type = 'REG'", showID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer regRows.Close()
	
	for regRows.Next() {
		var seat Seat
		if err := regRows.Scan(&seat.ID, &seat.Name, &seat.Status, &seat.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		regSeats = append(regSeats, seat)
	}
	
	// Get tables for 5
	t5Seats := []Seat{}
	t5Rows, err := db.Query("SELECT id, name, status, 'T5' as type FROM seats WHERE show_id = ? AND type = 'T5'", showID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer t5Rows.Close()
	
	for t5Rows.Next() {
		var seat Seat
		if err := t5Rows.Scan(&seat.ID, &seat.Name, &seat.Status, &seat.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		t5Seats = append(t5Seats, seat)
	}
	
	// Get tables for 10
	t10Seats := []Seat{}
	t10Rows, err := db.Query("SELECT id, name, status, 'T10' as type FROM seats WHERE show_id = ? AND type = 'T10'", showID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer t10Rows.Close()
	
	for t10Rows.Next() {
		var seat Seat
		if err := t10Rows.Scan(&seat.ID, &seat.Name, &seat.Status, &seat.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		t10Seats = append(t10Seats, seat)
	}
	
	// Combine all seats
	seats := map[string][]Seat{
		"vip": vipSeats,
		"regular": regSeats,
		"table5": t5Seats,
		"table10": t10Seats,
	}
	
	c.JSON(http.StatusOK, seats)
}

func getSeatsByType(c *gin.Context) {
	showID := c.Param("id")
	seatType := c.Param("type")
	
	seats := []Seat{}
	rows, err := db.Query("SELECT id, name, status, type FROM seats WHERE show_id = ? AND type = ?", showID, seatType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var seat Seat
		if err := rows.Scan(&seat.ID, &seat.Name, &seat.Status, &seat.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		seats = append(seats, seat)
	}
	
	c.JSON(http.StatusOK, seats)
}

func createOrder(c *gin.Context) {
	var order Order
	var customer Customer
	var orderItems []OrderItem
	
	// Decode the request body
	if err := c.ShouldBindJSON(&struct {
		Order     *Order      `json:"order"`
		Customer  *Customer   `json:"customer"`
		Items     []OrderItem `json:"items"`
	}{
		Order:    &order,
		Customer: &customer,
		Items:    orderItems,
	}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Start a transaction
	tx, err := db.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	// Insert customer if new
	if customer.ID == 0 {
		result, err := tx.Exec(
			"INSERT INTO customers (name, email, phone, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
			customer.Name, customer.Email, customer.Phone)
		
		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		
		customerID, err := result.LastInsertId()
		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		
		customer.ID = int(customerID)
	}
	
	// Create the order
	result, err := tx.Exec(
		"INSERT INTO orders (show_id, customer_id, total, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
		order.ShowID, customer.ID, order.Total, "confirmed")
	
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	orderID, err := result.LastInsertId()
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	order.ID = int(orderID)
	
	// Insert order items
	for _, item := range orderItems {
		_, err = tx.Exec(
			"INSERT INTO order_items (order_id, ticket_type_id, seat_id, price, quantity) VALUES (?, ?, ?, ?, ?)",
			orderID, item.TicketTypeID, item.SeatID, item.Price, item.Quantity)
		
		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		
		// Update seat status to 'taken'
		if item.SeatID != "" {
			_, err = tx.Exec("UPDATE seats SET status = 'taken' WHERE id = ?", item.SeatID)
			if err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
	}
	
	// Commit the transaction
	if err = tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	// Return the created order
	c.JSON(http.StatusCreated, gin.H{
		"order": order,
		"customer": customer,
		"items": orderItems,
	})
}

func getOrder(c *gin.Context) {
	id := c.Param("id")
	
	// Get order information
	var order Order
	err := db.QueryRow("SELECT id, show_id, customer_id, total, status, created_at, updated_at FROM orders WHERE id = ?", id).
		Scan(&order.ID, &order.ShowID, &order.CustomerID, &order.Total, &order.Status, &order.CreatedAt, &order.UpdatedAt)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	// Get customer information
	var customer Customer
	err = db.QueryRow("SELECT id, name, email, phone, created_at, updated_at FROM customers WHERE id = ?", order.CustomerID).
		Scan(&customer.ID, &customer.Name, &customer.Email, &customer.Phone, &customer.CreatedAt, &customer.UpdatedAt)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	// Get order items
	items := []struct {
		OrderItem
		TicketName string `json:"ticket_name"`
	}{}
	
	rows, err := db.Query(`
		SELECT oi.id, oi.order_id, oi.ticket_type_id, oi.seat_id, oi.price, oi.quantity, tt.name 
		FROM order_items oi
		JOIN ticket_types tt ON oi.ticket_type_id = tt.id
		WHERE oi.order_id = ?
	`, id)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var item struct {
			OrderItem
			TicketName string `json:"ticket_name"`
		}
		if err := rows.Scan(&item.ID, &item.OrderID, &item.TicketTypeID, &item.SeatID, &item.Price, &item.Quantity, &item.TicketName); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		items = append(items, item)
	}
	
	// Get show information
	var show Show
	err = db.QueryRow("SELECT id, date, time, city, venue, address, status, created_at, updated_at FROM shows WHERE id = ?", order.ShowID).
		Scan(&show.ID, &show.Date, &show.Time, &show.City, &show.Venue, &show.Address, &show.Status, &show.CreatedAt, &show.UpdatedAt)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"order": order,
		"customer": customer,
		"items": items,
		"show": show,
	})
}

func getSponsors(c *gin.Context) {
	sponsors := []Sponsor{}
	
	rows, err := db.Query("SELECT id, name, logo FROM sponsors")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var sponsor Sponsor
		if err := rows.Scan(&sponsor.ID, &sponsor.Name, &sponsor.Logo); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		sponsors = append(sponsors, sponsor)
	}
	
	c.JSON(http.StatusOK, sponsors)
}

func main() {
	// Initialize the database
	initDB()
	defer db.Close()
	
	// Initialize the routes
	r := initRoutes()
	
	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
