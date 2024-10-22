import { NextRequest, NextResponse } from 'next/server';
import { aggregatorRepository } from '@/entities/aggregator/_repositories/aggregator';
import logger from '@/shared/utils/logger';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {

        const data = await aggregatorRepository.getRecordById(params.id);

        return NextResponse.json({success: true, data });
    } catch (error) {

        if (error instanceof Error) {
            logger.error({
                msg: `Aggregator API Error. Payment Method ${params.id} loading error`,
                error: error.message,
                stack: error.stack,
            });
            return NextResponse.json({ success: false, message: `Aggregator API Error. Aggregator ${params.id} loading error`}, { status: 500 });

        } else{
                logger.error({msg: 'Aggregator API Error. An unknown error occurred'});
                return NextResponse.json({ success: false, message: 'Aggregator API Error. An unknown error occurred' }, { status: 500 });
        }

    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    try{
        const data = await request.json();

        const updatedData = await aggregatorRepository.updateRecord(data)
        return NextResponse.json({success: true, returnedData: updatedData, message: 'Aggregator API. Data saved'}, { status: 200 });

    }catch(error: unknown){
        if (error instanceof Error) {
            logger.error({
                msg: 'Aggregator API Error. Data saving error',
                error: error.message,
                stack: error.stack,
            });
            return NextResponse.json({ success: false, message: 'Aggregator API Error. Data saving error'}, { status: 500 });

        }
        else{
            logger.error('Aggregator API Error. An unknown error occurred');
            return NextResponse.json({ success: false, message: 'Aggregator API Error. An unknown error occurred' }, { status: 500 });
        }
    }      
}
