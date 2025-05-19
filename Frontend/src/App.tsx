import { ToastContainer } from 'react-toastify';
import Router from './routes/Router'
import 'react-quill-new/dist/quill.snow.css';

function App() {

  return (
    <>
      <Router/>
      <ToastContainer />
    </>
  )
}

export default App
