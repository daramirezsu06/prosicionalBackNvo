export interface PaymentMethodDTO  {
    id: number;
    cardHolderName: string;
    cardNumber: string;
    expiryDate: Date;
    cvc: string;     
    billingAddress:string;       
    isDefault: boolean;
    createdAt: Date;
    updatedAt?: Date;
};
