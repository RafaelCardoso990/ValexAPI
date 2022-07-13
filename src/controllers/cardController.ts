import { Response, Request } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";

import { findEmployee, findApiKey, findEmployeeAndType, createCardNumber, createExpirationDate, createCVV, makeNameInUpperCase, buildCard } from "../services/cardServices.js";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export async function createCard(req: Request, res: Response){      
    
    const apiKey = req.headers["x-api-key"]
    
    const {employeeId, type} :{employeeId: number, type: TransactionTypes} = req.body
    
    await findApiKey(apiKey)
    
    await findEmployeeAndType(employeeId, type)      
   
    const employee = await findEmployee(employeeId)     

    const nameCard = await makeNameInUpperCase(employee.fullName) 
     
    const number = await createCardNumber()    
    
    const expirationDate = await createExpirationDate()
    
    const cvv = await createCVV()    
    
    const newCard = await buildCard(employeeId, number, nameCard, cvv, expirationDate, type)
   
    res.status(201).send(newCard)
}



