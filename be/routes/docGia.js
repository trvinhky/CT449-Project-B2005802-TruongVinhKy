const router = require("express").Router();
const docGiaControllers = require('../controllers/docGiaControllers')

router.post('/register', docGiaControllers.register)
router.post('/login', docGiaControllers.logIn)
router.put('/:MADOCGIA', docGiaControllers.edit)
router.get('/detail', docGiaControllers.getOne)
router.get('/all', docGiaControllers.getAll)
router.get('/count', docGiaControllers.getCount)

module.exports = router;