var config = {
  schema: schema,
  url: "ws://localhost:4848/app/engineData"
};

var session = enigma.create(config);
session.open().then(function(qlik){
  console.log(qlik);
  qlik.openDoc("WBY Sales.qvf").then(function(app){
    console.log(app);
  });
});
