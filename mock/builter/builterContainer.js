var builder=[
    require("./builters/pagebuilder"),
    require("./builters/simplebuilder")
];
var builderContainer={
    get:function (name) {
        for(var i=0;i<builder.length;i++){
            var a=builder[i];
            if(a.name===name){
                return a;
            }
        }
        return null;
    },
    has:function (name) {
        return builderContainer.get(name)!==null;
    },
    add:function (name,builtfn) {
        if(!builderContainer.has(name)){
            builder.push({
                name:name,
                fn:builtfn
            });
        }
        return this;
    }
};
module.exports=builderContainer;