const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('productos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos productos.db.');
});

const createTableCategoriaSQL = `
  CREATE TABLE IF NOT EXISTS categoria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
);
`;

const createTableProductosSQL = `
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL,
    stockMinimo INTEGER NOT NULL,
    categoria TEXT,
    FOREIGN KEY (categoria) REFERENCES categoria(nombre) ON DELETE SET NULL
);

`;



db.run(createTableProductosSQL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Tabla "productos" creada o ya existe.');
  }
});

db.run(createTableCategoriaSQL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Tabla "categoria" creada o ya existe.');
  }
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Cerrada la conexión a la base de datos.');
});
