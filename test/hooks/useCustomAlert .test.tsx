
import { AlertState, useCustomAlert } from '@/app/hooks/useCustomAlert';
import { render, act } from '@testing-library/react';
import React from 'react';

const TestComponent: React.FC<{ callback: (state: ReturnType<typeof useCustomAlert>) => void }> = ({ callback }) => {
  const alert = useCustomAlert();
  React.useEffect(() => {
    callback(alert);
  }, [alert, callback]);
  return null;
};

describe('useCustomAlert', () => {
  test('should initialize with no alert', () => {
    let alertState:AlertState | undefined;
    render(
      <TestComponent callback={(state) => { alertState = state; }} />
    );

    expect(alertState?.alert).toBeNull();
  });

  test('should show an alert and clear it after 5000ms', () => {
    jest.useFakeTimers();
    let alertState:AlertState | undefined;
    render(
      <TestComponent callback={(state) => { alertState = state; }} />
    );

    act(() => {
      alertState?.showAlert('success', 'Test alert');
    });

    expect(alertState?.alert).toEqual({
      type: 'success',
      message: 'Test alert',
    });

    act(() => {
      jest.advanceTimersByTime(5000); // fast-forward 5000ms
    });

    expect(alertState?.alert).toBeNull();
  });

  test('should allow manually closing the alert', () => {
    let alertState:AlertState | undefined;
    render(
      <TestComponent callback={(state) => { alertState = state; }} />
    );

    act(() => {
      alertState?.showAlert('warning', 'Test alert');
    });

    expect(alertState?.alert).toEqual({
      type: 'warning',
      message: 'Test alert',
    });

    act(() => {
      alertState?.closeAlert();
    });

    expect(alertState?.alert).toBeNull();
  });
});
