import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// components
import { App } from '@/pages/main/app';

const ShopPage = lazy(() => import('@/pages/shop/shop').then(data => ({ default: data.Shop })));
const AboutPage = lazy(() => import('@/pages/about/about').then(data => ({ default: data.About })));

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback="Loading...">
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="Loading...">
            <ShopPage />
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);

/**
 * app todos:
 *    – building icons with svgr (https://react-svgr.com/docs/cli/)
 *    – add .env files support (https://www.npmjs.com/package/dotenv)
 */
