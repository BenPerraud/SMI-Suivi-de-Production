const express = require("express")
const router = express.Router()
const productionCtrl = require("../controllers/production")
const multer = require("multer")
const upload = multer()

router.post(`/`, upload.none(), productionCtrl.createProduction)
router.get(`/`, productionCtrl.getAllProduction)


module.exports = router