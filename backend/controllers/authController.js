const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Use env variable in production

// Simulated fingerprint validation function (stub)
async function validateFingerprint(workerId, fingerprintData) {
  // For now, just simulate success if fingerprintData matches 'valid_fingerprint'
  return fingerprintData === 'valid_fingerprint';
}

exports.login = async (req, res) => {
  const { workerKey, fingerprintData } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE worker_key = ?', [workerKey]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid worker key' });
    }
    const user = rows[0];

    // If fingerprintData is provided, validate it
    if (fingerprintData) {
      const validFingerprint = await validateFingerprint(user.id, fingerprintData);
      if (!validFingerprint) {
        return res.status(401).json({ message: 'Invalid fingerprint' });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, roles: user.roles }, SECRET_KEY, { expiresIn: '8h' });

    res.json({ token, user: { id: user.id, name: user.name, roles: user.roles } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
