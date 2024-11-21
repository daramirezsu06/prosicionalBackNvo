export class CardUtils {
    static getCardType(cardNumber: string): string | null {
        // Remove all non-digit characters from the card number
        const sanitizedNumber = cardNumber.replace(/\D/g, '');

        // Card type regex patterns
        const cardPatterns = {
            visa: /^4\d{12}(\d{3})?$/,
            mastercard: /^(5[1-5]\d{14}|2(2[2-9][1-9]|[3-6]\d\d|7[0-1]\d|20)\d{12})$/,
            amex: /^3[47]\d{13}$/,
            discover: /^6(?:011|5\d{2}|22\d{1})\d{12}$/,
            diners: /^3(?:0[0-5]|[68]\d)\d{11}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
            maestro: /^(?:5[06-9]\d{4}|6\d{5})\d{8,15}$/,
            unionpay: /^62\d{14,17}$/
        };

        // Iterate over the card patterns and return the matching type
        for (const [cardType, pattern] of Object.entries(cardPatterns)) {
            if (pattern.test(sanitizedNumber)) {
                return cardType.charAt(0).toUpperCase() + cardType.slice(1); // Capitalize card type
            }
        }

        // Return null if no type matches
        return null;
    }
}
