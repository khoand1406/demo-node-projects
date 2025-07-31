import express from 'express';

const router= express.Router();

router.get('/:userId', (req, res)=> {
    const userId= req.params.userId;
    res.send('Users Id get from params: '+ userId);
})

router.get('/:userId/className/:className', (req, res)=> {
    const userId= req.params.userId;
    const classname= req.params.className;
    res.send(`UserId: ${userId} className: ${classname}`);
})

router.get('/search', (req, res)=>{
    const searchQuery= req.params.q;
    res.send(searchQuery);
})

export default router;