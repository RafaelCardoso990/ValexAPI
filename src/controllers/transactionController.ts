import { Response, Request } from "express";
import { balance } from "../services/purchaseService.js";
import { checkCard } from "../services/transactionServices.js";

export async function getBalance(req: Request, res: Response){
    const {id} = req.params

    await checkCard(parseInt(id)) 

    const balancePayments = await balance(parseInt(id))
    
    res.status(200).send(balancePayments)

}