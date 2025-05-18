'use client'
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

type SuccessNotificationProps = {
    show: boolean;
    message: string;
};

export default function SuccessNotification({ show, message }: SuccessNotificationProps) {
    if (!show) return null;

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 bg-fontgreen text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
        >
        <FiCheck className="mr-2 text-xl" />
        {message}
        </motion.div>
    );
}