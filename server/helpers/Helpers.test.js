import Helpers from './Helpers';

describe('Helpers', () => {
  const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  describe('shuffle', () => {
    test('should shuffle the array', () => {
      const array2 = Helpers.shuffle(array1);
      expect(array2).toBeInstanceOf(Array);
      expect(array2).toHaveLength(10);
      expect(array2).toContain(1);
    });
  });
});