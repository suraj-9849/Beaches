async function fetchAndProcessData() {
  try {
    const hwassaResponse = await fetch(
      'https://sarat.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata'
    );
    const hwassaRawData = await hwassaResponse.json();
    const hwassaData = JSON.parse(hwassaRawData.HWAJson);
    const SSAData = JSON.parse(hwassaRawData.SSAJson);

    const currentsResponse = await fetch(
      'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/currentslatestdata'
    );
    const currentsRawData = await currentsResponse.json();
    const currentsData = JSON.parse(currentsRawData.CurrentsJson);
    let threatData = [];

    if (hwassaRawData.LatestHWADate !== 'None') {
      threatData = threatData.concat(hwassaData);
    }
    if (hwassaRawData.LatestHWADate !== 'None') {
      threatData = threatData.concat(SSAData);
    }

    if (currentsRawData.LatestCurrentsDate !== 'None') {
      threatData = threatData.concat(currentsData);
    }

    return { threatData };
  } catch (error) {}
}

fetchAndProcessData();
