import {faker} from "@faker-js/faker"
import Cryptr from "cryptr";
import dayjs from "dayjs";
import { findByTypeAndEmployeeId, insert, TransactionTypes } from "../repositories/cardRepository.js";

import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";   


export async function findEmployee(employeeId: number){
    const employee = await findById(employeeId)
    if (!employee) throw { status: 404, message: 'Employee not found' };
    return employee
}

export async function findApiKey(apiKey: string){
    const company = await findByApiKey(apiKey)
    if (!company) throw { status: 404, message: 'Company not found' };
    return company
}

export async function findEmployeeAndType(employeeId: number, type: TransactionTypes){    
    const employeeAndType = await findByTypeAndEmployeeId(type, employeeId)    
    if (employeeAndType) throw { status: 409, message: 'This employee already has a card of this type' };
    return employeeAndType
}

export async function createCardNumber() {
    const numberFake = faker.finance.creditCardNumber('#### #### #### ####') 
    return numberFake
}

export async function createExpirationDate() {
    const newDate = dayjs().format('DD/MM/YYYY')    
    const date = dayjs(newDate).add(5, 'year').format('MM/YY')    
    return date
}

export async function createCVV() {
    const cryptr = new Cryptr('myTotallySecretKey');
    const cvvFake = faker.finance.creditCardCVV()
    
    const encryptedString = cryptr.encrypt(`${cvvFake}`)
   
    return encryptedString
}

export async function makeNameInUpperCase(fullName: string) {    
  
    const names = fullName.split(" ")
    const arr = []
    const finalName = []
    
    
    for(let i in names){
        
        if(names[i].length > 3 ){
            arr.push(names[i])
        }
    }       
    const auxArr = [...arr]
    
    auxArr.shift() 
    auxArr.pop()
    finalName.push(arr[0])
        
    for(let i in auxArr){
        finalName.push(auxArr[i][0])   
    }

    finalName.push(arr[arr.length -1]) 

    return finalName.join(" ").toUpperCase()    
}

export async function buildCard(employeeId: number, number: string, nameCard: string, cvv: string, expirationDate: string, type: TransactionTypes){
    
    const newCard = await insert({
        employeeId: employeeId,
        number: number,
        cardholderName: nameCard,
        securityCode: cvv,
        expirationDate: expirationDate,
        password: 'isBlocked',
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    });
    
    return newCard
}

