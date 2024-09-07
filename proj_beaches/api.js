async function fetchAndProcessData() {
    try {
        const hwassaResponse = await fetch('https://sarat.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata');
        const hwassaRawData = await hwassaResponse.json();
        const hwassaData = JSON.parse(hwassaRawData.HWAJson);
        const SSAData = JSON.parse(hwassaRawData.SSAJson);

        const currentsResponse = await fetch('https://samudra.incois.gov.in/incoismobileappdata/rest/incois/currentslatestdata');
        const currentsRawData = await currentsResponse.json();
        const currentsData = JSON.parse(currentsRawData.CurrentsJson);        
        let threatData = [];

        if (hwassaRawData.LatestHWADate !== "None") {
            threatData = threatData.concat(hwassaData);
        } else {
            console.log("No HWASSA data available.");
        }

        if (hwassaRawData.LatestHWADate !== "None") {
            threatData = threatData.concat(SSAData);
        } else {
            console.log("No SSA data available.");
        }

        if (currentsRawData.LatestCurrentsDate !== "None") {
            threatData = threatData.concat(currentsData);
        } else {
            console.log("No currents data available.");
        }

        return { threatData };

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndProcessData()
    .then(data => {
        console.log('Processed Data:', data);
    })
    .catch(error => {
        console.error('Error processing data:', error);
    });