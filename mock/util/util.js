var util={
	random:function(lowValue,highValue){
		if(arguments.length===2){
			lowValue=lowValue/1;
			highValue=highValue/1;
			var choice=highValue-lowValue+1;
			return Math.floor(Math.random()*choice+lowValue);
		}else{
			lowValue=lowValue/1;
			return Math.floor(Math.random()*lowValue);
		}
	},
	randomstr:function(a){
		var b=a.split("-");
		return util.random.apply({},b);
	},
	lenstr:function(a){
		var b=a.split("-");
		if(b.length>1){
			return util.random.apply({},b);
		}else{
			return b[0]/1;
		}
	}
};
module.exports=util;