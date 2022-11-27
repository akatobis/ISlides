import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { getState } from './state';

test('renders learn react link', () => {
  render(<App presentationMaker={getState()} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
