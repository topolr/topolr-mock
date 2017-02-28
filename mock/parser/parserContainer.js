var parsers=[
    require("./parsers/date"),
    require("./parsers/str"),
    require("./parsers/int"),
    require("./parsers/data"),
    require("./parsers/parent"),
    require("./parsers/request")
];
var parserContainer={
    get:function (name,step) {
        for(var i=0;i<parsers.length;i++){
            var a=parsers[i];
            if(a.name===name&&a.step===step){
                return a.fn;
            }
        }
        return null;
    },
    has:function (name,step) {
        return parserContainer.get(name,step)!==null;
    },
    add:function (name,step,fn) {
        if(!parserContainer.has(name,step)){
            parsers.push({
                name:name,
                step:step,
                fn:fn
            });
        }
        return this;
    }
};

module.exports=parserContainer;