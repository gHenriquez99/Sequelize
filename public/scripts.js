async function handleData() {
  const table = document.querySelector('.dataTable');
  const headerRow = document.querySelector('.table-header-row');

  const diningHallRequest = await fetch('/api/dining');
  const diningHallData = await diningHallRequest.json();
  const {data} = diningHallData;
  console.log(data);
  console.log(data.length);

  const keys = Object.keys(data[0]);

  keys.forEach((item) => {
    const thElem = document.createElement('th');
    thElem.classList.add('table-data');
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
  handleData();
}

window.onload = windowActions;