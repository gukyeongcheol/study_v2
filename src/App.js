import RouterLink from './route/RouterLink.js';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';

const App = () => {
  return (   
      <RecoilRoot>
        <RouterProvider router={RouterLink}></RouterProvider>   
      </RecoilRoot>      
  );
}

export default App;
