import { clerkClient } from '@clerk/clerk-sdk-node';
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify the session token with Clerk
        const sessionClaims = await clerkClient.verifyToken(token);
        if (!sessionClaims || !sessionClaims.sub) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Add auth info to request
        req.auth = {
            userId: sessionClaims.sub,
            sessionId: sessionClaims.sid || ''
        };
        next();
    }
    catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};
