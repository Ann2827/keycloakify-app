import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
// import App from './App';

// https://polvara.me/posts/mocking-context-with-react-testing-library
describe('App.tsx', () => {
  // it('should render App', async () => {
  //   const { findByTestId } = render(<App />);
  //   const idElement = await findByTestId(/root/i);
  //   console.log('idElement', idElement);
  //   expect(idElement).toBeInTheDocument();
  // });

  it('should nothing', () => {
    const { getByText } = render(<div>cервис сбора и квалификации лидов</div>);
    const textElement = getByText(/cервис сбора и квалификации лидов/i);
    expect(textElement).toBeInTheDocument();
  });
});
