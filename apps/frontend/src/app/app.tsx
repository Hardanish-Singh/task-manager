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

  return <div className="bg-indigo-500 p-2 font-mono">Hello!</div>;
}

export default App;
