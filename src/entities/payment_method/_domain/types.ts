export type PaymentMethodEntity = {
      
    id: string;
    name: string;    
    rank: number;
    show: string;
    supported_countries: string;
    aggregator_id: string;
    aggregator_name?: string;
    caption: string;
    logo_url: string;
    dashboard_show: string;
    supported_currencies: string;
    fee?: [];
    fx_fee?: [];
    tax_fee?: [];
    dispute_fee?: [];
    game_settings?: [];

    [key: string]: any;

  };