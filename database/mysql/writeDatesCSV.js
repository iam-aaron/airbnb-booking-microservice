const fs = require('fs');
let datesfile = fs.createWriteStream('../../seedData/datesCSVrecords.csv');

let createDatesTable = (id) => {

  let available_days = [
    new Date(2018, 2, 10), new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13), new Date(2018, 2, 14), new Date(2018, 2, 15), new Date(2018, 2, 16), new Date(2018, 2, 17), new Date(2018, 2, 18), new Date(2018, 2, 19), new Date(2018, 2, 20), new Date(2018, 2, 21), new Date(2018, 2, 22), new Date(2018, 2, 23), new Date(2018, 2, 24), new Date(2018, 2, 25), new Date(2018, 2, 26), new Date(2018, 2, 27), new Date(2018, 2, 28), new Date(2018, 2, 29)];

  let numDates;
  if (id % 2 === 0) {
    numDates = 5;
  } else if (id % 7 === 0) {
    numDates = 20;
  } else {
    numDates = 10;
  }

  let entry = '';
  for (var i = 0; i < numDates; i++) {
    entry += `${id}*${available_days[i]}\n`;
  }
  return entry;
};

let writeTenMillion = (n = 1e7) => {
  let isReady = true;
  if (n === 1e7) {
    datesfile.write('id,available_days\n');
  }
  while (n > 0 && isReady) {
    isReady = datesfile.write(createDatesTable(n));
    n -= 1;
  }
  datesfile.once('drain', () => {
    writeTenMillion(n);
  });
};

writeTenMillion();

//queries Math.ceil(1-10million/20)
