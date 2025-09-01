import express from 'express';
import { supabase } from '../lib/supbase.js';
import { requireAuth } from '../middleware/clerkAuth.js';
const router = express.Router();
//sumit a response
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userResponse = {
            form_id: id,
            data: req.body,
            created_at: new Date().toISOString()
        };
        const { data, error } = await supabase.from('responses').insert(userResponse);
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update response' });
    }
});
//get all responses according to form id
router.get('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('responses').select('*').eq('form_id', id);
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get responses' });
    }
});
//get a specific response
router.get('/response/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('responses').select('*').eq('id', id).single();
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get response' });
    }
});
export default router;
