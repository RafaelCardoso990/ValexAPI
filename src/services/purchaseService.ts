
import bcrypt from "bcrypt"

import { findById } from "../repositories/businessRepository.js"

import * as paymantsRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"


import { findCardByIdNumber } from "./cardActivationService.js"

export async function checkPassword(password: string, passwordHash: string){
    
    const decrypted = await bcrypt.compare(password, passwordHash)
    if(decrypted == false) throw { status: 401, message: 'Password dont match' }
    return null
}

export async function checkBusinesses(businessId: number) {
    const businesses = await findById(businessId)
    if(!businesses) throw { status: 404, message: 'Businesses not found' }
    return businesses
}

export async function checkBusinessesType(cardType: string, businessesType: string) {
    if(cardType !== businessesType) throw { status: 401, message: 'Type of card doesnt match businesses' }
    return null
}

export async function balance(id: number) {

    const cardId = await findCardByIdNumber(id);
    if (!cardId) throw { status: 404, message: 'Card not found' };

    const payments = await paymantsRepository.findByCardId(cardId.id);
    const recharges = await rechargeRepository.findByCardId(cardId.id);
    const balance = recharges.reduce((acc, cur) => acc + cur.amount, 0) -
        payments.reduce((acc, cur) => acc + cur.amount, 0);

    return {
        balance,
        transactions: payments,
        recharges: recharges
    };
};

export async function checkAmount(balanceAmount: number, amount: number) {
    
    if(balanceAmount < amount) throw { status: 401, message: 'Insufficient founds' }
    return null
}

export async function savePurchase(cardId: number, businessId: number, amount: number) {
    await paymantsRepository.insert({cardId, businessId, amount})
    return null
};