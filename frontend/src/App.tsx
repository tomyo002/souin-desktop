import { Display, DisplayQuantile } from './components/molecule';
function App() {
  return (
    <>
      <Display
        baseUrl="http://localhost:2019"
        name="process_resident_memory_bytes"
        timeMilliSecond={1000}
        title="process resident memory bytes"
      />
      <Display
        baseUrl="http://localhost:2019"
        name="process_virtual_memory_bytes"
        timeMilliSecond={1000}
        title="process virtual memory bytes"
      />
      <DisplayQuantile
        baseUrl="http://localhost:2019"
        name="go_gc_duration_seconds"
        timeMilliSecond={5000}
        title="go gc duration seconds"
      />
    </>
  );
}
export default App;
