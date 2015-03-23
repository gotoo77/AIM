[![Build Status](https://travis-ci.org/thanpolas/entity.png)](https://travis-ci.org/thanpolas/entity)

# AIM server
The AIM project is a demonstration of usage of several concepts / technologies :

* CRUD operation
* RESTfull Web API
* Angular.js MVC implementation
* Twitter Bootstrap
* Node.js 
  * Express
  * ng-translate
  * ...
  * 
cf:
```javascript
//
{
  "name": "AIM_Service",
  "version": "0.2.3",
  "description": "first version",
  "main": "AIM_server.js",
  "dependencies": {
    "moment": "~2.9.0",
    "mysql": "~2.5.5",
    "util": "~0.10.3",
    "express": "~3.0.0",
	"bootstrap": "~3.3.4",
	"jquery": "~2.1.3",
	"angular": "~1.3.15",
	"angular-route": "~1.3.15",
	"angular-bootstrap":"0.12.0"
  },
  "repository": {
	  "type": "git",
	  "url": "git://github.com/gotoo77/AIM.git"
  },
  "devDependencies": {},
  "scripts": {
    "test": "test",
    "start": "node AIM_server.js"
  },
  "author": "GDU",
  "license": "TBD"
}
```

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
##Examples
This is [an example](http://www.slate.com/ "Title") inline link.
 
[This link](http://example.net/) has no title attribute.

## License

TBD

Copyright (c) 2015 GDU.
