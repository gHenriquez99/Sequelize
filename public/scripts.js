import sequelize from 'sequelize';


async function windowActions() {
  const request = await GET(/api/dining);
  console.log(request);
}

window.onload = windowActions;