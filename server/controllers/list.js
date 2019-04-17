const event = require("../models").events;
const { Op } = require("sequelize");

const listDates = [];
var dateFrom = new Date( req.body.fromDate );
var toDate = new Date(req.body.toDate);
var i;
i.setDate(dateFrom(req.body.fromDate));
while(i<=toDate)
{
    var dates =
    {
        availableDate: i,
    }
    i++;
    console.log(i);
    listDates.push(dates);
}

module.exports =

list (req, res)
{
event.findAll({                 
    where: { [Op.and]: [{ eventDate: { [Op.between]: [i, toDate] } }] },
})
.then(events => {
  if (!events) {
    res.send(listDates)
  }
  else {
      res.send("Already booking has done");
  }
})
}