'use strict';
//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import animalstore from '../models/animal-store.js';
// Defining the dashboard object
const dashboard = {
  //method to create the view
  createView(request, response) {
    //logs that the page is loading
    logger.info("Dashboard page loading!");
    //Getting the data that will be used
    const viewData = {
      title: "Animal info",
      animalCollection: animalstore.getAllAnimal()

    };
    //debugging logger
    logger.debug(viewData.animalCollection);
    // Renders the template and passes the "View data" object
    response.render('dashboard', viewData);
  },
};
//Exporting for routing
export default dashboard;

