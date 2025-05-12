import { findByEmail } from '../../../../../be/src/core/user/user.repository';
import { login } from '../../../../../be/src/core/user/user.controller';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}