'use strict';

/**
* Function that verify if some attribute is null
* @param {Object} attr
*/
module.exports.isNull = (attr) => {
    return attr == undefined || attr == '' || attr == null;
};


module.exports.formatCracha = cracha => {
    while(cracha.length < 8) {
        cracha+='0';
    }
    return cracha;
}