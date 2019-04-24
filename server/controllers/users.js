const user = require('../models').users;
const bcrypt = require('bcrypt');

module.exports = {
  create(req, res) // to create user table
  {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
          return res.status(500).json({
              error: err
          });
      } else {
        return user.create(
        {
        userName: req.body.userName,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        password: hash,
        toWhomPersonName: req.body.toWhomPersonName,
        age: req.body.age,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
      }
    });
  },
  login(req, res) {
    res.status(200).json(req.user.toAuthJSON());
  },
  list(req, res) // to display all users from table
  {
    return user
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  findById(req, res) {
    user.findByPk(req.user.id)
        .then(users => {
            res.send(users);
        })
  },
  update(req, res) // to update data from table
  {        
    const id = req.user.id;        
    user.update({ contactNumber: req.body.contactNumber,toWhomPersonName: req.body.toWhomPersonName },            
      { 
        where: { id: req.user.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully user Detail with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from users
  {          
    user.destroy(
    {          
      where :{id:req.user.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully user"))         
    .catch(error => res.status(400).send(error));            
  }, 
};