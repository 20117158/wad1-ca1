'use strict';
//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import animalstore from '../models/animal-store.js';
import { v4 as uuidv4 } from 'uuid';

// Defining the dashboard object
const dashboard = {
  //method to create the view
  createView(request, response) {
    //logs that the page is loading
    logger.info("Dashboard page loading!");
    //Getting the data that will be used
    const viewData = {
      title: "Animal info",
      animalCollection: animalstore.getAllAnimals()

    };
    //debugging logger
    logger.debug(viewData.animalCollection);
    // Renders the template and passes the "View data" object
    response.render('dashboard', viewData);
  },
addSpecies(request, response) {
  const newSpecies = {
    id: uuidv4(),
    species: request.body.species,
    animals: [],
  };
  animalstore.addSpecies(newSpecies, request.files.image, function() {
    response.redirect("/dashboard");
  });
},

deleteSpecies(request, response) {
  const speciesId = request.params.id;
  logger.debug(`Deleting Species ${speciesId}`);
  animalstore.removeSpecies(speciesId, function() {
    response.redirect("/dashboard");
  });
},

};
//Exporting for routing
export default dashboard;

