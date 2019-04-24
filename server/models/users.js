'use strict';
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const constants=require('../utils/constants')

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    address: DataTypes.STRING,
    contactNumber: DataTypes.BIGINT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    toWhomPersonName: DataTypes.STRING,
    age: DataTypes.INTEGER
  });
  users.associate = function(models) {
    users.hasMany(models.bookings,
      {
        foreignKey:'userid',
        as:'user',
  })
};

// to varify logIn user is a valid user
users.prototype.authenticationUser = function (password) 
{    
  return bcrypt.compareSync(password, this.password);     
}; 

// to create token for user
users.prototype.CreateToken = function () 
{   
  return jwt.sign({ id: this.id }, constants.JWT_SECRET)  
 };

 // to get token to user
users.prototype.toAuthJSON = function () 
{    
  return {      
    token: 'jwt' + ' ' + this.CreateToken(),      
    ...this.toJSON()    
  }  
}; 

// to display feilds of user
users.prototype.toJSON = function () {    
  return {      
    id: this.id, 
    userName: this.userName,
    address: this.address,
    contactNumber: this.contactNumber,    
    email: this.email,
    toWhomPersonName: this.toWhomPersonName,
    age: this.age
  }  
};

  return users;
};