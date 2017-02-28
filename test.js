var topolr=require("topolr-util");
// var parser=require("./mock/parser/base");
// var yaml=require("yamljs");
// var str=topolr.file("./page.yaml").readSync();
// var data=yaml.parse(str);
// var result=parser.parse(data["response-success"],data.mock);
// console.log(result);
// console.log(JSON.stringify(result,null,3));

var mock=require("./main")({
    path:__dirname+"/sample/yaml/",
    builterPath:__dirname+"/sample/builters/",
    parserPath:__dirname+"/sample/actions/",
    project:"project"
});
var testRate=function () {
    var ps=topolr.promise(function (a) {
        a();
    });
    for(var i=0;i<100;i++) {
        ps.then(function () {
            return mock.doRequest("/project/test/simple/", {aa: "aa"}).then(function (a) {
                if(a){
                    console.log(a);
                }
            });
        });
    }
    return ps;
};
// testRate();
var testPage=function () {
    var ps=topolr.promise(function (a) {
        a();
    });
    for(var i=0;i<12;i++) {
        (function (num) {
            mock.doRequest("/project/test/page/", {
                page:num,
                pagesize:20
            }).then(function (a) {
                if(a){
                    console.log(a);
                }
            });
        })(i+1);
    }
};
// testPage();

mock.doRequest("/project/test/page/", {
    page:10,
    pagesize:20
}).then(function (a) {
    if(a){
        console.log(a);
    }
});


