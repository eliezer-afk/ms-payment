import { Request, Response } from 'express';
import Payment from '../models/pagosmodels';

export const processPayment = async (req: Request, res: Response) => {
    try {
        const { orderId, amount, currency, paymentMethod } = req.body;

        const payment = await Payment.create({
            orderId,
            amount,
            currency,
            paymentMethod,
        });

        // Aquí se realizaría la integración con el proveedor de pagos (ej: Stripe, PayPal)
        // y actualizar el estado en base al resultado.

        res.status(201).json({ message: 'Payment created', payment });
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
};

export const getPaymentStatus = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ status: payment.status });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment status', error });
    }
};

export const handleNotification = async (req: Request, res: Response) => {
    try {
        const { transactionId, status } = req.body;

        const payment = await Payment.findOne({ where: { transactionId } });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();

        res.status(200).json({ message: 'Payment status updated', payment });
    } catch (error) {
        res.status(500).json({ message: 'Error handling notification', error });
    }
};
