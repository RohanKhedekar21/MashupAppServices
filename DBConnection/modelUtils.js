const mongoose = require('mongoose');
const fs = require('fs');

function createModels(dbConnection, schemas) {
  console.log('Creating models...');
//  console.log('Schemas is : ', schemas)

  if (!dbConnection) {
    console.log('dbConnection is null...using default connection');
    dbConnection = mongoose.connection;
  }

  let ret = {};
  for (let currEntry of schemas) {
    let currModelName = currEntry.collectionName + "Model";
   console.log('Current Model is : ', currModelName)

    ret[currModelName] = dbConnection.model(currModelName, currEntry.schema, currEntry.collectionName);
  }

  return ret;
}

// Fuse many nodels into a destination model
function fuseModels(destModel, ...srcModels) {
  // Iterate over all source models
  for (let currModel of srcModels) {
    // For all keys in current model, copy the references to the destination
    for (let modelName in currModel) {
      destModel[modelName] = currModel[modelName];
    }
  }
}

// Iterate over a series of directories to create models
function createModelsFromDirs(dbConnection, ...schemaDirs) {
  let retModels = {};

  // For all directories specified as arguments
  for (let currDir of schemaDirs) {
    console.log('Current Directory is : ', currDir);
  
    //handle slash and folder path 
    if (currDir.endsWith("DBConnection\\")) {
      currDir = currDir.substring(0, currDir.length - 1);
      currDir = currDir + "/";
    } else if (currDir.endsWith("\\")) {
      currDir = currDir.substring(0, currDir.length - 1);
      currDir = currDir + "/DBConnection/";
    }
    
    // Read the listing, filter for schema files, and create models
    fs.readdirSync(currDir)
      .filter((item) => {
//        console.log('Item is : ', item);
        return item.endsWith('Schemas.js');
      })
      .map((item) => {
//        console.log('Item in map is : ', item)
        let currModels = createModels(dbConnection, require(currDir + item));
        fuseModels(retModels, currModels);
      });
  }

  return retModels;
}

module.exports = {
  createModels,
  fuseModels,
  createModelsFromDirs
};
