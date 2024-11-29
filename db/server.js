const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("productos.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the productos database.");
});

app.post('/api/categorias', (req, res) => {
  const { nombre } = req.body;

  // Verificar si el nombre es obligatorio
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
  }

  // Verificar si la categoría ya existe en la base de datos
  const checkCategorySql = 'SELECT COUNT(*) AS count FROM categoria WHERE nombre = ?';
  db.get(checkCategorySql, [nombre], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar la categoría' });
    }

    // Si la categoría ya existe, devolver un error
    if (row.count > 0) {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }

    // Si no existe, insertar la nueva categoría
    const sql = 'INSERT INTO categoria (nombre) VALUES (?)';
    db.run(sql, [nombre], function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({
        idCategoria: this.lastID, // Devuelve el ID de la nueva categoría
        nombre,
      });
    });
  });
});



app.get('/api/categorias', (req, res) => {
  const sql = 'SELECT * FROM categoria';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.get("/api/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, categoria, precio, stock, stockMinimo } = req.body;

  const sql = 'INSERT INTO productos (nombre, descripcion, categoria, precio, stock, stockMinimo) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [nombre, descripcion, categoria, precio, stock, stockMinimo];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: 'Error al agregar el producto: ' + err.message });
    }
    res.status(201).json({
      idProducto: this.lastID,
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      stockMinimo,
    });
  });
});


app.delete('/api/productos/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID del producto no proporcionado." });
  }

  const sql = 'DELETE FROM productos WHERE id = ?';
  db.run(sql, [id], function (error) {
    if (error) {
      return res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.status(200).json({ message: "Producto eliminado con éxito." });
  });
});

app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params; 
  const { nombre, descripcion, categoria, precio, stock } = req.body;

  const sql = `UPDATE productos SET 
                nombre = ?, 
                descripcion = ?, 
                categoria = ?, 
                precio = ?, 
                stock = ? 
              WHERE id = ?`;
  
  const params = [nombre, descripcion, categoria, precio, stock, id];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: "Error al actualizar el producto: " + err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    // Opcional: Puedes obtener el producto actualizado para devolverlo en la respuesta
    db.get(`SELECT * FROM productos WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener el producto actualizado", error: err.message });
      }
      res.json(row); // Devolver el producto actualizado
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
