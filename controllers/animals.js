'use strict';
//importing all the necessary stores and the logger
import logger from '../utils/logger.js';
import animalstore from '../models/animal-store.js';
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
    response.render('collectionDetails', viewData);
  },
};
//Exporting for routing
export default animals;