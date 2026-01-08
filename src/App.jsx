import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import { fetchCart } from './store/slices/cartSlice';
import './assets/styles/global.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </Provider>
  );
};

export default App;