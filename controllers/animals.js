'use strict';
//importing all the necessary stores and the logger
import logger from '../utils/logger.js';
import animalstore from '../models/animal-store.js';
import { v4 as uuidv4 } from 'uuid';
// Defining the animals object
const animals = {
  //method to create the view
  createView(request, response) {
    //setting ids
    const animalId = request.params.id;
    logger.debug(`animal id = ${animalId}`);
    //Getting the data that will be used
    const viewData = {
      title: 'Animals',
      singleSpecies: animalstore.getAnimal(animalId)
    };
// Renders the template and passes the "View data" object
logger.debug(`singleSpecies = ${JSON.stringify(viewData.singleSpecies)}`);  // add this
    response.render('collectionDetails', viewData);
  },
addAnimal(request, response) {
     const newAnimal = {
       id: uuidv4(),
       Name: request.body.Name,
       Age: request.body.Age,
       Food: request.body.Food,
       pic: request.body.pic,
     };
     animalstore.addAnimal(request.params.id, newAnimal);
     response.redirect('/dashboard');
   },
addAnimalView(request, response) {
     const animalId = request.params.id;
     logger.debug(`addAnimalView id = ${animalId}`); 

     const viewData = {
       title: 'Add Animal',
       species: animalstore.getAnimal(animalId),
     };
     logger.debug(`species = ${JSON.stringify(viewData.species)}`); 
     response.render('addanimal', viewData);
   },
deleteAnimal(request, response) {
  const animalId = request.params.id;
  const animalItemId = request.params.animalid;
  logger.debug(`Deleting Animal ${animalItemId} from Species ${animalId}`);
  animalstore.removeAnimal(animalId, animalItemId);
  response.redirect('/dashboard');
},
};
//Exporting for routing
export default animals;