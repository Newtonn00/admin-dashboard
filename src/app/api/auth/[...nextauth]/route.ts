import NextAuth from "next-auth"
import { nextAuthConfig } from '@/entities/session/next-auth-config'
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import logger from '@/shared/utils/logger';

const handler = (request: NextRequest, response: NextResponse) => {
    const errorDescription = request.nextUrl.searchParams.get("error_description");
  
    if (errorDescription && errorDescription.includes('Forbidden')) {

      const url = request.nextUrl.clone();
      logger.error(errorDescription);
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
    
    return NextAuth(request as unknown as NextApiRequest, response as unknown as NextApiResponse, nextAuthConfig); 
  };
export { handler as GET, handler as POST }