import { describe, test, it, expect } from "vitest";
import { max } from "./proofOfConcept.js"

describe('max', () => {
    it('should return 1 when 1, 0', () => {
        expect(max(1,0)).toBe(1);        
    });

    it("should return 2 when 1, 2", () => {
        expect(max(1,2)).toBe(2);
    });

    it("should return 5 when both values are 5", () => {
        expect(max(5,5)).toBe(5);
    });
})