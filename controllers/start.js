'use strict';
//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
// Defining the start object
const start = {
  //method to create the view
  createView(request, response) {
    //logs that the page is loading
    logger.info("Start page loading!");
 //Getting the data that will be used
    const viewData = {
      title: "Zoo Home Page",
      info: appStore.getAppInfo()
    };
   // Renders the template and passes the "View data" object
    response.render('start', viewData);   
  },
};
//Exporting for routing
export default start;
