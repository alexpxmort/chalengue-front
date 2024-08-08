import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomAlert from '@/app/components/CustomAlert';

describe('CustomAlert', () => {
  test('should renders alert with success type', () => {
    render(<CustomAlert type="success" message="Success message" onClose={jest.fn()} />);


    expect(screen.getByRole('alert')).toHaveClass('bg-green-100');
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  test('should renders alert with error type', () => {
    render(<CustomAlert type="error" message="Error message" onClose={jest.fn()} />);

    expect(screen.getByRole('alert')).toHaveClass('bg-red-100');
    expect(screen.getByText('✘')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('should renders alert with warning type', () => {
    render(<CustomAlert type="warning" message="Warning message" onClose={jest.fn()} />);

    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-100');
    expect(screen.getByText('!')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  test('should renders alert with info type', () => {
    render(<CustomAlert type="info" message="Info message" onClose={jest.fn()} />);


    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100');
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  test('should calls onClose WHEN close button is clicked', () => {
    const handleClose = jest.fn();
    render(<CustomAlert type="success" message="Success message" onClose={handleClose} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
