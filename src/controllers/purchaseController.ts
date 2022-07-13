import { Response, Request } from "express";

import { findCardByIdNumber, isExpired } from "../services/cardActivationService.js";


import { checkCardBlock } from "../services/cardRechargeService.js";
import { balance, checkAmount, checkBusinesses, checkBusinessesType, checkPassword, savePurchase } from "../services/purchaseService.js";


export async function purchase(req: Request, res: Response){
    const {id} = req.params
    const {businessId, cardPassword, amount} = req.body

    await checkCardBlock(id)

    const card = await findCardByIdNumber(parseInt(id))  

    await isExpired(card.expirationDate)         

    await checkPassword(cardPassword, card.password)

    const businesses = await checkBusinesses(businessId)

    await checkBusinessesType(card.type, businesses.type)

    const balanceAmount = await balance(parseInt(id))

    await checkAmount(balanceAmount.balance, amount)

    await savePurchase(parseInt(id), businessId, amount)

    res.sendStatus(200)
}