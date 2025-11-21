import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const sslConfig = process.env.DB_SSL === 'true' || process.env.DB_SSL_MODE === 'REQUIRED' 
  ? {
      rejectUnauthorized: false, // Set to true in production with proper CA certificate
    }
  : undefined;

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getDepartments(res);
  if (req.method === 'POST') return createDepartment(req, res);
  return res.status(405).json({ message: 'Method Not Allowed' });
}

// GET: All Departments
async function getDepartments(res: VercelResponse) {
  try {
    const [rows] = await db.query("SELECT * FROM departments");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// POST: Create Department
async function createDepartment(req: VercelRequest, res: VercelResponse) {
  const { abbreviation, name, description, status } = req.body;

  if (!abbreviation || !name || !description || !status)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  try {
    await db.query(
      "INSERT INTO departments (abbreviation, name, description, status) VALUES (?, ?, ?, ?)",
      [abbreviation, name, description, status]
    );
    res.status(201).json({ success: true, message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
