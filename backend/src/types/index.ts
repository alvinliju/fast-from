import { Request } from 'express';

export interface Form {
    user_id: string;
    title: string;
    description: string;
    content: any;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

export interface Response {
    form_id: string;
    data: any;
    created_at: string;
}

// Extend Express Request to include Clerk's auth property
export interface AuthenticatedRequest extends Request {
    auth?: {
        userId: string;
        sessionId: string;
        actor?: any;
        sessionClaims?: any;
    };
}