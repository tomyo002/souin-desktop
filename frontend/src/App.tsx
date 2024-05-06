import { Routes, Route } from 'react-router-dom';

import { ChartPage, FormPage, HomePage } from './components/page';
import { path } from './utils';

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={path.HOME} />
      <Route element={<FormPage />} path={path.FORM} />
      <Route element={<ChartPage />} path={path.CHART} />
    </Routes>
  );
}
export default App;
