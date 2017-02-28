module.exports={
	name:"parent",
	step:2,
	fn:function(times,key){
		var n=this.current;
		for(var i=0;i<times/1;i++){
			n=n["_parent_"];
		}
		return n[key];
	}
};