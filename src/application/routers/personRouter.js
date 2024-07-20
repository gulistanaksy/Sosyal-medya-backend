const express =  require('express');
//import PersonController from '../controllers/personController';
const PersonController= require('../controllers/personController')

const personController = new PersonController();

const router = express.Router();

router.post('/add', personController.createPerson);
router.get('/listAllPersons', personController.listAllPersons);


//export default router;
module.exports = router;

