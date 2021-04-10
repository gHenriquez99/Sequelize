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
  const caloriesData = [];

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Dining Hall Meal Macros'
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
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].calories },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].calories },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].calories },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].calories },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].calories },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].calories },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].calories },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].calories },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].calories },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].calories }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Carbs',
      showInLegend: 'true',
      dataPoints: [
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].carbs },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].carbs },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].carbs },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].carbs },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].carbs },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].carbs },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].carbs },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].carbs },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].carbs },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].carbs }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Cholesterol',
      showInLegend: 'true',
      dataPoints: [
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].cholesterol },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].cholesterol },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].cholesterol },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].cholesterol },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].cholesterol },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].cholesterol },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].cholesterol },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].cholesterol },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].cholesterol },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].cholesterol }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Fat',
      showInLegend: 'true',
      dataPoints: [
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].fat },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].fat },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].fat },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].fat },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].fat },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].fat },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].fat },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].fat },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].fat },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].fat }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Protein',
      showInLegend: 'true',
      dataPoints: [
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].protein },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].protein },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].protein },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].protein },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].protein },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].protein },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].protein },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].protein },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].protein },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].protein }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Serving Size',
      showInLegend: 'true',
      dataPoints: [
        { label: selectedMeals[0].meal_name, y: selectedMeals[0].serving_size },
        { label: selectedMeals[1].meal_name, y: selectedMeals[1].serving_size },
        { label: selectedMeals[2].meal_name, y: selectedMeals[2].serving_size },
        { label: selectedMeals[3].meal_name, y: selectedMeals[3].serving_size },
        { label: selectedMeals[4].meal_name, y: selectedMeals[4].serving_size },
        { label: selectedMeals[5].meal_name, y: selectedMeals[5].serving_size },
        { label: selectedMeals[6].meal_name, y: selectedMeals[6].serving_size },
        { label: selectedMeals[7].meal_name, y: selectedMeals[7].serving_size },
        { label: selectedMeals[8].meal_name, y: selectedMeals[8].serving_size },
        { label: selectedMeals[9].meal_name, y: selectedMeals[9].serving_size }
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