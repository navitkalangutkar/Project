"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("events", 
  {
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    amount: DataTypes.INTEGER
  });
  events.associate = function(models) {
    events.hasMany(models.bookings,
      {
        foreignKey:"eventid",
        as:"eventid",
  });
};
  return events;
};