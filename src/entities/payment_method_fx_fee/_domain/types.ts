export type PaymentMethodFxFeeEntity = {
      
  aggregator_id: string;
  payment_method_id?: string;
  currencies: string[];
  country_code: string;
  fee_prc: number;
  fee_fix: number;


  };