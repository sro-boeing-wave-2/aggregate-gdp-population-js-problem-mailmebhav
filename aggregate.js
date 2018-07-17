/**
* Aggregates GDP and Population Data by Continents
* @param {*} filePath
*/
const fs = require('fs');
// This function converts csv to json array of objects.

const final = {
  'South America': { GDP_2012: 0, POPULATION_2012: 0 },
  Oceania: { GDP_2012: 0, POPULATION_2012: 0 },
  'North America': { GDP_2012: 0, POPULATION_2012: 0 },
  Asia: { GDP_2012: 0, POPULATION_2012: 0 },
  Europe: { GDP_2012: 0, POPULATION_2012: 0 },
  Africa: { GDP_2012: 0, POPULATION_2012: 0 },
};

async function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, datavar) => {
      if (err) {
        reject(err);
      } else {
        resolve(datavar);
      }
    });
  });
}

async function writeFileAsync(writepath, stringwrite) {
  return new Promise((resolve, reject) => {
    fs.writeFile(writepath, stringwrite, 'utf8', (err, datavar) => {
      if (err) {
        reject(err);
      } else {
        resolve(datavar);
      }
    });
  });
}

const aggregate = (filePath) => {
  Promise.all([readFileAsync(filePath), readFileAsync('./continent.json')]).then((values) => {
    const csv = values[0];
    const dataarr = csv.replace('"', '').split('\n');
    const json = values[1];
    const jsonobj = JSON.parse(json);
    dataarr.forEach((country) => {
      const indexofpopulation = country.replace(/"/g,'').split(',')[4];
      const indexofgdp = country.replace(/"/g,'').split(',')[7];
      const indexofcountry = country.replace(/"/g,'').split(',')[0];
      const continent = jsonobj[indexofcountry];
      if (continent !== undefined) {
        final[continent].POPULATION_2012 += parseFloat(indexofpopulation);
        final[continent].GDP_2012 += parseFloat(indexofgdp);
      }
    });
    // console.log(final);
    writeFileAsync('./output/output.json', JSON.stringify(final));
  });
};
// aggregate('./data/datafile.csv');

module.exports = aggregate;
