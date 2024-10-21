export type PaymentMethodFeeEntity = {
      
    id: number;
    payment_method_id: string;    
    fee_prc: number;
    fee_fix: number;
    country_code: string;
    min_amount: number;

  };