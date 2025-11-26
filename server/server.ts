import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const port = 4000;
const db = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12808486",
  password: "NWjg9wP4ac", // your Laragon password, usually empty
  database: "sql12808486", // change to your database name
  
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to FreeSQLDatabase successfully!");
    connection.release(); // release back to the pool
  } catch (err) {
    console.error("❌ Failed to connect to FreeSQLDatabase:", err);
  }
})();

// GOOGLE AUTH SETUP
const client = new OAuth2Client(
  "479399301536-idf2rpue77hqisbj9iore2bp64815qt4.apps.googleusercontent.com"
);

// ======================= REGISTER =======================
// app.post("/register", async (req, res) => {
//   const { fullname, username, password } = req.body;

//   if (!fullname || !username || !password) {
//     return res.status(400).json({ success: false, message: "All fields are required." });
//   }

//   try {
//     // Check if username already exists
//     const [existing]: any = await db.query("SELECT * FROM users WHERE username = ?", [username]);
//     if (existing.length > 0) {
//       return res.json({ success: false, message: "Username already exists." });
//     }

//     // For manual login users, google_id and email are not required.
//     await db.query(
//       `INSERT INTO users (fullname, username, password, role, email, google_id)
//        VALUES (?, ?, ?, 'employee', '', '')`,
//       [fullname, username, password]
//     );

//     res.json({ success: true, message: "Registration successful!" });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ success: false, message: "Registration failed. Please try again." });
//   }
// });



// ======================= MANUAL LOGIN =======================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid username or password." });
    }

    const user = rows[0];
    res.json({
      success: true,
      fullname: user.fullname,
      role: user.role,
      message: "Login successful!",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }

});

// ======================= GOOGLE LOGIN =======================
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "479399301536-idf2rpue77hqisbj9iore2bp64815qt4.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { sub: google_id, email, name } = payload!;

    const [rows]: any = await db.query("SELECT * FROM users WHERE google_id = ?", [
      google_id,
    ]);

    if (rows.length === 0) {
      await db.query(
        "INSERT INTO users (fullname, email, google_id, role) VALUES (?, ?, ?, ?)",
        [name, email, google_id, "student"]
      );
    }

    res.json({
      success: true,
      fullname: name,
      role: "admin",
      message: "Google login successful!",
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ success: false, message: "Google login failed." });
  }
});




// GET: All Departments
app.get("/departments", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM department");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Single Department by ID
app.get("/departments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM department WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Create Department
app.post("/departments", async (req, res) => {
  const { abbreviation, name, description, status } = req.body;

  if (!abbreviation || !name || !description || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO department (abbreviation, name, description, status) VALUES (?, ?, ?, ?)",
      [abbreviation, name, description, status]
    );
    res.json({ success: true, message: "Department added successfully" });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT: Update Department
app.put("/departments/:id", async (req, res) => {
  const { id } = req.params;
  const { abbreviation, name, description, status } = req.body;

  try {
    const [result]: any = await db.query(
      "UPDATE department SET abbreviation = ?, name = ?, description = ?, status = ? WHERE id = ?",
      [abbreviation, name, description, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ success: true, message: "Department updated successfully" });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE: Remove Department
app.delete("/departments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result]: any = await db.query("DELETE FROM department WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ======================= START SERVER =======================
app.listen(port, () => {
  console.log("Server running on http://localhost:4000");
});
