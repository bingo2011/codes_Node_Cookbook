var cradle = require('cradle');
var db = new (cradle.Connection)().database('quotes');

db.changes().on('response', function (response) {
   
    response.on('data', function (change) {
      if (change.deleted) { return; }
        db.get(change.id, function (err, doc) {
          if (doc.author && doc.quote) {
            console.log('%s: %s \n', doc.author, doc.quote);
          }
        });
    });
    
});
