import { Routes, Route } from 'react-router-dom';

import { ChartPage, FormPage, HomePage } from './components/page';
import { CHARTFORM, INSTANCEFORM, path } from './utils';

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={path.HOME} />
      <Route
        element={<FormPage type={INSTANCEFORM} />}
        path={path.FORM_INSTANCE}
      />
      <Route element={<ChartPage />} path={path.CHART} />
      <Route element={<FormPage type={CHARTFORM} />} path={path.FORM_CHART} />
    </Routes>
  );
}
export default App;
