import { NextFunction, Request, Response } from "express";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export default async function validateCardRecharge(req: Request, res: Response, next: NextFunction) {

    const apiKey = req.headers["x-api-key"]
    const id: string = req.params.id
    const { rechargeAmount } = req.body;

    if (!apiKey) throw { status: 400, message: 'Missing API key' };
    if (!id) throw { status: 400, message: 'Missing card identifier' };   
    if (rechargeAmount <= 0) throw { status: 400, message: 'Invalid Recharge Amount' };
    if (!rechargeAmount) throw { status: 400, message: 'Missing Recharge Amount' };
    
    next();
};