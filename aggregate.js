/**
* Aggregates GDP and Population Data by Continents
* @param {*} filePath
*/
const fs = require('fs');

const continent = [["Argentina", "South America"],
["Australia", "Oceania"],
["Brazil", "South America"],
["Canada", "North America"],
["China", "Asia"],
["France", "Europe"],
["Germany", "Europe"],
["India", "Asia"],
["Indonesia", "Asia"],
["Italy", "Europe"],
["Japan", "Asia"],
["Mexico", "North America"],
["Russia", "Asia"],
["Saudi Arabia", "Asia"],
["South Africa", "Africa"],
["Turkey", "Asia"],
["United Kingdom", "Europe"],
["USA", "North America"],
["Republic of Korea", "Asia"]];

function csvjson(data) {
  const dataarr = data.replace('"','').split('\n');
  let result = [];

  let headers=dataarr[0].split(',');

  for(let i=1;i<dataarr.length;i++){

    let obj = {};
    let currentline = dataarr[i].replace('"','').split('",');

    for(let j = 0; j < headers.length; j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return result;
}

let final = {"South America": {"GDP_2012": 0,"POPULATION_2012" : 0},
"Oceania": {"GDP_2012": 0,"POPULATION_2012" : 0},
"North America": {"GDP_2012": 0,"POPULATION_2012" : 0},
"Asia": {"GDP_2012": 0,"POPULATION_2012" : 0},
"Europe": {"GDP_2012": 0,"POPULATION_2012" : 0},
"Africa": {"GDP_2012": 0,"POPULATION_2012" : 0}};

const aggregate = filePath => {
  const data = fs.readFileSync(filePath, 'utf8');
  const resobj = csvjson(data);
  for (let i = 0; i < resobj.length; i +=1) {
    for (let j = 0; j < continent.length; j += 1) {
      if (resobj[i]['Country Name"'] == continent[j][0]) {
        let continentmap = continent[j][1];
        if (continentmap === "South America") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["South America"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["South America"].POPULATION_2012 += populate;
        }
        if (continentmap === "Oceania") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["Oceania"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["Oceania"].POPULATION_2012 += populate;
        }
        if (continentmap === "North America") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["North America"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["North America"].POPULATION_2012 += populate;
        }
        if (continentmap === "Asia") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["Asia"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["Asia"].POPULATION_2012 += populate;
        }
        if (continentmap === "Europe") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["Europe"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["Europe"].POPULATION_2012 += populate;
        }
        if (continentmap === "Africa") {
          const gdp  = parseFloat((resobj[i]['"GDP Billions (US Dollar) - 2012"']).replace('"',''));
          final["Africa"].GDP_2012 += gdp;
          const populate = parseFloat((resobj[i]['"Population (Millions) - 2012"']).replace('"',''));
          final["Africa"].POPULATION_2012 += populate;
        }
      }
    }
  }
  fs.writeFileSync('./output/output.json',JSON.stringify(final));
};

module.exports = aggregate;
