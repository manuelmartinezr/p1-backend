import express from 'express';
import { readOneController, readListController} from './libro.controller.js'; // se importa la función del controller

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
// endpoints
router.get('/search', getLibro);
export default router;