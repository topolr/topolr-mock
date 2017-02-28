var topolr=require("topolr-util");
var yaml=require("yamljs");
var router=require("topolr-router");
var builders=require("./builter/builterContainer");
var parsers=require("./parser/parserContainer");
var container=function(option){
    var path=option.path;
    var builterpath=option.builterPath;
    var parserpath=option.parserPath;
    var _router=router(option.project);
    topolr.file(path).scan(function (path, isfile) {
        if (isfile) {
            if (topolr.file(path).suffix() === "yaml") {
                var _a = topolr.file(path).readSync();
                try {
                    var _b = yaml.parse(_a);
                    if (_b.mock && _b.url) {
                        _router.add(_b.url, _b);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    });
    topolr.file(builterpath).scan(function (path,isfile) {
        if(isfile){
            if(topolr.file(path).suffix()==="js"){
                var a=require(path);
                if(a&&a.name&&a.fn){
                    builders.add(a.name,a.fn);
                }
            }
        }
    });
    topolr.file(parserpath).scan(function (path,isfile) {
        if(isfile){
            if(topolr.file(path).suffix()==="js"){
                var a=require(path);
                if(a&&a.name&&a.action){
                    parsers.add(a.name,a.step,a.action);
                }
            }
        }
    });
    this._router=_router;
};
var basebuilder=require("./builter/base");
container.prototype.mock=function (url,parameters) {
    var result=this._router.check(url),ps=topolr.promise();
    if(result.found){
        var info=topolr.extend(true,{},result.action);
        var type=info.mock.type;
        var a=builders.get(type);
        if(a){
            return a.fn.call(basebuilder(info),url,parameters);
        }else{
            ps.reject();
        }
    }else{
        ps.reject();
    }
    return ps;
};

module.exports=function(path){
    return new container(path);
};