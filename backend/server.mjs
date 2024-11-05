import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Create the express application
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory
const dataDirectory = path.join(__dirname, 'data');

// Helper function to read JSON data
const readData = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Helper function to write JSON data
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get the full path for db.json
const getDbFilePath = () => path.join(dataDirectory, 'db.json');

// ** PRODUCTS ENDPOINTS ** //

// Get all products
app.get('/api/products', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        res.json(data.products);
    } catch (error) {
        console.error('Error reading products data:', error.message);
        res.status(500).send('Error reading products data');
    }
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const product = data.products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        console.error('Error reading products data:', error.message);
        res.status(500).send('Error reading products data');
    }
});

// Create a new product
app.post('/api/products', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const newProduct = { id: data.products.length + 1, ...req.body }; // Generate new ID
        data.products.push(newProduct);
        writeData(getDbFilePath(), data);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error saving products data:', error.message);
        res.status(500).send('Error saving products data');
    }
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Product not found');
        data.products[index] = { id: parseInt(req.params.id), ...req.body };
        writeData(getDbFilePath(), data);
        res.json(data.products[index]);
    } catch (error) {
        console.error('Error updating products data:', error.message);
        res.status(500).send('Error updating products data');
    }
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Product not found');
        const deletedProduct = data.products.splice(index, 1);
        writeData(getDbFilePath(), data);
        res.json(deletedProduct[0]);
    } catch (error) {
        console.error('Error deleting products data:', error.message);
        res.status(500).send('Error deleting products data');
    }
});

// ** USERS ENDPOINTS ** //

// Get all users
app.get('/api/user', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        res.json(data.user);
    } catch (error) {
        console.error('Error reading users data:', error.message);
        res.status(500).send('Error reading users data');
    }
});

// Get a user by ID
app.get('/api/user/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const user = data.user.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        console.error('Error reading users data:', error.message);
        res.status(500).send('Error reading users data');
    }
});

// Create a new user
app.post('/api/user', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const newUser = { id: data.user.length + 1, ...req.body }; // Generate new ID
        data.user.push(newUser);
        writeData(getDbFilePath(), data);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error saving users data:', error.message);
        res.status(500).send('Error saving users data');
    }
});

// Update a user by ID
app.put('/api/user/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.user.findIndex(u => u.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('User not found');
        data.user[index] = { id: parseInt(req.params.id), ...req.body };
        writeData(getDbFilePath(), data);
        res.json(data.user[index]);
    } catch (error) {
        console.error('Error updating users data:', error.message);
        res.status(500).send('Error updating users data');
    }
});

// Delete a user by ID
app.delete('/api/user/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.user.findIndex(u => u.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('User not found');
        const deletedUser = data.user.splice(index, 1);
        writeData(getDbFilePath(), data);
        res.json(deletedUser[0]);
    } catch (error) {
        console.error('Error deleting users data:', error.message);
        res.status(500).send('Error deleting users data');
    }
});

// ** CATEGORIES ENDPOINTS ** //

// Get all categories
app.get('/api/categories', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        res.json(data.categories);
    } catch (error) {
        console.error('Error reading categories data:', error.message);
        res.status(500).send('Error reading categories data');
    }
});

// Get a category by ID
app.get('/api/categories/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const category = data.categories.find(c => c.id === parseInt(req.params.id));
        if (!category) return res.status(404).send('Category not found');
        res.json(category);
    } catch (error) {
        console.error('Error reading categories data:', error.message);
        res.status(500).send('Error reading categories data');
    }
});

// Create a new category
app.post('/api/categories', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const newCategory = { id: data.categories.length + 1, ...req.body }; // Generate new ID
        data.categories.push(newCategory);
        writeData(getDbFilePath(), data);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error saving categories data:', error.message);
        res.status(500).send('Error saving categories data');
    }
});

// Update a category by ID
app.put('/api/categories/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.categories.findIndex(c => c.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Category not found');
        data.categories[index] = { id: parseInt(req.params.id), ...req.body };
        writeData(getDbFilePath(), data);
        res.json(data.categories[index]);
    } catch (error) {
        console.error('Error updating categories data:', error.message);
        res.status(500).send('Error updating categories data');
    }
});

// Delete a category by ID
app.delete('/api/categories/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.categories.findIndex(c => c.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Category not found');
        const deletedCategory = data.categories.splice(index, 1);
        writeData(getDbFilePath(), data);
        res.json(deletedCategory[0]);
    } catch (error) {
        console.error('Error deleting categories data:', error.message);
        res.status(500).send('Error deleting categories data');
    }
});

// ** ASSETS ENDPOINTS ** //

// Get all assets
app.get('/api/assets', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        res.json(data.assets);
    } catch (error) {
        console.error('Error reading assets data:', error.message);
        res.status(500).send('Error reading assets data');
    }
});

// Get an asset by ID
app.get('/api/assets/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const asset = data.assets.find(a => a.id === parseInt(req.params.id));
        if (!asset) return res.status(404).send('Asset not found');
        res.json(asset);
    } catch (error) {
        console.error('Error reading assets data:', error.message);
        res.status(500).send('Error reading assets data');
    }
});

// Create a new asset
app.post('/api/assets', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const newAsset = { id: data.assets.length + 1, ...req.body }; // Generate new ID
        data.assets.push(newAsset);
        writeData(getDbFilePath(), data);
        res.status(201).json(newAsset);
    } catch (error) {
        console.error('Error saving assets data:', error.message);
        res.status(500).send('Error saving assets data');
    }
});

// Update an asset by ID
app.put('/api/assets/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.assets.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Asset not found');
        data.assets[index] = { id: parseInt(req.params.id), ...req.body };
        writeData(getDbFilePath(), data);
        res.json(data.assets[index]);
    } catch (error) {
        console.error('Error updating assets data:', error.message);
        res.status(500).send('Error updating assets data');
    }
});

// Delete an asset by ID
app.delete('/api/assets/:id', (req, res) => {
    try {
        const data = readData(getDbFilePath());
        const index = data.assets.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Asset not found');
        const deletedAsset = data.assets.splice(index, 1);
        writeData(getDbFilePath(), data);
        res.json(deletedAsset[0]);
    } catch (error) {
        console.error('Error deleting assets data:', error.message);
        res.status(500).send('Error deleting assets data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
