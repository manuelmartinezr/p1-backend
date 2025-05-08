import express from 'express';
import { readController, createController} from './user.controller.js'; // se importa la función del controller

const router = express.Router();

// endpoint functions
async function getUser(req, res) {
  const { correo, contraseña } = req.body;
  try {
    user = await readController(correo, contraseña);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}

async function registerUser(req, res) { 
  const { correo, contraseña, permisos} = req.body;
  try {
    user = await createController(correo, contraseña, permisos);
    res.status(200).json(user);
  } catch (error) {
        res.status(401).json({error : error.message});
  }
}
// endpoints
router.post('/login', getUser);
router.post('/register', registerUser); 
export default router;