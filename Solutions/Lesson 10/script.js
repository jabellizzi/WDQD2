var config = {
  schema: schema,
  url: "ws://localhost:4848/app/engineData"
};

var session = enigma.create(config);
session.open().then(function(qlik){
  console.log(qlik);
  qlik.openDoc("WBY Sales.qvf").then(function(app){
    console.log(app);

    var myList = {
      qInfo: {
        qType: "ListObject"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ["ProductName"]
        },
        qInitialDataFetch:[{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 50
        }]
      }
    };

    app.createSessionObject(myList).then(function(objModel){
      objModel.getLayout().then(function(layout){
        var rowsRemaining = layout.qListObject.qSize.qcy - 50;
        objModel.getListObjectData("/qListObjectDef", [{
          qTop: 50,
          qLeft: 0,
          qWidth: 1,
          qHeight: rowsRemaining
        }]).then(function(pages){
          console.log(pages);
        });
      });
    });

  });
});
