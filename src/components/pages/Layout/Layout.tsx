import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
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

export default Layout;