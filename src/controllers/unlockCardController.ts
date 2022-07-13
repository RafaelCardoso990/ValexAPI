import { Response, Request } from "express";

import {  findCardByIdNumber, isExpired } from "../services/cardActivationService.js";

import { checkPassword } from "../services/purchaseService.js";
import { checkCardUnlock, unlockCardById } from "../services/unlockCardService.js";

export async function unlockCard(req: Request, res: Response) {    

    const id: any = req.params.id
    
    const { password } = req.body; 

    const card = await findCardByIdNumber(parseInt(id))    

    await checkPassword(password, card.password)
    
    await isExpired(card.expirationDate)

    await checkCardUnlock(card.isBlocked)    
    
    await unlockCardById(id)

    res.status(200).send("Card unlock successfully")
}