const  express = require('express')
const  router  = express.Router();

const RutaController = require('../controller/RutaController.js')

router.get('/',           RutaController.index)
router.get('/image/add',  RutaController.create)
router.post('/image/add', RutaController.store)
router.get('/image/delete/:id', RutaController.delete)
module.exports= router