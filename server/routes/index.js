const usersController = require('../controllers').users;
const eventsController = require('../controllers').events;
const managersController = require('../controllers').managers;
const bookingsController = require('../controllers').bookings;
const validate=require('../services/authServices');

module.exports = (app) => 
{
  app.get('/api', (req, res) => res.status(200).send({message: 'Welcome to the Event Management System API!',}));

    // User table controllers
   app.post('/api/user', usersController.create);           // to create user and signIn
   app.post('/api/logIN',validate.authLocal, usersController.login);//user logIns
   app.get('/api/users', usersController.list);              // to display all users
   app.get('/api/user',validate.authJwt, usersController.findById);// single user
   app.put('/api/user',validate.authJwt, usersController.update);        // to update data from user
   app.delete('/api/user',validate.authJwt, usersController.destroy);    // to delete user

    // event table controllers
    app.post('/api/event', eventsController.create);         // to create event and checking if already exist date event
    app.get('/api/event', eventsController.list);            // to display all events
    app.get('/api/event/:id', eventsController.findById);// single user
    app.put('/api/event/:id', eventsController.update);      // to update event
    app.delete('/api/event/:id', eventsController.destroy);  // to delete event

    // manager table controllers
    app.post('/api/manager', managersController.create);      // to cerate manager
    app.get('/api/manager', managersController.list);         // to diaplay all managers
    app.get('/api/manager/:id', managersController.findById);// single user
    app.put('/api/manager/:id', managersController.update);   // to update manager
    app.delete('/api/manager/:id', managersController.destroy); // to delete manager

    // Booking table controllers
    app.post('/api/booking', bookingsController.create);        // to create booking with validation check
    app.get('/api/booking', bookingsController.list);           // to display all booking list
    app.get('/api/booking/user',validate.authJwt, bookingsController.findByUserId);//task single user
    app.put('/api/booking',validate.authJwt, bookingsController.update);     // to update booking   
    app.delete('/api/booking',validate.authJwt, bookingsController.destroy); // to delete booking
    app.get('/api/booking/available/:dateofMgr', bookingsController.findAvailableMgrByDate);
    app.post('/api/booking/dates', bookingsController.availableDates); // free dates available for event
    app.get('/api/booking/Today', bookingsController.todayEvents);// events on today date
    app.get('/api/booking/Tomorrow', bookingsController.tomorrowEvents);// tomorrow events
    app.get('/api/booking/Week', bookingsController.weekEvents);// week events
    app.get('/api/booking/Month', bookingsController.monthEvents);// month events
    app.get('/api/booking/year/:yeardate', bookingsController.yearEvents);// yearly events
  };