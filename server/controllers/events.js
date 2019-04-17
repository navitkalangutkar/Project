const event = require("../models").events;
const { Op } = require("sequelize");


module.exports = {
  create(req, res) // to create event table and to check wheater already have event on the same date
  {
    var id=new Date(req.body.eventDate);
    return event.count({where:{eventDate: id}})
    .then(function (count) {
      if(count !== 0){
        res.send("Already have event on that Date");
      }
      else {
        event.create(
          {
            id:req.body.id,
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            amount: req.body.amount,
          })
          .then(function(event){ res.status(201).send(event)})
          .catch(function(error){res.status(400).send(error)});
      }
    })
  },
  list(req, res) // to display all events from table
  {
    return event
    .findAll()
    .then(function(events){ res.status(200).send(events)})
    .catch(function(error){ res.status(400).send(error)});
  },
  update(req, res) // to update data from table
  {        
    const id = req.params.id;        
    event.update({ eventName: req.body.eventName},            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully Event with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from event
  {          
    event.destroy(
    {          
      where :{id:req.params.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully Event"))         
    .catch(function(error){ res.status(400).send(error)});            
  }, 
  availabledates(req, res) // Bookings Details of Available dates
    { 
        var dateFrom = new Date(req.body.fromDate);
        var toDate = new Date(req.body.toDate);
        event.findAll({                 
          where: { [Op.and]: [{ eventDate: { [Op.between]: [dateFrom, toDate] } }] },
      })
      .then(events => {
        if (!events) {
          res.status(404).send({messsage:"No bookings found",});
        }
        else {
            res.send(events);
        }
    })
  },
  upcomingEvent(req, res)
    { 
        var date = new Date(req.body.date);
        event.findAll({                 
            where: { [Op.and]: [{ eventDate: { [Op.eq]:date } }] },
      })
      .then(function(events) {
        if (!events) {
          res.send("No event found");
        }
        else {
            res.send(events);
        }
    });
  },

};