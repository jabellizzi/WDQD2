var config = {
  schema: schema,
  url: "ws://localhost:4848/app/engineData"
};

//Pie Chart Defintion
var pieDef = {
  qInfo:{
    qType: "Chart"
  },
  qHyperCubeDef:{
    qDimensions:[
      {
        qDef: {
          qFieldDefs: ["CategoryName"]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Sum(OrderLineAmount)"
        }
      }
    ],
    qInitialDataFetch:[{
      qTop: 0,
      qLeft: 0,
      qWidth: 2,
      qHeight: 50
    }]
  }
};

//Bar Chart Defintion
var barDef = {
  qInfo:{
    qType: "Chart"
  },
  qHyperCubeDef:{
    qDimensions:[
      {
        qDef: {
          qFieldDefs: ["Year"]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Sum(OrderLineAmount)"
        }
      }
    ],
    qInitialDataFetch:[{
      qTop: 0,
      qLeft: 0,
      qWidth: 2,
      qHeight: 20
    }]
  }
};

var session = enigma.create(config);
session.open().then(function(qlik){
  console.log(qlik);
  qlik.openDoc("WBY Sales.qvf").then(function(app){
    console.log(app);

    app.createSessionObject(pieDef).then(function(objModel){
      objModel.addListener('changed', function(){
        renderPie(objModel, "PIE");
      });
      renderPie(objModel, "PIE");
    });

    app.createSessionObject(barDef).then(function(objModel){
      objModel.addListener('changed', function(){
        renderBar(objModel, "BAR");
      });
      renderBar(objModel, "BAR");
    });

  });
});

function renderPie(model, elementId){
  model.getLayout().then(function(layout){
    if(layout.qHyperCube.qDataPages[0]){
      var senseData = layout.qHyperCube.qDataPages[0].qMatrix;
      var amData = [];
      for(var i=0; i<senseData.length; i++){
        amData.push(
          {
            dim: senseData[i][0].qText,
            elemNumber: senseData[i][0].qElemNumber,
            exp: senseData[i][1].qNum
          }
        );
      }
      AmCharts.makeChart(elementId, {
        type: "pie",
        valueAxes: [{
          axisAlpha: 1
        }],
        radius: "42%",
        innerRadius: "60%",
        dataProvider: amData,
        titleField: "dim",
        valueField: "exp",
        labelText: "[[dim]]"
      });
    }
  });
}

function renderBar(model, elementId){
  model.getLayout().then(function(layout){
    if(layout.qHyperCube.qDataPages[0]){
      var senseData = layout.qHyperCube.qDataPages[0].qMatrix;
      var amData = [];
      for(var i=0; i<senseData.length; i++){
        amData.push(
          {
            dim: senseData[i][0].qText,
            elemNumber: senseData[i][0].qElemNumber,
            exp: senseData[i][1].qNum
          }
        );
      }
      AmCharts.makeChart(elementId, {
        type: "serial",
        dataProvider: amData,
        graphs: [{
          balloonText: "[[category]]: <b>[[value]]</b>",
          fillAlphas: 1,
          type: "column",
          valueField: "exp"
        }],
        categoryField: "dim"
      });
    }
  });
}

function renderLine(){

}
