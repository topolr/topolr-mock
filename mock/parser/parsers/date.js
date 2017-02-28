var random=function(lowValue,highValue){
	var choice=highValue-lowValue+1;
	return Math.floor(Math.random()*choice+lowValue);
}
var formatDate=function(a,format){
	var date=new Date(a);
	var hour = date.getHours(), minite = date.getMinutes(), sound = date.getSeconds(), month = date.getMonth() + 1, day = date.getDate(), year = date.getFullYear();
    format = format.replace("yyyy", year).replace("MM", (month.toString().length <= 1 ? "0" + month : month)).replace("dd", (day.toString().length <= 1 ? "0" + day : day))
            .replace("hh", (hour.toString().length <= 1 ? "0" + hour : hour)).replace("mm", (minite.toString().length <= 1 ? "0" + minite : minite))
            .replace("ss", (sound.toString().length <= 1 ? "0" + sound : sound));
    return format;
};
module.exports={
	name:"date",
	step:1,
	fn:function(offset,format){
		var a=offset.split("-");
		var from=(new Date(a[0]).getTime()),end=(new Date(a[1]).getTime());
		if(format){
			return formatDate(random(from,end),format);
		}else{
			return random(from,end);
		}
	}
}