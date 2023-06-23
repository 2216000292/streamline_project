function filterDataByRange(data, min, max) {
    return data.filter(item => item.x >= min && item.x <= max);
};

const filterDataByTwoRanges = (data, xDomain, yDomain) => {
    if (xDomain === null || yDomain === null) {
        return null;
    } else {
        return data.filter(
            (d) =>
                d.x >= xDomain[0] &&
                d.x <= xDomain[1] &&
                d.y >= yDomain[0] &&
                d.y <= yDomain[1]
            );
    }
};

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
};

function findMinMax(arr, key) {
    let min = arr[0][key];
    let max = arr[0][key];
  
    for (const obj of arr) {
      if (obj[key] < min) {
        min = obj[key];
      }
      if (obj[key] > max) {
        max = obj[key];
      }
    }
  
    return [min, max];
};

// function removeLeastFrequentKeysAndZeroValues(data) {
//   // Object to hold the frequency count of each key
//   let keyCounts = {};

//   for(let obj of data) {
//       for(let key in obj) {
//           if(keyCounts[key] === undefined) {
//               keyCounts[key] = 1;
//           } else {
//               keyCounts[key]++;
//           }
//       }
//   }

//   // Sort the keys by their frequency count
//   let keysSortedByFrequency = Object.keys(keyCounts).sort((a, b) => keyCounts[a] - keyCounts[b]);

//   // Determine the number of keys to remove
//   let numKeysToRemove = Math.floor(keysSortedByFrequency.length * 0.10);

//   // Get the keys that need to be removed
//   let keysToRemove = keysSortedByFrequency.slice(0, numKeysToRemove);

//   // Filter the data to remove objects that contain the least frequent keys or keys with zero values
//   let filteredData = data.map(obj => {
//       let newObj = {};
//       for(let key in obj) {
//           // Only copy the key-value pair if the key is not in the list to remove and its values don't contain 0
//           if(!keysToRemove.includes(key) && obj[key].indexOf(0) === -1) {
//               newObj[key] = obj[key];
//           }
//       }

//       // Return the new object only if it has at least one key
//       if(Object.keys(newObj).length > 0) {
//           return newObj;
//       }
//   }).filter(Boolean); // Remove undefined elements

//   return filteredData;
// }
function removeZeroValuesAndEmptyObjects(data) {
  // Filter the data to remove objects that contain keys with zero values
  let filteredData = data.map(obj => {
      let newObj = {};
      for(let key in obj) {
          // Only copy the key-value pair if its values don't contain 0
          if(!obj[key].includes(0)) {
              newObj[key] = obj[key];
          }
      }

      // Return the new object only if it has at least one key
      if(Object.keys(newObj).length > 0) {
          return newObj;
      }
  }).filter(Boolean); // Remove undefined elements

  return filteredData;
}



/**
 * This function is used to calculate the minimum distance from each streamline neighbor and determine the average
 * The return format should looks like
    {x: 0, y: 1, c: 0}
    {x: 1, y: 2, c: 0}
    {x: 2, y: 3, c: 0}
    {x: 3, y: 4, c: 0}

 * @param {*} data 
 * @returns {Array} 
 */
function avg_each_streamline_neighbor(data) {
  const averages = data.map((item, index) => {
    let total = 0;
    let count = 0;

    for(let key in item) {
      const min = Math.min(...item[key]);
      total += min;
      count++;
    }

    return { "x": index, "y": total / count, "c": 0 };
  });

  return averages;
}
  

function findKFrequentKey(objArray, k) {
  let keyCounts = {};
  for(let obj of objArray) {
      for(let key in obj) {
          // 如果这个键的值数组不包含0，我们就加入哈希表
          if(keyCounts[key] === undefined) {
              keyCounts[key] = 1;
          } else {
              keyCounts[key]++;
          }
      
      }
  }

  let keysSortedByFrequency = Object.keys(keyCounts).sort((a, b) => keyCounts[b] - keyCounts[a]);

  return keysSortedByFrequency[k-1];
}



function recordMinValues(objArray, mostFrequentKey) {
  let minValues = [];
  for(let obj of objArray) {
      if(obj[mostFrequentKey] !== undefined) {
          let minValue = Math.min(...obj[mostFrequentKey]);
          minValues.push(minValue);
      } else {
          minValues.push(0);
      }
  }
  return minValues;
}



// function convertToRequiredFormat(minValues, cValue) {
//   return minValues.map((value, index) => {
//       return {x: index, y: value, c: cValue};
//   });
// }

function convertToRequiredFormat(minValues, cValue) {
  return minValues.map((value, index) => {
      if(value !== 0) {
          return {x: index, y: value, c: cValue};
      }
  }).filter(item => item !== undefined);
}


function concatArrays(array1, array2) {
  return array1.concat(array2);
}

function findMinimums(data) {
  let result = [];

  data.forEach((obj, index) => {
    Object.keys(obj).forEach((key) => {
      let minimum = Math.min(...obj[key]);
      result.push({
        "x": index,
        "y": minimum,
        "c": Number(key)+1,
      });
    });
  });

  return result;
}