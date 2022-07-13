import { update } from "../repositories/cardRepository.js"

export async function checkCardUnlock(isBlocked: boolean){
    if(isBlocked === false) throw { status: 401, message: 'Card already unlocked' }
    return null
}

export async function unlockCardById(cardId: number) {
    await update(cardId, {isBlocked: false})
}