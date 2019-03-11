import HttpStatus from 'http-status-codes';
import mockRes from 'jest-mock-express';
import ErrorHelpers from '../ErrorHelpers';

describe('ErrorHelpers', () => {
  const res = mockRes.response();

  test('should return a 404 error', () => {
    const error404 = ErrorHelpers.sendErrorMessage(res, HttpStatus.NOT_FOUND, 'not found');
    expect(typeof error404).toBe('object');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });

  test('should return a 500 error', () => {
    const error500 = ErrorHelpers.sendErrorMessage(res, HttpStatus.INTERNAL_SERVER_ERROR, 'internal server error');
    expect(typeof error500).toBe('object');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
});
