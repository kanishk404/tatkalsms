const PurchaseRouter = require("express").Router()
const purchaseAuth = require("../middleware/index.js")
const { handlePurchase, handleCancel ,handleBan, handleFinish, handleSms, handleSmsList} = require("../controller/Purchase.js")


PurchaseRouter.post("/buy", purchaseAuth, handlePurchase);
PurchaseRouter.post("/cancel",purchaseAuth , handleCancel)
PurchaseRouter.post("/finish",purchaseAuth , handleFinish)
PurchaseRouter.post("/ban",purchaseAuth , handleBan)
PurchaseRouter.post("/sms",purchaseAuth , handleSms)
PurchaseRouter.post("/sms-list",purchaseAuth , handleSmsList)


module.exports = PurchaseRouter;