'use strict';
module.exports = (sequelize, DataTypes) => {
  const managers = sequelize.define('managers', {
    managerName: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN,
    working: DataTypes.BOOLEAN
  });
  managers.associate = function(models) {
    managers.hasMany(models.bookings,
      {
        foreignKey:'managerid',
        as:'managerid',
  })
};
  return managers;
};