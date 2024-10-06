import { Currency, Money } from "./money";

export function convertTimeStampToLocaleDateString(timeStamp: number): string {

    if (!timeStamp) return "";

    const dateString = new Date(timeStamp*1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, 
        timeZone: 'UTC', 
    })
    return dateString;
}    

export function convertISODateToLocaleDateString(isoDate: string): string {

        if (!isoDate) return "";
    
        const dateString = new Date(isoDate).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, 
        })
    return dateString;
}   

export function convertDateStringToTimeStampInSeconds(date: string, time: string = "T00:00:00Z"): number {
    if (!date) return 0;
    const reformattedDate = date.replace(/(\d{2})-(\d{2})-(\d{4})/,"$3-$1-$2");
    const dateDate = new Date(reformattedDate + time);
    const dateTS = Math.floor(dateDate.getTime()/1000);
    return dateTS;
}

export function convertAmountWithCurrencyPrecision(amount: number, currency: string): number{

    const updatedAmount = Math.round(amount / (10**Money.getPrecision(currency as Currency))*100) / 100;
    return updatedAmount;
}

export function genUID(prefix: string, uidLen: number): string {
    const letters: string[] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const lettLen: number = letters.length;
    let uid: string = prefix + '_';

    // Генерация части ID на основе временной метки
    let tsPart: string[] = [];
    let now: number = Math.floor(Date.now() / 1000); // Unix timestamp в секундах
    while (now > 0) {
        const rem: number = now % lettLen;
        tsPart.unshift(letters[rem]);
        now = Math.floor(now / lettLen);
    }
    uid += tsPart.join('');

    // Генерация случайной части ID
    const randPartLen: number = uidLen - uid.length;
    if (randPartLen > 0) {
        let randPart: string[] = new Array(randPartLen);
        for (let i = 0; i < randPartLen; i++) {
            randPart[i] = letters[Math.floor(Math.random() * lettLen)];
        }
        uid += randPart.join('');
    }

    return uid;
}

