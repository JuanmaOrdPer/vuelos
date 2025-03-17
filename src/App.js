
import Home from './pages/Home';
import { VuelosProvider } from './context/VuelosContext';

function App() {
  return (
<VuelosProvider >
   <Home/>
</VuelosProvider>
  );
}

export default App;
