import React, { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import Toaster from './Toaster';

type ToastType = 'success' | 'error' | 'info' | 'alert';

interface ToastContextType {
    showToast: (type: ToastType, heading: string | ReactNode, message: string, timer?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<{ show: boolean; type: ToastType; heading: string | ReactNode; message: string; timer?: number }>({
        show: false,
        type: 'info',
        heading: "",
        message: '',
        timer: 3000
    });

    const showToast = (type: ToastType, heading: string | ReactNode, message: string, timer?: number) => {
        setToast({ show: true, type, heading, message, timer });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, timer);
    };

    const onCloseToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster
                show={toast.show}
                onClose={onCloseToast}
                type={toast.type}
                heading={toast.heading}
                message={toast.message}
            />
        </ToastContext.Provider>
    );
};
