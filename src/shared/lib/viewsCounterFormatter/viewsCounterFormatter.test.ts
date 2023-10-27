import { viewsCounterFormatter } from "./viewsCounterFormatter";
import { describe, test, expect } from 'vitest';

describe('viewsCounterFormatter', () => {
  test('1 view', () => {
    const expected = '1 просмотр';
    expect(viewsCounterFormatter(1)).toBe(expected)
  });
  test('2 views', () => {
    const expected = '2 просмотра';
    expect(viewsCounterFormatter(2)).toBe(expected)
  });
  test('5 views', () => {
    const expected = '5 просмотров';
    expect(viewsCounterFormatter(5)).toBe(expected)
  });
  test('11 views', () => {
    const expected = '11 просмотров';
    expect(viewsCounterFormatter(11)).toBe(expected)
  });
  test('37 views', () => {
    const expected = '37 просмотров';
    expect(viewsCounterFormatter(37)).toBe(expected)
  });
  test('413 views', () => {
    const expected = '413 просмотров';
    expect(viewsCounterFormatter(413)).toBe(expected)
  });
  test('21 views', () => {
    const expected = '21 просмотр';
    expect(viewsCounterFormatter(21)).toBe(expected)
  });
})