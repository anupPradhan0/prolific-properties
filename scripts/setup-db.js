// Run this with: node scripts/setup-db.js
require("dotenv").config({ path: ".env.local" });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function setup() {
  const client = await pool.connect();
  
  try {
    console.log("🔧 Setting up database...");
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table created");

    // Check if user already exists
    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      ["abhilash.panda8383@gmail.com"]
    );

    if (existingUser.rows.length === 0) {
      // Hash password
      const hashedPassword = await bcrypt.hash("abhilash8383", 10);
      
      // Insert user
      await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        ["abhilash.panda8383@gmail.com", hashedPassword]
      );
      console.log("✅ User created: abhilash.panda8383@gmail.com");
    } else {
      console.log("⚠️ User already exists");
    }

    console.log("\n🎉 Database setup complete!");
    console.log("\nLogin credentials:");
    console.log("Email: abhilash.panda8383@gmail.com");
    console.log("Password: abhilash8383");

  } catch (error) {
    console.error("❌ Error setting up database:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
