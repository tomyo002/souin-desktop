import { Routes, Route } from 'react-router-dom';

import { ChartPage, FormPage, Home } from './components/page';

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<FormPage />} path="/form" />
      <Route element={<ChartPage />} path="/chart" />
    </Routes>
  );
}
export default App;
