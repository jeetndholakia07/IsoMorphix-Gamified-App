import './App.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import { store } from "./context/store/store";
import i18n from './i18n/i18n';
import { ToastProvider } from './components/Toast/ToastContext';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
