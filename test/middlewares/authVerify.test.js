// authVerify.test.js

const authVerify = require("../../middlewares/auth/authVerify.middleware");

describe('authVerify middleware', () => {
  test('should call next() if user is authenticated', () => {
    const req = { session: { username: 'testUser' } };
    const next = jest.fn();
    authVerify(req, {}, next);
    expect(next).toHaveBeenCalled();
  });

  test('should redirect to sign-in page if user is not authenticated', () => {
    const req = { session: {} };
    const res = { redirect: jest.fn() };
    authVerify(req, res, {});
    expect(res.redirect).toHaveBeenCalledWith('/auth/sign-in');
  });
});
