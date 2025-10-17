let arr = [1, 2, 5, 6, 7, 7];
let target = 8;

function sumandos(arr, target) {
  let result = [];
  for (const i in arr) {
    for (const j in arr) {
      if (i === j) {
        continue;
      }
      if (arr[i] + arr[j] === target) {
        result.push([i, j]);
      }
    }
  }
  return result;
}
console.log(leetcode(arr, target));
