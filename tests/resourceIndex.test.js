//server/resourceIndex MathOpperations & String Management

// utils.test.js
import { describe, it, expect } from 'vitest';
import { increment, decrement, add, subtract, multiply, divide, capitalize, reverseString, isPalindrome, findMax, findMin, sumArray, averageArray } from '../server/resourceIndex.js';

// Math utilities tests
describe('Math utilities', () => {
    
    it('should add 1 to a number', () => {
        expect(increment(3)).toBe(4);
        expect(increment(-1)).toBe(0);
      });
  
      it('should subtract 1 from a number', () => {
       expect(decrement(2)).toBe(1);
          expect(decrement(0)).toBe(-1);
        });
  

  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-2, 3)).toBe(1);
  });

  it('should subtract two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(3, 5)).toBe(-2);
  });

  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });

  it('should divide two numbers', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(6, 0)).toBeNull();
  });

  // Additional math tests
  it('should add zero correctly', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
  });

  it('should handle subtracting negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
    expect(subtract(-3, -5)).toBe(2);
  });

  it('should handle multiplying by zero', () => {
    expect(multiply(0, 5)).toBe(0);
    expect(multiply(5, 0)).toBe(0);
  });

  it('should handle dividing negative numbers', () => {
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(6, -3)).toBe(-2);
  });
});

// String utilities tests
describe('String utilities', () => {
  it('should capitalize a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('should reverse a string', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('world')).toBe('dlrow');
  });

  it('should check if a string is a palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('hello')).toBe(false);
  });

  // Additional string tests
  it('should capitalize single character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('z')).toBe('Z');
  });

  it('should handle empty string for reverseString', () => {
    expect(reverseString('')).toBe('');
  });

  it('should handle single character for reverseString', () => {
    expect(reverseString('a')).toBe('a');
  });

  it('should handle empty string for isPalindrome', () => {
    expect(isPalindrome('')).toBe(true);
  });

  it('should handle single character for isPalindrome', () => {
    expect(isPalindrome('a')).toBe(true);
  });
});

// Array utilities tests
describe('Array utilities', () => {
  it('should find the maximum value in an array', () => {
    expect(findMax([1, 2, 3, 4, 5])).toBe(5);
    expect(findMax([-1, -2, -3, -4, -5])).toBe(-1);
  });

  it('should find the minimum value in an array', () => {
    expect(findMin([1, 2, 3, 4, 5])).toBe(1);
    expect(findMin([-1, -2, -3, -4, -5])).toBe(-5);
  });

  it('should sum the values in an array', () => {
    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
    expect(sumArray([-1, -2, -3, -4, -5])).toBe(-15);
  });

  it('should calculate the average of values in an array', () => {
    expect(averageArray([1, 2, 3, 4, 5])).toBe(3);
    expect(averageArray([-1, -2, -3, -4, -5])).toBe(-3);
  });

  // Additional array tests
  it('should handle empty array for findMax', () => {
    expect(findMax([])).toBe(-Infinity);
  });

  it('should handle empty array for findMin', () => {
    expect(findMin([])).toBe(Infinity);
  });

  it('should handle empty array for sumArray', () => {
    expect(sumArray([])).toBe(0);
  });

  it('should handle empty array for averageArray', () => {
    expect(averageArray([])).toBeNull();
  });

  it('should handle single element array for findMax', () => {
    expect(findMax([5])).toBe(5);
  });

  it('should handle single element array for findMin', () => {
    expect(findMin([5])).toBe(5);
  });

  it('should handle single element array for sumArray', () => {
    expect(sumArray([5])).toBe(5);
  });

  it('should handle single element array for averageArray', () => {
    expect(averageArray([5])).toBe(5);
  });
});
