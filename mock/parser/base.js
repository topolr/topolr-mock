var topolr=require("topolr-util");
var util=require("./../util/util");
var container=require("./parserContainer");
var transfn=function(fnstr){
    if((fnstr+"").indexOf("(")!==-1) {
        var a = fnstr.trim().split(/\(|\)/), key = a[0], parameters = "";
        if (a.length >= 3) {
            parameters = a[1];
        }
        var parser = container.get(key, 1);
        if (parser) {
            return parser.apply({}, parameters.split(","));
        } else {
            return fnstr;
        }
    }else{
    	return fnstr;
	}
};
var scanArray=function(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		var val=array[i];
		if(topolr.is.isArray(val)){
			result.push(scanArray(val));
		}else if(topolr.is.isObject(val)){
			result.push(scanObject(val));
		}else{
			result.push(transfn(val));
		}
	}
	return result;
};
var scanObject=function(obj){
	var result={};
	for(var i in obj){
		var val=obj[i];
		if(topolr.is.isArray(val)){
			var key=i,_a=key.split(/\[|\]/),len=0;
			if(_a.length>=3){
				key=_a[0].trim();
				len=util.lenstr(_a[1]);
			}
			if(_a.length>=3){
				var m=[];
				for(var _b=0;_b<len;_b++){
					m=m.concat(scanArray(val));
				}
				result[key]=m;
			}else{
				result[key]=scanArray(val);
			}
		}else if(topolr.is.isObject(val)){
			var e={};
			for(var q in val){
				if(topolr.is.isArray(val[q])){
					var key=q,_a=key.split(/\[|\]/),len=0;
					if(_a.length>=3){
						key=_a[0].trim();
						len=util.lenstr(_a[1]);
					}
					if(_a.length>=3){
						var m=[];
						for(var _b=0;_b<len;_b++){
							var _c=scanArray(val[q]);
							m=m.concat(_c);
						}
						e[key]=m;
					}else{
						e[key]=scanArray(val[q]);
					}
				}else if(topolr.is.isObject(val[q])){
					e[q]=scanObject(val[q]);
				}else{
					e[q]=transfn(val[q]);
				}
			}
			result[i]=e;
		}else{
			result[i]=transfn(val);
		}
	}
	return result;
}
var setunwrite = function (obj, key, value) {
    if (!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    } else {
        obj[key] = value;
    }
};
var retransfn=function(fnstr,current,data){
	if(topolr.is.isString(fnstr)){
		var a=fnstr.trim().split(/\(|\)/),key=a[0],parameters="";
		if(a.length>=3){
			parameters=a[1];
		}
		var parser=container.get(key,2);
		if(parser){
			return parser.apply({
				data:data,
				current:current
			},parameters.split(","));
		}else{
			return fnstr;
		}
	}else{
		return fnstr;
	}
};
var rescanArray=function(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		var val=array[i];
		if(topolr.is.isArray(val)){
			var _a=rescanArray(val);
			setunwrite(_a,"_parent_",result);
			setunwrite(_a,"_key_",i);
			result.push(_a);
		}else if(topolr.is.isObject(val)){
			var _a=rescanObject(val);
			setunwrite(_a,"_parent_",result);
			setunwrite(_a,"_key_",i);
			result.push(_a);
		}else{
			result.push(val);
		}
	}
	return result;
};
var rescanObject=function(obj){
	var result={};
	for(var i in obj){
		var val=obj[i];
		if(topolr.is.isArray(val)){
			var _b=rescanArray(val);
			setunwrite(_b,"_parent_",result);
			setunwrite(_b,"_key_",i);
			result[i]=_b;
		}else if(topolr.is.isObject(val)){
			var e={};
			for(var t in val){
				var _a=val[t];
				if(topolr.is.isArray(_a)){
					var _b=rescanArray(_a);
					setunwrite(_b,"_parent_",e);
					setunwrite(_b,"_key_",t);
					e[t]=_b;
				}else if(topolr.is.isObject(_a)){
					var _b=rescanObject(_a);
					setunwrite(_b,"_parent_",e);
					setunwrite(_b,"_key_",t);
					e[t]=_b;
				}else{
					e[t]=_a;
				}
			}
			setunwrite(e,"_parent_",result);
			setunwrite(e,"_key_",i);
			result[i]=e;
		}else{
			result[i]=val;
		}
	}
	return result;
};
var lastscan=function(obj,data){
	if(topolr.is.isArray(obj)){
		for(var i=0;i<obj.length;i++){
			var val=obj[i];
			if(topolr.is.isArray(val)){
				lastscan(val,data);
			}else if(topolr.is.isObject(val)){
				lastscan(val,data);
			}else{
				obj.splice(i,1,retransfn(val,obj,data));
			}
		}
	}else{
		for(var i in obj){
			var val=obj[i];
			if(topolr.is.isArray(val)){
				lastscan(val,data);
			}else if(topolr.is.isObject(val)){
				lastscan(val,data);
			}else{
				obj[i]=retransfn(val,obj,data);
			}
		}
	}
};

module.exports={
	parse:function(obj,data){
		try {
            var m = scanObject(obj);
            var n = rescanObject(m);
            lastscan(n, data);
            return n;
        }catch (e){
			console.error(e);
			return null;
		}
	}
};