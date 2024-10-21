import { PaymentMethodFxFeeEntity } from "@/entities/payment_method_fx_fee/_domain/types";
import { PaymentMethodTaxFeeEntity } from "@/entities/payment_method_tax_fee/_domain/types";

export type AggregatorEntity = {
      
    id: string;
    name: string;    
    fx_fee?: PaymentMethodFxFeeEntity[];
    tax_fee?: PaymentMethodTaxFeeEntity[];

    [key: string]: any;

  };