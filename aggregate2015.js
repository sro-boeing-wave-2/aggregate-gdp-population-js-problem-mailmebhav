/**
* Aggregates GDP and Population Data by Continents
* @param {*} filePath
*/
const fs = require('fs');
const continent = require('./continent');
// console.log(continent.countries[0].country);

async function csvtojson(data) {
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
  // console.log(result);
  return result;
}

const final = {
  'South America': { GDP: 0, POPULATION: 0 },
  Oceania: { GDP: 0, POPULATION: 0 },
  'North America': { GDP: 0, POPULATION: 0 },
  Asia: { GDP: 0, POPULATION: 0 },
  Europe: { GDP: 0, POPULATION: 0 },
  Africa: { GDP: 0, POPULATION: 0 },
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

async function calcgdp(gdp2012, gdp2015, continentname) {
  final[continentname].GDP += gdp2012 + gdp2015;
}

async function calcpopulation(population2012, population2015, continentname) {
  final[continentname].POPULATION += population2012 + population2015;
}

const aggregate2015 = async (filePath) => {
  const data = await readFileAsync(filePath);
  const resobj = await csvtojson(data);
  for (let i = 0; i < resobj.length; i += 1) {
    for (let j = 0; j < continent.countries.length; j += 1) {
      if (resobj[i]['Country Name"'] === continent.countries[j].country) {
        const continentmap = continent.countries[j].continent;
        calcgdp(parseFloat((resobj[i]['"GDP Billions (USD) 2012"']).replace('"', '')), parseFloat((resobj[i]['"GDP Billions (USD) 2015"']).replace('"', '')), continentmap);
        calcpopulation(parseFloat((resobj[i]['"Population (Millions) 2012"']).replace('"', '')), parseFloat((resobj[i]['"Population (Millions) 2015"']).replace('"', '')), continentmap);
      }
    }
  }
  console.log(final);
  await writeFileAsync('./output/output2015.json', JSON.stringify(final));
};

aggregate2015('./data/datafile 2015.csv');

module.exports = aggregate2015;
