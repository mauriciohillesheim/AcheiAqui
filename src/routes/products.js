import express from 'express';
import Product from '../models/Product.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, userId: req.user.id });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o produto.' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o produto.' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Produto removido.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o produto.' });
  }
});

export default router;