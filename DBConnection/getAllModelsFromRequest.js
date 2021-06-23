const mongoose = require('mongoose');
const { createModelsFromDirs } = require('./modelUtils');

let tenantModels = {};

// Set this to null when the dbName is changed to connectionUrl
let mongoConnPrefix = 'mongodb://localhost:27017/';

module.exports = async function getAllModelsFromRequest(req, databaseName) {
  // console.log('Checking for tenant id in header');

  let tenantId = req.headers['x-tenantid'];
  let dbUrl = req.headers['x-databasename'];
  // console.log("tenantId: " + tenantId + " dbName: " + dbUrl)
  let allModels = null;

  if (!tenantId || !dbUrl) {
    tenantId = 'defaultTenant';
    dbUrl = databaseName;
  }
  // console.log(dbUrl);
  if (!dbUrl.startsWith('mongodb://')) {
    dbUrl = mongoConnPrefix + dbUrl;
  }
  // console.log(dbUrl);
  allModels = await getAllModels(tenantId, dbUrl);
  return allModels;
}

async function getAllModels(tenantId, dbUrl) {

  // console.log('Getting allModels for', tenantId, 'and db', dbUrl);

  let currTenantModel = null;

  // Create the models if they don't yet exist
  if (!tenantModels[tenantId]) {
    let conn = await mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    tenantModels[tenantId] = await createModelsFromDirs(conn, process.cwd() + '\\');
  }

  currTenantModel = tenantModels[tenantId];

  return currTenantModel;
}
