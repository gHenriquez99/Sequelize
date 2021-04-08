async function handleDataChart() {
  const mealRequest = await fetch('/api/meals');
  const mealData = await mealRequest.json();
  const macroRequest = await fetch('/api/macros');
  const macroData = await macroRequest.json();
  console.log(mealData);
  console.log(macroData);
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
  handleDataChart();
}

window.onload = windowActions;