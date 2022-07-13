import { Request, Response, NextFunction } from 'express';

export default async function validateIdentifier(req: Request, res: Response, next: NextFunction) {

    const { cardId } = req.body;
    if (!cardId) throw { status: 400, message: 'Missing card identifier' };

    next();
};