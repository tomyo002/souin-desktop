import { Routes, Route } from 'react-router-dom';

import { ChartPage, FormPage, HomePage } from './components/page';
import { Home, Path } from './utils';

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={Home} />
      <Route element={<FormPage />} path={Path.form} />
      <Route element={<ChartPage />} path={Path.chart} />
    </Routes>
  );
}
export default App;
