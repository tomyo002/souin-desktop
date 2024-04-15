import { useState } from 'react';

import { Button } from './components/atomic';
import { Line } from './components/molecule';

function App() {
  const d: Array<number> = [1, 25, 3];
  const [data, setData] = useState(d);
  const onClick = () => {
    setData(current => {
      return [...current, Math.floor(Math.random() * 100)];
    });
  };

  return (
    <div className="card w-96 bg-base-100">
      <Line data={data} title="my first chart" />
      <Button onclick={onClick}>click</Button>
    </div>
  );
}

export default App;
