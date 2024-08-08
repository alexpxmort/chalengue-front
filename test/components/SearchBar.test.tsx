import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/app/components/SearchBar';

describe('SearchBar', () => {
  test('should render component properly', () => {
    render(<SearchBar onSearch={jest.fn()} placeholder="Search..." />);


    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should calls onSearch WHEN the button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} placeholder="Search..." />);

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test query' } });

    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith('Test query');
  });
});
