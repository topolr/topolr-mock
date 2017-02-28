var topolr=require("topolr-util");
var container=require("./mock/container");
var mock=function (option) {
    this.option=topolr.extend({
        path:"",
        builterPath:"",
        parserPath:"",
        project:""
    },option);
    mock.init.call(this,this.option);
};
mock.init=function (option) {
    this._container=container(option);
};
mock.prototype.doRequest=function (url,parameters) {
    return this._container.mock(url,parameters);
};
module.exports=function (option) {
    return new mock(option);
};