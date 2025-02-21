import express from 'express';

const router = express.Router();

// Rota de exemplo para listar usuários
router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários (a ser implementado)' });
});

export default router;
