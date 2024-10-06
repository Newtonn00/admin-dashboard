'use client';

import AggregatorDetailForm from '@/components/Cards/AggregatorCard';

const AggregatorCard = ({ params }: { params: { id: string } }) => {




    return (

        <div className="flex flex-col gap-10 p-4 w-full">
            <AggregatorDetailForm aggId={params.id} />
        </div>

    );

};
export default AggregatorCard;