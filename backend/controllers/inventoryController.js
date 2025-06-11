const pool = require('../db');

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, stock, cost } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, stock, cost) VALUES (?, ?, ?, ?)',
      [name, description, stock, cost]
    );
    res.status(201).json({ id: result.insertId, name, description, stock, cost });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, cost } = req.body;
  try {
    await pool.query(
      'UPDATE products SET name = ?, description = ?, stock = ?, cost = ? WHERE id = ?',
      [name, description, stock, cost, id]
    );
    res.json({ id, name, description, stock, cost });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
