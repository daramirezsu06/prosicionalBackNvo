import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidCardNumberConstraint implements ValidatorConstraintInterface {
    validate(cardNumber: string, args: ValidationArguments) {
        return this.luhnCheck(cardNumber); // Check if the card number passes the Luhn algorithm
    }

    defaultMessage(args: ValidationArguments) {
        return 'Card number is invalid based on Luhn algorithm check';
    }

    private luhnCheck(cardNumber: string): boolean {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);

            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }
}

export function IsValidCardNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCardNumberConstraint,
        });
    };
}
