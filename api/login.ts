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
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0)
      return res.json({ success: false, message: 'Invalid username or password' });

    const user = rows[0];

    res.json({
      success: true,
      message: 'Login successful!',
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,

    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}
