import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('should renders spinner', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('spinner'); 

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('border-blue-600'); 
    expect(spinner).toHaveClass('animate-spin'); 
  });
});
