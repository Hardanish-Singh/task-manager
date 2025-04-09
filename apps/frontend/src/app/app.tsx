import axios from 'axios';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    // async IIFE
    (async () => {
      const response = await axios.get('http://localhost:3000/');
      console.log('RESPONSE', response);
    })();
  }, []);

  return <div>Hello World</div>;
}

export default App;
