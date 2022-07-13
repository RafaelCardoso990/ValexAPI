import { update } from "../repositories/cardRepository.js";

export async function blockCardById(cardId: number) {
    await update(cardId, {isBlocked: true})
}

export async function checkCardBlocked(isBlocked: boolean) {
    if(isBlocked === true) throw { status: 401, message: 'Bloqued Card' }
    return null
}