import { Response, Request } from "express";
import { blockCardById, checkCardBlocked } from "../services/blockCardService.js";
import {  findCardByIdNumber, isExpired } from "../services/cardActivationService.js";

import { checkPassword } from "../services/purchaseService.js";

export async function blockCard(req: Request, res: Response) {    

    const id: any = req.params.id
    
    const { password } = req.body; 

    const card = await findCardByIdNumber(parseInt(id))    

    await checkPassword(password, card.password)
    
    await isExpired(card.expirationDate)

    await checkCardBlocked(card.isBlocked)    
    
    await blockCardById(id)

    res.status(200).send("Card blocked successfully")
}