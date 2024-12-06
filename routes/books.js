const express = require('express');
const router = express.Router();

// Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const books = await prisma.libro.findMany();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

// Obtener un libro por su isbn
router.get('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = await prisma.libro.findUnique({
            where: { ISBN: isbn },
        });
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json(book);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
});

// Obtener libros de un autor en particular
router.get('/author/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const books = await prisma.libro.findMany({
            where: { Autor: author},
        });
        res.json(books);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros del autor' });
    }
});

// Obtener libros con precio mayor a 20
router.get('/price/:price', async (req, res) => {
    const { price } = req.params;
    try {
        const books = await prisma.libro.findMany({
            where: { Precio: { gt: parseFloat(price) } },
        });
        res.json(books);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});
//dame la ruta
// get /books/with-sales

// Obtener los libros con sus ventas
router.get('/with-sales', async (req, res) => {
    try {
        const booksWithSales = await prisma.libro.findMany({
            include: { Ventas: true },
        });
        res.json(booksWithSales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros con ventas' });
    }
});

module.exports = router;
