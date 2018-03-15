let dates = [
  new Date(2018, 2, 7), new Date(2018, 2, 8), new Date(2018, 2, 9),
  new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13),
  new Date(2018, 2, 15), new Date(2018, 2, 16), new Date(2018, 2, 19),
  new Date(2018, 2, 20), new Date(2018, 2, 21), new Date(2018, 2, 22),
  new Date(2018, 2, 25), new Date(2018, 2, 26), new Date(2018, 3, 1),
  new Date(2018, 3, 2), new Date(2018, 3, 3), new Date(2018, 3, 4),
  new Date(2018, 3, 5), new Date(2018, 3, 6), new Date(2018, 3, 7),
  new Date(2018, 3, 8), new Date(2018, 3, 9), new Date(2018, 3, 10),
  new Date(2018, 3, 11), new Date(2018, 3, 12), new Date(2018, 3, 13)]

console.log(dates)

let makeDateObj = function() {
  let dateobj = {};
  for (var i = 0; i < dates.length; i++) {
    var date = dates[i].toISOString().split('T')[0]
    var newdate = date.replace(/-/g, '')
    dateobj[newdate]= dates[i];
  }
  return dateobj;
}
console.log(makeDateObj(dates))
