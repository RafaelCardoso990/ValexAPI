import { NextFunction, Request, Response } from "express";

export default async function validateCardLock(req: Request, res: Response, next: NextFunction) {

    const id: any = req.params.id
    const { password } = req.body;

    if (!id) throw { status: 400, message: 'Missing card identifier' };
    if (!password) throw { status: 400, message: 'Missing card Password' };
    
    next();
};