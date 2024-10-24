import { NextRequest, NextResponse } from 'next/server';
import { paymentMethodRepository } from '@/entities/payment_method/_repositories/paymentMethod';
import logger from '@/shared/utils/logger';

export async function GET(request: NextRequest) {


    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const filterString = searchParams.get('filter');

    if (isNaN(page) || isNaN(pageSize)) {

        logger.error({
            msg: 'Payment Method API Error. Invalid page or pageSize parameter',
        });
        return NextResponse.json({ success: false, error: 'Invalid page or pageSize parameter' }, { status: 400 });
    }

    let filter: Record<string, any> = {};
    if (filterString){
        try{
            filter = JSON.parse(filterString);
        } catch(error){

            if (error instanceof Error) {
                logger.error({
                    msg: 'Payment Method API Error. Invalid json string',
                    error: error.message,
                    stack: error.stack,
                });
                return NextResponse.json({ success: false, message: 'Payment Method API Error. Invalid json string' }, { status: 400 });

            }
            else{
                logger.error({msg: 'Payment Method API Error. An unknown error occurred'});
                return NextResponse.json({ success: false, message: 'Payment Method API Error. An unknown error occurred' }, { status: 500 });
            }

        }

    }

    try {

        let data, total;
 

        ({data, total} = await paymentMethodRepository.getByFilter(page, pageSize, filter));
        // console.log(
        //     JSON.stringify(data, (key, value) =>
        //         typeof value === 'bigint' ? value.toString() : value
        //     )
        // );

        return NextResponse.json({success: true, data, total });
    } catch (error) {

        if (error instanceof Error) {
            logger.error({
                msg: 'Payment Method API Error. Payment Methods loading error',
                error: error.message,
                stack: error.stack,
            });
            return NextResponse.json({ success: false, message: 'Payment Method API Error. Payment Methods loading error'}, { status: 500 });

        } else{
                logger.error({msg: 'Payment Method API Error. An unknown error occurred'});
                return NextResponse.json({ success: false, message: 'Payment Method API Error. An unknown error occurred' }, { status: 500 });
        }

    }
}
