import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import Layout from './Layout';
import GlobalStyle from './GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GlobalStyle />
    <Layout />
  </BrowserRouter>
);
