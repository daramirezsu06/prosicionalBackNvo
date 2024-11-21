import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import moment from 'moment'; 

@ValidatorConstraint({ async: false })
export class IsCardExpiryDateConstraint implements ValidatorConstraintInterface {
    validate(expiryDate: string, args: ValidationArguments) {
        const currentDate = moment();
        const expiryMoment = moment(expiryDate, 'MM/YYYY', true);
        
        // Ensure it's a valid date and not in the past
        return expiryMoment.isValid() && expiryMoment.isAfter(currentDate, 'month');
    }

    defaultMessage(args: ValidationArguments) {
        return 'Expiry date must be a valid future date in MM/YYYY format';
    }
}

export function IsCardExpiryDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCardExpiryDateConstraint,
        });
    };
}
