// Import the module you want to test
const notFoundHandler = require('../middleware/404');

// Define a test case
test('404 handler should respond with a 404 status code and "Route not found"', () => {
  // Mock Express response object
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  // Call the 404 handler function
  notFoundHandler({}, res);

  // Assert that the status code and response message are as expected
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledWith('Route not found');
});
