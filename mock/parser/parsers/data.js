module.exports={
	name:"data",
	step:2,
	fn:function(a){
		var b=a.split(".");
		var r=this.data;
		for(var i in b){
			r=r[b[i]];
		}
		return r;
	}
}