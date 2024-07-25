import { Link, Outlet } from 'react-router-dom';

import road from '@/assets/road.jpg';
import iceCrean from '@/assets/ice-cream.png';
import Moon from '@/assets/moon.svg';

// styles
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles['app-wrapper']} data-testId="test attr">
      <Link to="/about">About</Link>
      <br />
      <Link to="/shop">Shop</Link>
      <br />
      App content
      <br />
      <div>
        <img width={50} height={50} src={iceCrean} />
        <img width={50} height={50} src={road} />
        <Moon width={50} height={50} stroke="blue" />
      </div>
      <Outlet />
    </div>
  );
}
