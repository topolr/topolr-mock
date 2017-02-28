var topolr=require("topolr-util");
var datamap=require("./../../config/data.json");
var namemapping=datamap.name;
var descs=datamap.desc;
var sections=datamap.section;
var types={
	uuid:function(){
		return topolr.util.uuid().replace(/\-/g,"");
	},
	name:function(){
		return namemapping[Math.round(Math.random()*100)];
	},
	desc:function () {
        return descs[Math.round(Math.random()*descs.length)];
    },
	section:function () {
        return sections[Math.round(Math.random()*sections.length)];
    }
};
module.exports={
	name:"str",
	step:1,
	fn:function(){
		var a=Array.prototype.slice.call(arguments);
		var len=a.pop();
		var type=a[0];
		if(types[type]){
			return types[type]().substring(0,len);
		}else{
			if(a.length===1){
				return a[0];
			}else if(a.length>=2){
				return a[Math.round(Math.random()*a.length)];
			}else{
				return "";
			}
		}
	}
}