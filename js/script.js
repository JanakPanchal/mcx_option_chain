
function getoptionChainData() {
  requestData = {
    "Commodity": "CRUDEOIL",
    "Expiry": "14JUN2023"
  }
  $.ajax({
    type: "POST",
    url: "https://www.mcxindia.com/backpage.aspx/GetOptionChain",
    data: requestData,
    cache: false,
    success: function (data) {
      console.log(data)
    }
  });
}

function getData() {
  $.ajax({
    type: "GET",
    url: "fun/getNaturalGasData.php",
    cache: false,
    success: function (data) {
      data = JSON.parse(data);
      chart_data = filterData(data.d["Data"]);
      dataFilter = findMovementData(data.d["Data"], 18);
      //display_monthly_chart(dataFilter)
      //displaytalbe(dataFilter) 
      poppulateTable(data["d"]["Data"]);
      poppulateBestPossibleDayandDate();
    }
  });
}

function displaytalbe(data) {
  var student = `<table class="table">
    <!-- HEADING FORMATION -->
    <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Movment</th>
    </tr>`;
  // ITERATING THROUGH OBJECTS
  $.each(data, function (key, value) {

    //CONSTRUCTION OF ROWS HAVING
    // DATA FROM JSON OBJECT
    student += '<tr>';
    student += '<td>' +
      value.x + '</td>';

    student += '<td>' +
      value.day_name + '</td>';

    student += '<td>' +
      value.movement + '</td>';


    student += '</tr>';
  });

  //INSERTING ROWS INTO TABLE 
  $('#table').append(student);
}

function findMovementData(data, movementTraget) {
  temp = []
  count = 0
  data.forEach(element => {
    if (count <= 200) {
      totalMovment = element.High - element.Low;
      if (totalMovment > movementTraget) {
        mostValueDay.push(new Date(element.Date).toLocaleString('en-us', { weekday: 'long' }));
        mostValueDate.push(new Date(element.Date).getDate());
        temp.push(
          {
            x: element.Date,
            y: [element.Open, element.High, element.Low, element.Close],
            movement: totalMovment,
            day_name: new Date(element.Date).toLocaleString('en-us', { weekday: 'long' })
          }
        )
      }
    }
    count += 1;
  });
  return temp
}

function filterData(data) {
  temp = []
  count = 0
  data.forEach(element => {
    if (count <= 100) {
      temp.push(
        {
          x: element.Date,
          y: [element.Open, element.High, element.Low, element.Close]
        }
      )

    }
    count += 1;
  });

  return temp
}


function display_monthly_chart(chart_data) {
  console.log(chart_data)
  var options = {
    series: [{
      data: chart_data
    }],
    chart: {
      type: 'candlestick',
      height: 800
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

}

function mergeWithCount(array) {
  var counts = {};

  // Count the occurrences of each value
  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    if (counts[value]) {
      counts[value]++;
    } else {
      counts[value] = 1;
    }
  }

  // Create an object with merged values and counts
  var mergedObject = {};
  for (var key in counts) {
    mergedObject[key] = counts[key];
  }

  return mergedObject;
}

function poppulateTable(data) {
  tableData = ``;

  $.each(data, function (indexInArray, valueOfElement) {
    if(indexInArray < 10){
      if (getDayName(valueOfElement["DateDisplay"]) == "Friday") {
        tableData += `<div class="row">`;
      }
      tableData += `<div class="col-xl-3 col-lg-6 col-sm-6">
                                <div class="widget-stat card `+ getTypeOFMarket(valueOfElement["Open"], valueOfElement["Close"], valueOfElement["High"], valueOfElement["Low"]) + `">
                                <div class="card-body p-4"> <h4 class="card-title">`+getDayName(valueOfElement["DateDisplay"])+`</h4><h5>`+valueOfElement["Date"]+`</h5><h3>`+getTypeOFMarket(valueOfElement["Open"],valueOfElement["Close"],valueOfElement["High"],valueOfElement["Low"])+`(`+getpricediff(valueOfElement["Open"],valueOfElement["Close"],valueOfElement["High"],valueOfElement["Low"])+`)</h3>
                                <div><h4>`+getpriceMovment(valueOfElement["Open"],valueOfElement["Close"],valueOfElement["High"],valueOfElement["Low"])+` </h4></div>
                                </div></div></div>`
      if (getDayName(valueOfElement["DateDisplay"]) == "Monday") {
        tableData += `</div>`;
      }
    }

  });

  tableData += ``
  $("#pastDataView").html(tableData);
}
function getTypeOFMarket(open, close, high, low) {

  if (open < close && open < high) {
    return "Bullish"
  } else if (open > close && open > low) {
    return "Bearish"
  }

}

function getDayName(data) {
  return new Date(data).toLocaleString('en-us', { weekday: 'long' })
}

function poppulateBestPossibleDayandDate(){  
  console.log(mergeWithCount(mostValueDay));
  console.log(mergeWithCount(mostValueDate));
  $("#BDTT").html(getKeyWithHighestValue(mergeWithCount(mostValueDay)).toString());
  $("#BDDTT").html(getKeyWithHighestValue(mergeWithCount(mostValueDate)).toString());
}

function getKeyWithHighestValue(obj) {
  const sortedKeys = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
  return sortedKeys.slice(0,5);
}

function getpricediff(open,close,high,low){
  return (close - open).toFixed(2);
 }

 function getpriceMovment(open,close,high,low){
  return (high - low).toFixed(2);
 }