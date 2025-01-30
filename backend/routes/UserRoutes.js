const express = require('express')
const router = express.Router()
router.get('/',userControler(req,res));
