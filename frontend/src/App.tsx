import { useState } from 'react';

import { Button } from './components/atomic';
import { Line } from './components/molecule';

function App() {
  const [data, setData] = useState([1, 25, 3]);
  const onClick = () => {
    setData(current => {
      return [...current, Math.floor(Math.random() * 100)];
    });
  };

  return (
    <div className="card w-96 bg-base-100">
      <Line data={data} title="my first chart" />
      <Button onClick={onClick}>click</Button>
    </div>
  );
}

export default App;
