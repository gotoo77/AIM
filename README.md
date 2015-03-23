[![Build Status](https://travis-ci.org/thanpolas/entity.png)](https://travis-ci.org/thanpolas/entity)

# AIM server
The AIM project is a demonstration of usage of several concepts / technologies :

* CRUD operation
* RESTfull Web API
* Angular.js MVC implementation
* Twitter Bootstrap
* Node.js 
  * zzdzd    
* Express
* Jquery...

next step incoming -> Object Relation Mapping (node-entities)
(https://www.npmjs.com/package/node-entity)

## Install
```shell
TBD
```
## Documentation

Documentation is TBD
```javascript
// 'wines' service
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
// 'airport' service
app.get('/airports', airport.findAll);
app.get('/airports/:id', airport.findById);
// 'OT_MBD' service
app.get('/OT_MBD', OT_MBD.findAllItems);
app.get('/OT_MBD/:id', OT_MBD.findItemById);
app.post('/OT_MBD/create', OT_MBD.addItem);
app.put('/OT_MBD/:id', OT_MBD.updateItem);
app.delete('/OT_MBD/:id', OT_MBD.deleteItem);
```
## License

TBD

Copyright (c) 2015 GDU.
