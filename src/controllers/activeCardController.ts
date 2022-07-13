import { Response, Request } from "express";

import { update } from "../repositories/cardRepository.js";
import { cardRegistered, findCardByIdNumber, isExpired, checkCardCvv, encryptingPassword } from "../services/cardActivationService.js";

export async function activeCard(req: Request, res: Response) {

    const id: string = req.params.id
    const {cardCvv, cardPassword}: {cardCvv: string, cardPassword: string} = req.body    
    
    const card = await findCardByIdNumber(parseInt(id))
   
    await isExpired(card.expirationDate)

    await cardRegistered(card.password)

    await checkCardCvv(card.securityCode, cardCvv)

    const password = await encryptingPassword(cardPassword)

    await update(parseInt(id), {isBlocked: false, password})    

    res.status(200).send("Actived card")
}