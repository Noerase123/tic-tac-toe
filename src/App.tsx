import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import BaseGame from './pages/BaseGame';
import { Provider } from 'jotai';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/game",
    element: <BaseGame />
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
