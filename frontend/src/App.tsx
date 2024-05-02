import { Routes, Route } from 'react-router-dom';

import { ChartPage } from './components/page';

function App() {
  return (
    <Routes>
      <Route
        element={<ChartPage baseUrl="https://localhost:2019" name="souin" />}
        path="/"
      />
    </Routes>
  );
}
export default App;
