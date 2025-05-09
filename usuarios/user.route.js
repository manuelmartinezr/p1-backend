import express from 'express';
import { readController, createController, updateController} from './user.controller.js'; // se importa la función del controller
import { authenticateJWT, authorize } from '../middleware/auth.js';
const router = express.Router();

// endpoint functions
async function getUser(req, res) {
  const { correo, contraseña } = req.body;
  try {
    const token = await readController(correo, contraseña);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}

async function registerUser(req, res) { 
  const { correo, contraseña, permisos} = req.body;
  try {
    const user = await createController(correo, contraseña, permisos);
    res.status(200).json(user);
  } catch (error) {
        res.status(401).json({error : error.message});
  }
}
async function updateUser(req, res) {
  const id = req.params.id;
  const updates = req.body;
  try {
    const user = await updateController(id, updates);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}
// endpoints
router.post('/login', getUser);
router.post('/register', registerUser); 
router.put('/update/:id',
  authenticateJWT,
  authorize('editar_usuarios'),
  updateUser);
export default router;