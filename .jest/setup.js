import '@testing-library/jest-dom';

jest.setTimeout(20000);

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; 
  }
}));

afterEach(() => jest.clearAllMocks());
