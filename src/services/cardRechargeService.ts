import { insert } from "../repositories/rechargeRepository.js"

export async function checkCardBlock(cardPassword: string) {
    if(cardPassword === "isBlocked") throw { status: 401, message: 'Bloqued Card' }
    return null
}

export async function rechargeCardById(cardId: number, amount: number) {
    await insert({cardId, amount})
}