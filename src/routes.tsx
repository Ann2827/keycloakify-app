import React from 'react';
import { Navigate, BrowserRouter, RouteObject, useRoutes as useReactRoutes } from 'react-router-dom';
import Main from './modules/Main';
import Page from './modules/Page';
import { MODE_BUILD_THEME1, MODE_DEMO, ModeTypes } from './constants/mode';
import { getAllPages } from './pagesConfig';

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
  },
  ...getAllPages().map((item) => ({
    path: `/${item.name}`,
    element: <Page mode={MODE_DEMO} config={item} />,
  })),
  {
    path: '*',
    element: <Navigate to='/' />,
  },
];

const Routes: React.FC = React.memo(() => {
  return useReactRoutes(routesConfig);
});

const useRoutes = (mode: ModeTypes | undefined): JSX.Element => {
  if (mode === MODE_DEMO) {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }

  return <Page mode={mode || MODE_BUILD_THEME1} />;
};

export default useRoutes;
