import HttpStatus from 'http-status-codes';
import ErrorHelpers from '../ErrorHelpers';

describe('ErrorHelpers', () => {
  const error = ErrorHelpers.sendErrorMessage(HttpStatus.NOT_FOUND, 'not found');
  test('should return the right message', () => {
    expect(typeof error).toBe('string');
    expect(error).toContain('404');
    expect(error).toContain('not found');
  });
});
