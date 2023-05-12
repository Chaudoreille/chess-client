import { Outlet } from 'react-router-dom';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <header>Chess</header>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </>
  );
}