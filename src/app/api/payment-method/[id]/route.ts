import { NextRequest, NextResponse } from 'next/server';
import { paymentMethodRepository } from '@/entities/payment_method/_repositories/paymentMethod';
import logger from '@/shared/utils/logger';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {

        const data = await paymentMethodRepository.getPaymentMethodById(params.id);
                console.log(
            JSON.stringify(data, (key, value) =>
              typeof value === 'bigint' ? value.toString() : value
            )
          );
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
