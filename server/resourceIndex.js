//resource for performing simple math opperations, may be used in middleware calculations 
// utils.js

// Math utilities
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => b !== 0 ? a / b : null;

// String utilities
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const reverseString = (str) => str.split('').reverse().join('');
export const isPalindrome = (str) => {
  const cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
  return cleanedStr === cleanedStr.split('').reverse().join('');
};

// Array utilities
export const findMax = (arr) => Math.max(...arr);
export const findMin = (arr) => Math.min(...arr);
export const sumArray = (arr) => arr.reduce((sum, num) => sum + num, 0);
export const averageArray = (arr) => arr.length ? sumArray(arr) / arr.length : null;
