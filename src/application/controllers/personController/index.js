// import listAllPersons from './listAllPersons';
// import createPerson from './createPerson';

const listAllPersons = require('./listAllPersons')
const createPerson= require('./createPerson')

class PersonController {
     listAllPersons = listAllPersons;
     createPerson = createPerson;
}

module.exports = PersonController;