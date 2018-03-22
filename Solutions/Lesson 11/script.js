var config = {
  schema: schema,
  url: "ws://localhost:4848/app/engineData"
};

var session = enigma.create(config);
session.open().then(function(qlik){
  console.log(qlik);
  qlik.openDoc("WBY Sales.qvf").then(function(app){
    console.log(app);

    var myHyperCube = {
      qInfo:{
        qType: "HyperCube"
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ["CategoryName"],
              qSortCriterias: [{
                qSortByAscii: 1
              }]
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "Sum(OrderLineAmount)"
            },
            qSortBy:{
              qSortByNumeric: -1
            }
          }
        ],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 2,
          qHeight: 100
        }],
        qInterColumnSortOrder: [0, 1]
      }
    }

    app.createSessionObject(myHyperCube).then(function(objModel){
      objModel.getLayout().then(function(layout){
        console.log(layout);

        objModel.applyPatches([{qOp: "replace", qValue: "[1,0]", qPath: "/qHyperCubeDef/qInterColumnSortOrder"}], false).then(function(){
          objModel.getLayout().then(function(layout){
            console.log(layout);
          });
        });
      });
    });

  });
});
