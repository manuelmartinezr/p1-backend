import express from 'express';
import { readController, createController, updateController, deleteController} from './libro.controller.js'; // se importa la función del controller
import { authenticateJWT, authorize } from '../middleware/auth.js';
const router = express.Router();

// endpoint functions
async function getLibro(req, res) {
  const { id, incluir_reservados, incluir_deshabilitados, ...others } = req.query;
  try {
    const result = await readController(
      id || others,
      incluir_reservados,
      incluir_deshabilitados
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
async function addLibro(req, res) {
  const { titulo, autor, editorial, fecha_pub, genero } = req.body;
  try {
    const libro = await createController(titulo, autor, editorial, fecha_pub, genero);
    res.status(200).json(libro);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}
async function updateLibro(req, res) {
  const id = req.params.id;
  const updates = req.body;
  try {
    const libro = await updateController(id, updates);
    res.status(200).json(libro);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}
async function deleteLibro(req, res) {
  const id = req.params.id;
  try {
    const libro = await deleteController(id);
    res.status(200).json(libro);
  } catch (error) {
    res.status(401).json({error : error.message});
  }
}

// endpoints
router.get('/search', getLibro);
router.post('/add',
  authenticateJWT,
  authorize('crear_libros'),
  addLibro);
router.put('/update/:id',
  authenticateJWT,
  authorize('editar_libros'),
  updateLibro);
router.patch('/delete/:id',
  authenticateJWT,
  authorize('inhabilitar_libros'),
  deleteLibro);
export default router;