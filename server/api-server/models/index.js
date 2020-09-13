let fs = require('fs');
let path = require('path');
const { Sequelize, DataTypes }= require('sequelize');

module.exports = function (sequelize) {
  let db = {};

  let modelFiles = fs.readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    });

  modelFiles.forEach((file) => {
    let model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
    db[modelName].sync();
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}