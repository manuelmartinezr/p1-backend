import express from 'express';
import { readOneController, readListController, createController} from './libro.controller.js'; // se importa la función del controller
import { authenticateJWT, authorize } from '../middleware/auth.js';
const router = express.Router();

// endpoint functions
async function getLibro(req, res) {
  const { id, incluir_reservados, incluir_deshabilitados, ...others } = req.query;
  try {
    const result = id 
    ? await readOneController(id, incluir_reservados, incluir_deshabilitados) 
    : await readListController({
      ...others,
      incluir_reservados,
      incluir_deshabilitados
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({error : error.message});
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
// endpoints
router.get('/search', getLibro);
router.post('/add',
  authenticateJWT,
  authorize('crear_libros'),
  addLibro);
export default router;