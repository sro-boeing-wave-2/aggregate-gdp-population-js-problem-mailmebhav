/**
* Aggregates GDP and Population Data by Continents
* @param {*} filePath
*/
const fs = require('fs');
const continent = require('./continent');
// This function converts csv to json array of objects.
function csvtojson(data) {
  const dataarr = data.replace('"', '').split('\n');
  const result = [];
  const headers = dataarr[0].split(',');
  for (let i = 1; i < dataarr.length; i += 1) {
    const obj = {};
    const currentline = dataarr[i].replace('"', '').split('",');
    for (let j = 0; j < headers.length; j += 1) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

const final = {
  'South America': { GDP_2012: 0, POPULATION_2012: 0 },
  Oceania: { GDP_2012: 0, POPULATION_2012: 0 },
  'North America': { GDP_2012: 0, POPULATION_2012: 0 },
  Asia: { GDP_2012: 0, POPULATION_2012: 0 },
  Europe: { GDP_2012: 0, POPULATION_2012: 0 },
  Africa: { GDP_2012: 0, POPULATION_2012: 0 },
};

function readFileAsync(filePath) {
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

function writeFileAsync(writepath, stringwrite) {
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

async function calcgdp(gdp, continentname) {
  final[continentname].GDP_2012 += gdp;
}

async function calcpopulation(Population, continentname) {
  final[continentname].POPULATION_2012 += Population;
}

const aggregate = async (filePath) => {
  const data = await readFileAsync(filePath);
  const resobj = await csvtojson(data);
  for (let i = 0; i < resobj.length; i += 1) {
    for (let j = 0; j < continent.countries.length; j += 1) {
      if (resobj[i]['Country Name"'] === continent.countries[j].country) {
        const continentmap = continent.countries[j].continent;
        calcgdp(parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"', '')), continentmap);
        calcpopulation(parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"', '')), continentmap);
      }
    }
  }
  // console.log(final);
  await writeFileAsync('./output/output.json', JSON.stringify(final));
};
// aggregate('./data/datafile.csv');

module.exports = aggregate;
