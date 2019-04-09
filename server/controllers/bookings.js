const booking = require('../models').bookings;
const managers = require('../models').managers;
const { Op } = require('sequelize')

module.exports = 
{
  create(req, res) // to create booking table
  {
    return booking.create(
      {
        id:req.body.id,
        amount: req.body.amount,
        bookingDate: req.body.bookingDate,
        userid: req.body.userid,
        eventid: req.body.eventid,
        managerid: req.body.managerid,
      })
      .then(booking => res.status(201).send(booking))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) // to display all data from table
  {
    return booking
    .findAll()
    .then(bookings => res.status(200).send(bookings))
    .catch(error => res.status(400).send(error));
  },
  update(req, res) // to update data in booking table
  {        
    const id = req.params.id;        
    booking.update({amount: req.body.amount},            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully a booking with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from table
  {          
    booking.destroy(
    {          
      where :{id:req.params.id}          
    })          
     .then(() => res.status(200).send("Deleted successfully a booking"))         
     .catch(error => res.status(400).send(error));            
  }, 
  listManagers(req, res){   // to find list of avialables managers details with events done
    return booking
    .findAll({
      include: [{
          model: managers,
          where: { status: 1 }
      }],
  })
  .then(bookings => res.status(200).send(bookings))
  .catch(error => res.status(400).send(error));
  },
};