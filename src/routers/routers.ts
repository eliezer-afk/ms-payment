import { Router } from 'express';
import { processPayment, getPaymentStatus, handleNotification } from '../controllers/pagoscontrollers';

const router = Router();

// Ruta para procesar un pago
router.post('/process', processPayment);

// Ruta para obtener el estado de un pago
router.get('/:paymentId/status', getPaymentStatus);

// Ruta para manejar notificaciones de un proveedor de pagos
router.post('/notification', handleNotification);

export default router;
