import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import type { Response as ResponseType } from '../types/index.ts';

const router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

//sumit a response
router.post('/:id', authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
        const userResponse: ResponseType = {
            form_id: id,
            data: req.body,
            created_at: new Date().toISOString()
        }
        const {data, error} = await supabase.from('responses').insert(userResponse);
        if (error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to update response'});
    }
})

//get all responses according to form id
router.get('/:id', authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
        const {data, error} = await supabase.from('responses').select('*').eq('form_id', id)
        if (error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to get responses'});
    }
})

//get a response by response id
router.get('/response/:id', authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
        const {data, error} = await supabase.from('responses').select('*').eq('id', id).single()
        if (error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to get response'});
    }
})

export default router;