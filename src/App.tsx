import './App.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import { store } from "./context/store/store.js";
import { ToastProvider } from './components/Toast/ToastContext.js';
// @ts-ignore
import i18n from './i18n/i18n.js';

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
