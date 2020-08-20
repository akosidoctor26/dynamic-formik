/**
 * Gets an object value using a string path
 * @param {Object} obj The object we are going to get value from
 * @param {string} strPath The string path (Ex. obj1.obj2.obj3, obj1.arr1[0].arr2[0].obj2)
 * @returns {any} The value of the object specified in the strPath
 */
const getObjectValueFromString = function (obj, strPath) {
  if (!obj || !strPath) return obj;

  strPath = strPath.replace(/\[([\w\s=]+)\]/g, '.$1'); // convert indexes to properties
  strPath = strPath.replace(/^\./, ''); // strip a leading dot
  var a = strPath.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj && k in obj) {
      obj = obj[k];
    } else if (k.includes('===') && Array.isArray(obj)) {
      const [key, val] = k.split('===');
      if (key && val) {
        switch (val) {
          case 'false':
            obj = obj.find((o) => o[key.trim()] === false);
            break;
          case 'true':
            obj = obj.find((o) => o[key.trim()] === true);
            break;
          default:
            obj = obj.find((o) => o[key.trim()] === val.trim());
        }
      } else {
        console.error('Configured array path find is invalid');
        return;
      }
    } else {
      return;
    }
  }
  return obj;
};

/**
 * Sets an object value using a string path
 * @param {Object} obj The object we are going to get value from.
 * @param {string} strPath The string path (Ex. obj1.obj2.obj3, obj1.arr1[0].arr2[0].obj2)
 * @param {any} value The new object
 */
const setObjectValueFromString = (origObj, strPath, value) => {
  if (!origObj || !strPath) return origObj;

  strPath = strPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  strPath = strPath.replace(/^\./, ''); // strip a leading dot

  var objCopy = Object.assign({}, origObj);
  var propNames = strPath.split('.'),
    propLength = propNames.length - 1,
    tmpObj = objCopy;

  for (var i = 0; i <= propLength; i++) {
    if (!tmpObj.hasOwnProperty(propNames[i])) {
      break;
    }
    tmpObj = tmpObj[propNames[i]] = i !== propLength ? tmpObj[propNames[i]] : value;
  }
  return objCopy;
};

export { getObjectValueFromString, setObjectValueFromString };
