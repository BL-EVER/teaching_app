/*
* var data = [{ simpleProp: "some value" }, { booleanProp: false }, { arrayProp: [{ prop1: "value1" }, { prop2: { prop22: "value22", prop23: "value23" } }, { prop3: "value3" }, { booleanProp: true }] }];
*
* console.log(some(data, 'booleanProp', true)); // true
* console.log(some(data, 'foo', 42));           // false
*
* */

export function some(object, property, value) {
    return object[property] === value || Object.keys(object).some(function (k) {
        return object[k] && typeof object[k] === 'object' && some(object[k], property, value);
    });
}