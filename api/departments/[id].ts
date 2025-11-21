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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Route based on HTTP method
  switch (req.method) {
    case 'GET':
      return getDepartment(req, res);
    case 'PUT':
      return updateDepartment(req, res);
    case 'DELETE':
      return deleteDepartment(req, res);
    default:
      return res.status(405).json({ 
        message: 'Method Not Allowed',
        receivedMethod: req.method,
        allowedMethods: ['GET', 'PUT', 'DELETE', 'OPTIONS']
      });
  }
}

// GET: Single Department
async function getDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    const [rows]: any = await db.query("SELECT * FROM departments WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// PUT: Update Department
async function  updateDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const { abbreviation, name, description, status } = req.body;

  try {
    const [result]: any = await db.query(
      "UPDATE departments SET abbreviation = ?, name = ?, description = ?, status = ? WHERE id = ?",
      [abbreviation, name, description, status, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Department not found' });

    res.json({ success: true, message: 'Department updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// DELETE: Remove Department
async function deleteDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    const [result]: any = await db.query("DELETE FROM departments WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Department not found' });

    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
