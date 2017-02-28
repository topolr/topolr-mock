var topolr=require("topolr-util");
module.exports={
    name:"simple",
    fn:function (url,parameters) {
        var ths=this,ps=topolr.promise();
        var a=ths.parse(parameters);
        if(a){
            ps.resolve(a);
        }else{
            ps.reject();
        }
        return ps;
    }
};