import { phoneFormatter } from "./phoneFormatter";
import { describe, test, expect } from 'vitest';

describe('phoneFormatter', () => {
  test('first param true', () => {
    const phoneNumber = '8 (999) 999-99-99';
    expect(phoneFormatter(phoneNumber, true)).toBe(phoneNumber)
  });
  test('second param false', () => {
    const phoneNumber = '8 (999) 999-99-99';
    expect(phoneFormatter(phoneNumber, false)).toBe('8 (999) XXX-XX-XX')
  });
})