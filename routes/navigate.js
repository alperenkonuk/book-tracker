import express from "express";

const router = express.Router();

router.get('/:direction', (req, res) => {
  const direction = req.params.direction;
  res.redirect('/' + direction);
})

router.get('/', (req, res) => {
  res.redirect('/');
})


export default router;