import { labelsCounterFormatter } from "./labelsCounterFormatter";
import { describe, test, expect } from 'vitest';

describe('labelsCounterFormatter', () => {
  test('1 view', () => {
    const expected = '1 просмотр';
    expect(labelsCounterFormatter(1, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('2 views', () => {
    const expected = '2 просмотра';
    expect(labelsCounterFormatter(2, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('5 views', () => {
    const expected = '5 просмотров';
    expect(labelsCounterFormatter(5, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('11 views', () => {
    const expected = '11 просмотров';
    expect(labelsCounterFormatter(11, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('37 views', () => {
    const expected = '37 просмотров';
    expect(labelsCounterFormatter(37, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('413 views', () => {
    const expected = '413 просмотров';
    expect(labelsCounterFormatter(413, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('21 views', () => {
    const expected = '21 просмотр';
    expect(labelsCounterFormatter(21, ['просмотр', 'просмотра','просмотров'])).toBe(expected)
  });
  test('1 review', () => {
    const expected = '1 отзыв';
    expect(labelsCounterFormatter(1, ['отзыв', 'отзыва','отзывов'])).toBe(expected)
  });
  test('2 reviews', () => {
    const expected = '2 отзыва';
    expect(labelsCounterFormatter(2, ['отзыв', 'отзыва','отзывов'])).toBe(expected)
  });
  test('5 reviews', () => {
    const expected = '5 отзывов';
    expect(labelsCounterFormatter(5, ['отзыв', 'отзыва','отзывов'])).toBe(expected)
  });
})