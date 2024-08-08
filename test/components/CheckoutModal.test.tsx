import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutModal from '@/app/components/CheckoutModal';


describe('CheckoutModal', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly WHEN isOpen is true', () => {
    render(
      <CheckoutModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });

  it('should not render WHEN isOpen is false', () => {
    render(
      <CheckoutModal
        isOpen={false}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    expect(screen.queryByText('Finalizar Compra')).not.toBeInTheDocument();
  });

  it('should closes the modal WHEN Cancelar button is clicked', () => {
    render(
      <CheckoutModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalled();
  });

  it('should submits form data correctly WHEN Enviar button is clicked with valid input', () => {
    render(
      <CheckoutModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByText('Enviar'));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(onClose).toHaveBeenCalled();
  });

});
