import React from 'react';
import useRoutes from './routes';
import { ModeTypes } from './constants/mode';

const App: React.FC = () => {
  const routes = useRoutes(process.env.REACT_APP_MODE as ModeTypes);
  return routes;
};

export default App;
