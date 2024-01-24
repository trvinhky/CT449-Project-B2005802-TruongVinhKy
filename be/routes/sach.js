const router = require("express").Router();
const sachControllers = require('../controllers/sachControllers')

router.post('/', sachControllers.create)
router.put('/:MASACH', sachControllers.edit)
router.get('/all', sachControllers.getAll)
router.get('/detail', sachControllers.getOne)
router.get('/count', sachControllers.getCount)
router.get('/search', sachControllers.search)

module.exports = router;