'use client';

import PaymentMethodDetailForm from '@/components/Cards/PaymentMethodCard';

const PaymentMethodCard = ({ params }: { params: { id: string } }) => {




    return (

        <div className="flex flex-col gap-10 p-4 w-full">
            <PaymentMethodDetailForm pmId={params.id} />
        </div>

    );

};
export default PaymentMethodCard;