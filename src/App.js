import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/Router/Router';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto mb-28">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
