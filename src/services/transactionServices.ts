import { findById } from "../repositories/cardRepository.js";

export async function checkCard(id: number){
    const card = await findById(id)
    if(card.isBlocked === true) throw { status: 401, message: 'Card bloqued' }
}