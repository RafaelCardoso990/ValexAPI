import { NextFunction, Request, Response } from "express";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export default async function validateNewCard(req: Request, res: Response, next: NextFunction) {
    
    const { employeeId, type } = req.body;
    const apiKey = req.headers["x-api-key"]

    if (!apiKey) throw { status: 400, message: 'Missing API key' };
    if (!employeeId) throw { status: 400, message: 'Missing employee identifier' };
    if (!type) throw { status: 400, message: 'Missing card type' };

    const cardTypeList = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypeList.includes(type)) throw { status: 400, message: 'Invalid card type' };
    
    next();
};