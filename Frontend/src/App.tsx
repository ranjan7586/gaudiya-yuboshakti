import { ToastContainer } from 'react-toastify';
import Router from './routes/Router'
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitTillBackendResponse = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1`);
        setLoading(false);
      } catch (error) {
        console.error('Backend not reachable', error);
        setLoading(false);
      }
    };

    waitTillBackendResponse();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Waking up the server...</p>
        </div>
      </div>
    );
  }


  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

export default App
