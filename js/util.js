

function getCheckInTimeList(){
var arr = [];
		var i, j;
		for(i=0; i<24; i++) {
  			for(j=0; j<2; j++) {
    			arr.push(padStr(i) + ":" + (j===0 ? "00" : 30*j) );
  			}
		}



    return arr;
    }

function getCurrentTimeSlot(timeslot){

	var d = new Date();
    h = d.getHours();
    m = 30 * Math.floor(d.getMinutes()/30);
    stamp = h + ":" + (m === 0 ? "00" : m);

    var pos = timeslot.indexOf(stamp);
    arr = timeslot.slice(pos);

    //alert("pos"+pos+"arr"+timeslot);
    var b = arr.filter(Boolean);

	//alert(arr.length);


	//alert(b.length);
    return b;

}

function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);

            //alert(dateItems);

            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");

            //alert(formatItems);
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

function addDays(date, amount) {
  var tzOff = date.getTimezoneOffset() * 60 * 1000,
      t = date.getTime(),
      d = new Date(),
      tzOff2;

  t += (1000 * 60 * 60 * 24) * amount;
  d.setTime(t);

  tzOff2 = d.getTimezoneOffset() * 60 * 1000;
  if (tzOff != tzOff2) {
    var diff = tzOff2 - tzOff;
    t += diff;
    d.setTime(t);
  }

  return d;
}

function dateToSring(temp) {
    //var temp = new Date();
    var dateStr = padStr(temp.getDate()) +"-"+
                  padStr(1 + temp.getMonth())+"-" +
                  padStr(temp.getFullYear());
//                   padStr(temp.getHours()) +
//                   padStr(temp.getMinutes()) +
//                   padStr(temp.getSeconds());
   return dateStr;
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function count(array)
{
    var c = 0;
    for(i in array) // in returns key, not object
        if(array[i] != undefined)
            c++;

return c;
}

function toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
