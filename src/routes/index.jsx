import { createBrowserRouter } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';
import LoginRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([AdminRoutes ,LoginRoutes]);

export default router;
