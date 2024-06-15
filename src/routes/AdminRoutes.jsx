import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import AdminLayout from '../layout/AdminLayout';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/admin/dashboard')));

// utilities routing
const Home = Loadable(lazy(() => import('views/admin/home')));
const About = Loadable(lazy(() => import('views/admin/about')));
const Overview = Loadable(lazy(() => import('views/admin/overview')));
const Approche = Loadable(lazy(() => import('views/admin/approche')));
const Message = Loadable(lazy(() => import('views/admin/message')));


// ==============================|| ADMIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <AdminLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'section',
      children: [
        {
          path: 'hero',
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'overview',
          element: <Overview />
        },
        {
          path: 'approche',
          element: <Approche />
        }
      ]
    },
    {
      path: 'message',
      element: <Message />
    }
  ]
};

export default MainRoutes;
