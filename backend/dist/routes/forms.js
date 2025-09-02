import express from 'express';
import { supabase } from '../lib/supbase.js';
import { requireAuth } from '../middleware/clerkAuth.js';
const router = express.Router();
// Create a form 
router.post('/', requireAuth, async (req, res) => {
    try {
        const { title, description, isPublic, content } = req.body;
        console.log('Creating form with data:', { title, description, isPublic, content });
        const formData = {
            user_id: req.auth.userId,
            title,
            description: description || '',
            content: content,
            is_public: isPublic || false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        const { data, error } = await supabase
            .from('forms')
            .insert(formData)
            .select()
            .single();
        if (error) {
            console.error('Supabase error:', error);
            return res.status(400).json({ error: error.message });
        }
        console.log('Form created successfully:', data);
        res.status(201).json(data);
    }
    catch (error) {
        console.error('Create form error:', error);
        res.status(500).json({ error: 'Failed to create form' });
    }
});
// Get all forms for user
router.get('/', requireAuth, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('forms')
            .select('*')
            .eq('user_id', req.auth.userId)
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Supabase error:', error);
            return res.status(400).json({ error: error.message });
        }
        res.json(data);
    }
    catch (error) {
        console.error('Get forms error:', error);
        res.status(500).json({ error: 'Failed to get forms' });
    }
});
// Get a public form (no auth required)
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('forms')
            .select('*')
            .eq('id', req.params.id)
            .eq('is_public', true)
            .single();
        if (error) {
            console.error('Supabase error:', error);
            return res.status(404).json({ error: 'Form not found or not public' });
        }
        console.log(data);
        res.json(data);
    }
    catch (error) {
        console.error('Get public form error:', error);
        res.status(404).json({ error: 'Form not found or not public' });
    }
});
// Update form
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isPublic, content } = req.body;
        const updateData = {
            title,
            description,
            is_public: isPublic,
            content,
            updated_at: new Date().toISOString()
        };
        const { data, error } = await supabase
            .from('forms')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', req.auth.userId)
            .select()
            .single();
        if (error) {
            console.error('Supabase error:', error);
            return res.status(400).json({ error: error.message });
        }
        res.json(data);
    }
    catch (error) {
        console.error('Update form error:', error);
        res.status(500).json({ error: 'Failed to edit form' });
    }
});
// Delete form
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('forms')
            .delete()
            .eq('id', id)
            .eq('user_id', req.auth.userId)
            .select();
        if (error) {
            console.error('Supabase error:', error);
            return res.status(400).json({ error: error.message });
        }
        res.json({ message: 'Form deleted successfully', data });
    }
    catch (error) {
        console.error('Delete form error:', error);
        res.status(500).json({ error: 'Failed to delete form' });
    }
});
export default router;
