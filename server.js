const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Book = require("./models/Book");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Library Book Management API is running"
  });
});

// POST /api/books
app.post("/api/books", async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publicationYear
    } = req.body;

    // Validation
    if (
      !title ||
      !author ||
      !isbn ||
      !category ||
      !publicationYear
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if ISBN already exists
    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        message: "A book with this ISBN already exists"
      });
    }

    // Create book
    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      publicationYear
    });

    // Save to MongoDB
    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});