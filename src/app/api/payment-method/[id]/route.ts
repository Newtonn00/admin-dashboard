import { NextRequest, NextResponse } from 'next/server';
import { paymentMethodRepository } from '@/entities/payment_method/_repositories/paymentMethod';
import logger from '@/shared/utils/logger';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {

        const data = await paymentMethodRepository.getRecordById(params.id);
        return NextResponse.json({success: true, data });
    } catch (error) {

        if (error instanceof Error) {
            logger.error({
                msg: `Payment Method API Error. Payment Method ${params.id} loading error`,
                error: error.message,
                stack: error.stack,
            });
            return NextResponse.json({ success: false, message: `Customer API Error. Payment Method ${params.id} loading error`}, { status: 500 });

        } else{
                logger.error({msg: 'Payment Method API Error. An unknown error occurred'});
                return NextResponse.json({ success: false, message: 'Payment Method API Error. An unknown error occurred' }, { status: 500 });
        }

    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    try{
        const data = await request.json();

        const updatedData = await paymentMethodRepository.updateRecord(data)
        return NextResponse.json({success: true, returnedData: updatedData, message: 'Payment Method API. Data saved'}, { status: 200 });

    }catch(error: unknown){
        if (error instanceof Error) {
            logger.error({
                msg: 'Payment Method API Error. Data saving error',
                error: error.message,
                stack: error.stack,
            });
            return NextResponse.json({ success: false, message: 'Payment Method API Error. Data saving error'}, { status: 500 });

        }
        else{
            logger.error('Payment Method API Error. An unknown error occurred');
            return NextResponse.json({ success: false, message: 'Payment Method API Error. An unknown error occurred' }, { status: 500 });
        }
    }      
}
