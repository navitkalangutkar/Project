const users = require("../models").users;
const events = require("../models").events;
const managers = require("../models").managers;
const bookings = require("../models").bookings;
const Sequelize = require("sequelize");
const Oper = Sequelize.Op;
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var dt = date.getDate();
if (dt < 10) {dt = "0" + dt;}
if (month < 10) {month = "0" + month;}
let datetoday= year+"-"+month+"-"+dt;

var userId, eventId, managerId;
module.exports = 
{
    createBooking(req,res)
    {
        userId= req.body.userId;
        eventId= req.body.eventId;
        managerId= req.body.managerId;
        if(!userId||!eventId||!managerId)
        {
            res.send("Please enter a valid user ID, event ID and manager ID");
        }
        else 
        {
            users.findOne(
                {
                where: { id:userId }
                })
                .then( function (users)
                    {
                    if(!users)
                        {res.send("Not found any user with that ID");}
                        else
                        {
                        events.findOne({where: { id:eventId, eventDate:{[Oper.gte]:datetoday}},})
                        .then( function (events)
                            {if(!events) {res.send("Not found any event with that ID");}
                                else
                                    {
                                     managers.findOne({ where: { id:managerId, status:1, working:0}})
                                    .then( function (managers) 
                                        {
                                        if(!managers){res.send("Already busy with another Event");}
                                        else
                                            {
                                            let amt=JSON.stringify(events.amount);
                                            let dateOfBooking=datetoday;
                                            bookings.create(
                                                {
                                                    amount:amt, bookingDate:dateOfBooking, userid:userId, eventid:eventId, managerid:managerId,
                                                })
                                                .then( function (bookings){ res.status(201).send("Created Booking")})
                                                .catch( function (error){res.status(400).send(error)});
                                                managers.update({ status:"0", working:"1"},
                                                {
                                                    where: {id:managerId}
                                                })
                                                .then( function (managers){ res.status(201).send(managers)})
                                                .catch( function(error){res.status(400).send(error)});
                                            }
                                        })
                                    }
                            })
                        }
                    });
        }
    },
};