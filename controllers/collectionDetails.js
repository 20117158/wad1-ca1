'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const collectionDetails = {
  createView(request, response) {
    logger.info("details loading!");
    
    const viewData = {
      title: "collection details",
      info: appStore.getAppInfo()
    };
    
    response.render('collectionDetails', viewData);   
  },
};

export default collectionDetails;