var parser=require("./../parser/base");
var base=function (info) {
    this.info=info;
};
base.prototype.parseSuccess=function (data) {
    return parser.parse(this.info["response-success"],{
        mock:this.info.mock,
        data:data
    });
};
base.prototype.parseFail=function (data) {
    return parser.parse(this.info["response-error"],{
        mock:this.info.mock,
        data:data
    });
};
base.prototype.parse=function (data) {
    if(this.info.mock.rate!==undefined){
        var num=Math.round(Math.random()*100);
        if(num<=this.info.mock.rate){
            return this.parseSuccess(data);
        }else{
            return this.parseFail(data);
        }
    }else{
        return this.parseSuccess(data);
    }
}
module.exports=function (info) {
    return new base(info);
};