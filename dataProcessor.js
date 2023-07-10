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

// function findMinMax(arr, key) {
//     let min = arr[0][key];
//     let max = arr[0][key];
  
//     for (const obj of arr) {
//       if (obj[key] < min) {
//         min = obj[key];
//       }
//       if (obj[key] > max) {
//         max = obj[key];
//       }
//     }
  
//     return [min, max];
// };

function findMinMax(arr) {
  let minX = arr[0].x, minY = arr[0].y;
  let maxX = arr[0].x, maxY = arr[0].y;

  for (const obj of arr) {
    if (obj.x < minX) {
      minX = obj.x;
    }
    if (obj.x > maxX) {
      maxX = obj.x;
    }
    if (obj.y < minY) {
      minY = obj.y;
    }
    if (obj.y > maxY) {
      maxY = obj.y;
    }
  }

  return [
    minX,
    maxX,
    minY,
    maxY,
  ];
};

function calculateExtremeValues(data) {
  let flattenedData = data.reduce((acc, cur) => acc.concat(cur[1]), []);

  let extremes = findMinMax(flattenedData);

  return extremes;
}


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


// function classifyData(data) {
//   let result = {};

//   for(let i = 0; i < data.length; i++) {
//       let cValue = data[i].c;
//       if(!result[cValue]) {
//           result[cValue] = [];
//       }
//       result[cValue].push(data[i]);
//   }

//   console.log(result);
//   return result;
// }

function classifyData(data) {
  let result = {};

  for(let i = 0; i < data.length; i++) {
      let cValue = data[i].c;
      if(!result[cValue]) {
          result[cValue] = [];
      }
      result[cValue].push(data[i]);
  }

  let keys = Object.keys(result);
  keys.sort((a, b) => {
      let minXa = Math.min(...result[a].map(item => item.x));
      let minXb = Math.min(...result[b].map(item => item.x));

      if (minXa !== minXb) return minXa - minXb;

      return result[a].length - result[b].length;
  });

  let sortedResult = keys.map(key => [key, result[key]]);

  return sortedResult;
}



function findMaxXY(data) {
  let maxX = -Infinity;
  let maxY = -Infinity;

  for(let i = 0; i < data.length; i++) {
    if(data[i].x > maxX) {
      maxX = data[i].x;
    }
    if(data[i].y > maxY) {
      maxY = data[i].y;
    }
  }
  return [maxX, maxY];
}


// function calculateDerivative(data) {
//   let derivative = [];

//   for (let i = 0; i < data.length - 1; i++) {
//       let dy = data[i + 1].y - data[i].y;
//       let dx = data[i + 1].x - data[i].x;
//       derivative.push({"x": data[i].x, "y": dy/dx, "c": 0});
//   }

//   return data.concat(derivative);
// }

function calculateDerivatives(data) {
  return data.map(([key, values]) => {
    let derivatives = values.slice(0, -1).map((val, index, array) => {
      let slope = (values[index + 1].y - val.y) / (values[index + 1].x - val.x);
      return {
        x: val.x,
        y: slope,
        c: val.c
      };
    });

    return [key, derivatives];
  });
}


//This function takes hashmap as paramter
// function calculateAverageLine(hashTable) {
//   let values = {};

//   // 遍历哈希表
//   for (let key in hashTable) {
//     if (hashTable[key].show) {  // 只处理 show 为 true 的图表
//       let dataset = hashTable[key].dataset;

//       // 收集所有数据点的 x 和 y 值
//       for (let i = 0; i < dataset.length; i++) {
//         let point = dataset[i];
//         let x = point.x;
//         let y = point.y;

//         if (values[x]) {
//           values[x].total += y;
//           values[x].count++;
//         } else {
//           values[x] = {
//             total: y,
//             count: 1
//           };
//         }
//       }
//     }
//   }

//   // 计算每个 x 值对应的 y 值的平均数，并创建新的数据集
//   let averageLine = [];
//   for (let x in values) {
//     averageLine.push({
//       x: parseInt(x),
//       y: values[x].total / values[x].count,
//       c: 0
//     });
//   }

//   // 按 x 值排序新的数据集
//   averageLine.sort((a, b) => a.x - b.x);

//   return averageLine;
// }


function calculateAverageLine(hashTable) {
  let values = {};
  let dataArrays = [];

  // 遍历哈希表
  for (let key in hashTable) {
    if (hashTable[key].show) {  // 只处理 show 为 true 的图表
      let dataset = hashTable[key].dataset;
      dataArrays.push(dataset);  // 添加到 dataArrays

      // 收集所有数据点的 x 和 y 值
      for (let i = 0; i < dataset.length; i++) {
        let point = dataset[i];
        let x = point.x;
        let y = point.y;

        if (values[x]) {
          values[x].total += y;
          values[x].count++;
        } else {
          values[x] = {
            total: y,
            count: 1
          };
        }
      }
    }
  }

  // 计算每个 x 值对应的 y 值的平均数，并创建新的数据集
  let averageLine = [];
  for (let x in values) {
    averageLine.push({
      x: parseInt(x),
      y: values[x].total / values[x].count,
      c: 0
    });
  }

  // 按 x 值排序新的数据集
  averageLine.sort((a, b) => a.x - b.x);

  // 添加新的平均线数据集到 dataArrays
  dataArrays.push(averageLine);

  // 使用 concat 方法合并所有数组
  let combinedData = [].concat(...dataArrays);

  // 返回合并后的数据
  return combinedData;
}


function flattenData(data) {
  let result = [];

  for (let [_, values] of data) {
    result = result.concat(values);
  }

  return result;
}

//parameter should looks like this [
//  ['3', [{x: 0, y: 0.16438235560424355, c: 2}, {x: 1, y: 0.1689473088493283, c: 2}, /* more objects */]],
//  ['2', [{x: 0, y: 0.23553560424355, c: 3}, {x: 1, y: 0.198573088493283, c: 3}, /* more objects */]],
  // ...

function calulateAverage(data) {
  let sumMap = new Map();
  let countMap = new Map();
  
  // Traverse through data and calculate sum and count
  for (let [_, values] of data) {
    for (let point of values) {
      if (sumMap.has(point.x)) {
        sumMap.set(point.x, sumMap.get(point.x) + point.y);
        countMap.set(point.x, countMap.get(point.x) + 1);
      } else {
        sumMap.set(point.x, point.y);
        countMap.set(point.x, 1);
      }
    }
  }

  // Calculate average points
  let averageData = [];
  for (let [key, value] of sumMap) {
    averageData.push({
      x: key,
      y: value / countMap.get(key),
      c: 0
    });
  }
  averageData.sort((a, b) => a.x - b.x);

  // Append original data and average data
  let result = [];
  for (let [_, values] of data) {
    result = result.concat(values);
  }
  result = result.concat(averageData);

  return result;
}


