import { Response, Request } from "express";
import { findCardByIdNumber } from "../services/cardActivationService.js";
import { checkCardBlock, rechargeCardById } from "../services/cardRechargeService.js";

export async function rechargeCard(req: Request, res: Response) {    

    const id: any = req.params.id

    const { rechargeAmount } = req.body; 

    const card = await findCardByIdNumber(parseInt(id))     

    await checkCardBlock(card.password)    
    
    await rechargeCardById(id, rechargeAmount)

    res.status(200).send("Recharge done successfully")
}