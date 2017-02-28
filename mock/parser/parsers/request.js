var util=require("./../../util/util");
module.exports={
    name:"int",
    step:1,
    fn:function(key){
        return this.data[key];
    }
}