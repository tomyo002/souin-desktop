import { Display } from './components/molecule';
import { DisplayQuantile } from './components/molecule/DisplayQuantile';

function App() {
  return (
    <>
      <Display
        baseUrl="http://localhost:2019"
        name="process_resident_memory_bytes"
        timeMilliSecond={1000}
        title="Octets de la mémoire résidente"
      />
      <Display
        baseUrl="http://localhost:2019"
        name="process_virtual_memory_bytes"
        timeMilliSecond={1000}
        title="Octets de la mémoire virtuelle"
      />
      <DisplayQuantile
        baseUrl="http://localhost:2019"
        name="go_gc_duration_seconds"
        timeMilliSecond={5000}
        title="Go gc durée par secondes"
      />
    </>
  );
}
export default App;
