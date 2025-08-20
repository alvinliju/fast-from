import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { authMiddleware } from '../middleware/authMiddleware.ts';   
import type { Form as FormType } from '../types/index';
import type { Request, Response } from 'express';

const router = express.Router();
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

//create a form 
router.post('/', authMiddleware, async(req:Request, res:Response) => {
    try{
        const { title, description, isPublic } = req.body;
    const userSubmittedForm: FormType = {
        user_id: req.user?.id,
        title,
        description,
        content: {},
        isPublic,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
    const {data, error} = await supabase.from('forms').insert({ userSubmittedForm })

    if (error){
        throw error;
    }
    res.status(201).json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to create form'});
    }
    
})

//edit a form by id
router.put('/:id', authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
        const {title, description, isPublic} = req.body;
        const {data, error} = await supabase.from('forms').update({title, description, isPublic}).eq('id', id).eq('user_id', req.user?.id);
        if (error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to edit form'});
    }
})

router.delete('/:id', authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
        const {data, error} = await supabase.from('forms').delete().eq('id', id).eq('user_id', req.user?.id);
        if (error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Failed to delete form'});
    }
})

//get all forms according to user
router.get('/', authMiddleware, async(req, res)=>{
try{
    const {data, error} = await supabase.from('forms').select('*').eq('user_id', req.user?.id);
    if (error) throw error
    res.json(data)
}catch(error){
    res.status(500).json({error: 'Failed to get forms'});
}
})

//get a public form
router.get('/:id', async(req, res)=>{
    try{
        const {data, error} = await supabase.from('forms').select('*').eq('id', req.params.id).eq('is_published', true).single()
        if (error) throw error
        res.json(data)

    }catch(error){
        res.status(404).json({error:'Form not found or not public'})
    }
})
export default router
