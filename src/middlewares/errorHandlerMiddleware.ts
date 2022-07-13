import { Request, Response, NextFunction } from 'express';

export default function errorHandle(error: any, req: Request, res: Response, next: NextFunction) {

    if (error.response) return res.sendStatus(error.response.status)
    if (error.status) return res.status(error.status).send(error.message)
    res.status(500).send(error)
};