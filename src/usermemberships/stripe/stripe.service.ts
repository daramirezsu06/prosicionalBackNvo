// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('your-stripe-secret-key', {
      apiVersion: '2024-06-20', // or the latest version you're using
    });
  }

  // Method to charge the user
  async charge(amount: number, paymentMethodId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe accepts amounts in cents
        currency: 'usd', // Set your currency
        payment_method: paymentMethodId,
        confirm: true, // Immediately confirm the payment
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  }

  // Method to retrieve a customer's default payment method
  async getDefaultPaymentMethod(customerId: string) {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods.data.find(pm => pm.card);
    } catch (error) {
      throw new Error(`Failed to retrieve payment method: ${error.message}`);
    }
  }

  // Additional methods can be added for handling other Stripe operations
}
