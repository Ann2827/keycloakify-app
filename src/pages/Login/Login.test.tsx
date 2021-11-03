import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Login from './Login';
import { getKcContext, defaultKcProps, KcContextBase } from 'keycloakify';

describe('page Login.tsx', () => {
  let kcContext: KcContextBase.Login | undefined;

  beforeAll(() => {
    const context = getKcContext({
      mockPageId: 'login.ftl',
    });
    kcContext = context.kcContext as KcContextBase.Login;
  });

  it('should render Login', async () => {
    if (!kcContext) throw new Error('kcContext do not mocked');
    const { getByTestId } = render(<Login kcContext={kcContext} {...defaultKcProps} />);
    console.log('getByTestId', getByTestId('kc-form'));
    expect(getByTestId('kc-form')).toBeInTheDocument();
  });

  // it('should nothing', () => {
  //   const { getByText } = render(<div>cервис сбора и квалификации лидов</div>);
  //   const textElement = getByText(/cервис сбора и квалификации лидов/i);
  //   expect(textElement).toBeInTheDocument();
  // });
});
