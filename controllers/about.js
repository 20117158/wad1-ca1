'use strict';

//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import employees from "../models/employees-store.js";
import info from "../models/app-store.js";
// Defining the about object
const about = {
  //method to create the view
  createView(request, response) {
    //logs that the page is loading
    logger.info("About page loading!");
    //Getting the data that will be used
    const viewData = {
      title: "About",
      employees: employees.getAppInfo(),
      info: info.getAppInfo()
    };
    // Renders the template and passes the "View data" object
    response.render('about', viewData);
  },
};
//Exporting for routing
export default about;
