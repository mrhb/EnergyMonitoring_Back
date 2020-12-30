var Piecewise = require('../common/Picewise')

// var taarif={"year":1399, x:[0,100,
//     100+Number.MIN_VALUE,200,
//     200+Number.MIN_VALUE,300,
//     300+Number.MIN_VALUE,400,
//     400+Number.MIN_VALUE,500], y:[372,372,434,434,930,930,1674,1674]}


const path = require('path');
const fs= require('fs');

const getJsonData=function(basePathToData,filename){
    var filename=path.join(basePathToData,filename);
    return JSON.parse(fs.readFileSync(filename,'utf-8'));
};
var taarif=getJsonData(__dirname,'Tarif.json');
console.log("this is x:   "+taarif.x);
console.log("this is y:   "+taarif.y);
relu = Piecewise(taarif.x, taarif.y)
// relu = Piecewise([-1, 0, 6], [0, 0, 1])
console.log("this is result:   "+relu(101))
