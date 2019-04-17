const manager = require("../models").managers;

module.exports = {
  create(req, res) // to create manager table
  {
    return manager.create(
      {
        id:req.body.id,
        managerName: req.body.managerName,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status,
        working: req.body.working,
      })
      .then(function(manager){res.status(201).send(manager)})
      .catch(function(error){res.status(400).send(error)});
  },
  list(req, res) // to display all managers from table
  {
    return manager
    .findAll()
    .then(function(managers){res.status(200).send(managers)})
    .catch(function(error){res.status(400).send(error)});
  },
  update(req, res) // to update data from table
  {        
    const id = req.params.id;        
    manager.update({ status: req.body.status, working: req.body.working },            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully Manager Detail with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from manager table
  {          
    manager.destroy(
    {          
      where :{id:req.params.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully Manager"))         
    .catch(function(error){res.status(400).send(error)});            
  }, 
  availableManager(req, res) // to find active available managers from table
  {                      
    manager.findAll(
    {                 
      where:{status:"1", working:"0"}                
    })
    .then(function(manager)
    {                    
      res.send(manager);                 
    });           
  },
};