import express from 'express';
import { readOneController, readListController} from './libro.controller.js'; // se importa la función del controller

const router = express.Router();

// endpoint functions
async function getLibro(req, res) {
  const { id, incluir_reservados, incluir_deshabilitados, ...others } = req.query;
  const result = id 
  ? await readOneController(id, incluir_reservados, incluir_deshabilitados) 
  : await readListController({
    ...others,
    incluir_reservados,
    incluir_deshabilitados
  })
}
// endpoints
router.get('/search', getLibro);
export default router;