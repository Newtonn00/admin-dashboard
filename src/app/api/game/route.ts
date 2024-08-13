import { NextRequest, NextResponse } from 'next/server';
import { gameRepository } from '@/entities/game/_repositories/game';

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const filterString = String(searchParams.get('filter'));

    let filter: Record<string, any> = {};
    if (filterString){
        try{
            filter = JSON.parse(filterString);
        } catch(error){
            return NextResponse.json({ error: 'Invalid json parametr' }, { status: 400 });

        }

    }

    try {
        let data, total;

        ({ data, total } = await gameRepository.getGamesByFilter(page, pageSize, filter))
        

        return NextResponse.json({ data, total });
    } catch (error) {
        console.error('Error loading companies', error);
        return NextResponse.json({ error: 'Failed to load companies' }, { status: 500 });
    }
}
