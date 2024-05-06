// signIn.test.js

const fs = require('fs');
const path = require('path');
const signIn = require('../../middlewares/auth/new.middleware');

// Mock de req, res y next
const mockReq = {
  body: { username: 'a', password: 'a' },
  session: {}
};
const mockRes = {
  render: jest.fn()
};
const mockNext = jest.fn();

describe('signIn middleware', () => {
  beforeAll(() => {
    // Guardamos el archivo de usuarios temporalmente
    const usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
    const usersData = JSON.stringify([
      { username: 'a', password: 'a' },
      { username: 's', password: 's' }
    ]);
    fs.writeFileSync(usersFilePath, usersData);
  });

  afterAll(() => {
    // Restauramos el archivo de usuarios
    const usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
    fs.unlinkSync(usersFilePath);
  });

  test('should set session and call next() if credentials are valid', () => {
    signIn(mockReq, mockRes, mockNext);
    expect(mockReq.session.username).toBe('a');
    expect(mockNext).toHaveBeenCalled();
  });

  test('should render sign-in page with error message if credentials are invalid', () => {
    mockReq.body.password = 'wrongPassword';
    signIn(mockReq, mockRes, mockNext);
    expect(mockRes.render).toHaveBeenCalledWith('auth/sign-in', { message: 'Usuario o contraseña incorrectos' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
