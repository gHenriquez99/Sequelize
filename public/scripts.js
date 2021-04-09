function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function getDataChart() {
  const mealRequest = await fetch('/api/wholeMeal');
  const mealData = await mealRequest.json();
  return (mealData);
}

async function handleDataTable() {
  const table = document.querySelector('.table');
  const headerRow = document.querySelector('.tblRow');

  const diningHallRequest = await fetch('/api/dining');
  const diningHallData = await diningHallRequest.json();
  const {data} = diningHallData;
  console.log(data);
  console.log(data.length);

  const keys = Object.keys(data[0]);

  keys.forEach((item) => {
    const thElem = document.createElement('th');
    thElem.innerText = item;
    headerRow.append(thElem);
  });

  data.forEach((item) => {
    const trElem = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    td1.innerText = item.hall_id;
    td2.innerText = item.hall_name;
    td3.innerText = item.hall_address;

    table.append(trElem);
    trElem.append(td1);
    trElem.append(td2);
    trElem.append(td3);
  });
}

async function windowActions() {
  console.log('Window has been loaded');
  handleDataTable();
  const results = await getDataChart();
  const meals = results.data;

  const indexArray = [];
  while (indexArray.length < 10) {
    const randomNumber = getRandomIntInclusive(0, meals.length - 1);
    if (indexArray.indexOf(randomNumber) === -1) {
      indexArray.push(randomNumber);
    }
  }
  const selectedMeals = indexArray.map((element) => meals[element]);
  console.log(selectedMeals);

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Meal Macros'
    },
    axisX: [
      {
        title: 'axis x title'
      },
      {
        title: 'title 2'
      }
    ],
    axisY: {
      prefix: '$'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    data: [{
      type: 'stackedBar',
      name: 'Calories',
      showInLegend: 'true',
      dataPoints: [
        { x: selectedMeals[0].meal_name, y: selectedMeals[0].calories},
        { x: selectedMeals[1].meal_name, y: selectedMeals[1].calories},
        { x: selectedMeals[2].meal_name, y: selectedMeals[2].calories},
        { x: selectedMeals[3].meal_name, y: selectedMeals[3].calories},
        { x: selectedMeals[4].meal_name, y: selectedMeals[4].calories},
        { x: selectedMeals[5].meal_name, y: selectedMeals[5].calories},
        { x: selectedMeals[6].meal_name, y: selectedMeals[6].calories},
        { x: selectedMeals[7].meal_name, y: selectedMeals[7].calories},
        { x: selectedMeals[8].meal_name, y: selectedMeals[8].calories},
        { x: selectedMeals[9].meal_name, y: selectedMeals[9].calories}
      ]
    }]
  });
  chart.render();

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

window.onload = windowActions;