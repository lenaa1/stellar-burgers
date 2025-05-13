import {
  ConstructorPage,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  Feed
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route
        path='/profile'
        element={<ProtectedRoute>{<Profile />}</ProtectedRoute>}
      />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='/*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
