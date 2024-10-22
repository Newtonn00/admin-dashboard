import { PaymentDisputeFeeEntity } from '@/entities/payment_dispute_fee/_domain/types';
import {PaymentMethodFeeEntity} from '@/entities/payment_method_fee/_domain/types'
import {PaymentMethodFxFeeEntity} from '@/entities/payment_method_fx_fee/_domain/types'
import { PaymentMethodGameSettingsEntity } from '@/entities/payment_method_game_settings/_domain/types';
import { PaymentMethodTaxFeeEntity } from '@/entities/payment_method_tax_fee/_domain/types';


export type PaymentMethodEntity = {
      
    id: string;
    name: string;    
    rank: number;
    show: boolean;
    supported_countries: string;
    aggregator_id: string;
    aggregator_name?: string;
    caption: string;
    logo_url: string;
    dashboard_show: boolean;
    supported_currencies: string;
    fee?: PaymentMethodFeeEntity[];
    fx_fee?: PaymentMethodFxFeeEntity[];
    tax_fee?: PaymentMethodTaxFeeEntity[];
    dispute_fee?: PaymentDisputeFeeEntity[];
    game_settings?: PaymentMethodGameSettingsEntity[];

    [key: string]: any;

  };