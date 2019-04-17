const usersController = require("../controllers").users;
const eventsController = require("../controllers").events;
const managersController = require("../controllers").managers;
const bookingsController = require("../controllers").bookings;
const validationsController = require("../controllers").validations;
const listController = require("../controllers").list;

module.exports = (app) => 
{
  app.get("/api", (req, res) => res.status(200).send(
    {
      message: "Welcome to the Event Management System API!",
    }));

    // User table controllers
   app.post("/api/user", usersController.create);           // to create user
   app.get("/api/user", usersController.list);              // to display all users
   app.put("/api/user/:id", usersController.update);        // to update data from user
   app.delete("/api/user/:id", usersController.destroy);    // to delete user

    // event table controllers
    app.post("/api/event", eventsController.create);         // to create event and checking if already exist date event
    app.get("/api/event", eventsController.list);            // to display all events
    app.put("/api/event/:id", eventsController.update);      // to update event
    app.delete("/api/event/:id", eventsController.destroy);  // to delete event
    app.post("/api/event/date", eventsController.availabledates); // to display available dates for booking event
    app.post("/api/event/date/upcoming", eventsController.upcomingEvent);

    app.post("/api/event/date", listController.list);

    // manager table controllers
    app.post("/api/manager", managersController.create);      // to cerate manager
    app.get("/api/manager", managersController.list);         // to diaplay all managers
    app.put("/api/manager/:id", managersController.update);   // to update manager
    app.delete("/api/manager/:id", managersController.destroy); // to delete manager

    app.get("/api/manager/available", managersController.availableManager); // to display all active available managers for events

    // Booking table controllers
    app.post("/api/booking", bookingsController.create);        // to create booking
    app.get("/api/booking", bookingsController.list);           // to display all booking list
    app.put("/api/booking/:id", bookingsController.update);     // to update booking   
    app.delete("/api/booking/:id", bookingsController.destroy); // to delete booking
    app.post("/api/validates", validationsController.createBooking);  // to create booking  with validation check
    app.get("/api/booking/available", bookingsController.listManagers); // to display all managers who are active with event details
  };