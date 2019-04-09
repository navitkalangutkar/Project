'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    amount: DataTypes.INTEGER,
    bookingDate: DataTypes.DATE,
    userid: DataTypes.INTEGER,
    eventid: DataTypes.INTEGER,
    managerid: DataTypes.INTEGER
  });
  bookings.associate = function(models) {
    bookings.belongsTo(models.events, 
      {
        foreignKey:'eventid',
      }), 
      bookings.belongsTo(models.users, 
        {
          foreignKey:'userid',
        }),
        bookings.belongsTo(models.managers, 
          {
            foreignKey:'managerid',
          });
  };
  return bookings
};