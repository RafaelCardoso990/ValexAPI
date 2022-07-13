import Cryptr from "cryptr";
import bcrypt from "bcrypt"
import dayjs from "dayjs";
import { findById } from "../repositories/cardRepository.js";



export async function checkCardCvv(cvvCrypted: string, cardCvv: string) {
    const cryptr = new Cryptr('myTotallySecretKey');       
    const dencryptedString = cryptr.decrypt(cvvCrypted)    
    if(dencryptedString !== cardCvv) throw { status: 401, message: 'This cvv is not corretly' };
    return null;
}

export async function encryptingPassword(password: string) {    
    const passwordCrypt = bcrypt.hashSync(password, 10)    
    return passwordCrypt
}

export async function findCardByIdNumber(id: number){
    const card = await findById(id)
    if(!card) throw { status: 404, message: 'Card not found' }
    return card
}

export async function isExpired(expirationDate: string){
    const newDate =  dayjs().format('MM/YY')
    if(expirationDate < newDate) throw { status: 401, message: 'Card expired' };
    return null      
}

export async function cardRegistered(cardPassword: string) {
    if(cardPassword !== "isBlocked") throw { status: 401, message: 'Card already actived' }
    return null
}
