import 'animate.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Layout from './Layout';

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </>
);
