import { dbClient } from "@/shared/lib/db";
import { UserEntity } from "../_domain/types";
import { convertDateStringToTimeStampInSeconds, convertTimeStampToLocaleDateString } from "@/shared/utils/commonUtils";
import logger from "@/shared/utils/logger";
import { decryptCBC, encryptCBC } from "@/shared/utils/security";

export class UserRepository {
    


    mapToUserType = (data: any): UserEntity =>{

        const userData = {


            id: data.id,
            name: decryptCBC(data.name),
            company_name: data.game.company ? data.game.company.name: undefined, 
            email: decryptCBC(data.email),
            country: data.country,
            game_id: data.game_id,
            player_id: data.player_id,
            avatar_url: data.avatar_url,
            banned: data.banned ? "yes" : "no",
            attributes: data.attributes,
            custom_attributes: data.custom_attributes,
            last_login_at: convertTimeStampToLocaleDateString(data.last_login_at),
            last_verified_at: convertTimeStampToLocaleDateString(data.last_verified_at),

            game_name: data.game? data.game.name : undefined,
            player_name: data.player? data.player.name : undefined,
            sub: data.sub,
            

            created_at: convertTimeStampToLocaleDateString(data.created_at),
            modified_at: convertTimeStampToLocaleDateString(data.modified_at),
            deleted_at: convertTimeStampToLocaleDateString(data.deleted_at),
            archived_at: convertTimeStampToLocaleDateString(data.archived_at),
            company_link: `${process.env.AGHANIM_DASHBOARD_URL}/company/${data.game.company_id}`,
            game_link: `${process.env.AGHANIM_DASHBOARD_URL}/company/${data.game.company_id}/${data.game_id}`,
            user_link: `${process.env.AGHANIM_DASHBOARD_URL}/company/${data.game.company_id}/${data.game_id}/game/players/${data.id}`


        }


        return userData
    }
    async getUserById(userId: string): Promise<UserEntity[]> {
        try{
            const rawData = await dbClient.aghanim_user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
                include: {
                    game: {select: 
                            {   
                                name: true,
                                company_id: true,
                                company: true   
                            }
                        }
                },
            });
            let data = [this.mapToUserType(rawData)];
            
            return data;
        }    catch(error: unknown)  {


            if (error instanceof Error){
                logger.error({
                        msg: `User Repository Error. Failed to retrieve User data for userId: ${userId}`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'User Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve User data for userId: ${userId}`);


        }
    }
    async getUsers(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data: UserEntity[], total: number}> {
        try{
            const skip = (page - 1) * pageSize;
            const take = pageSize;

                    
            const[rawData, total] = await Promise.all([
                dbClient.aghanim_user.findMany({
                    
                    skip: skip,
                    take: take,
                    where: whereCondition,
                    include: {
                        game: {select: 
                                {   
                                    name: true,
                                    company_id: true,
                                    company: true   
                                }
                            }
                    },
                    orderBy: {
                        created_at: 'desc', 
                      }
                }),
                dbClient.aghanim_user.count({
                    where: whereCondition,
                }),


            ])
            const data = rawData.map(this.mapToUserType)

            return {data, total };
        }catch (error: unknown){

            if (error instanceof Error){
                logger.error(
                    {
                        msg: `User Repository Error. Failed to retrieve User data for users`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'User Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve User data for users`);
        }
    
    }
    async getUsersByFilter(page: number, pageSize: number, filter: Record<string, any>): Promise<{ data: UserEntity[], total: number }>{
        const whereCondition: Record<string, any> = {};
        if (filter['selectedFields']){
            
            whereCondition["OR"] =  [{'id': {contains: filter['selectedFields'], mode:'insensitive'}},
                            {'name': {contains: encryptCBC(filter['selectedFields']), mode:'insensitive'}},
                            {'player_id': {contains: filter['selectedFields'], mode:'insensitive'}},
                            {'email': {contains: encryptCBC(filter['selectedFields']), mode:'insensitive'}}
                            ]
        }

        if (filter['dateRange'] && filter['dateRange'][0]){

            whereCondition['created_at'] = {
                gte: convertDateStringToTimeStampInSeconds(filter['dateRange'][0]), 
                lte: convertDateStringToTimeStampInSeconds(filter['dateRange'][1], 'T23:59:59Z') , 
            };
        }

        if (filter['last_login_at'] && filter['last_login_at'][0]){

            whereCondition['last_login_at'] = {
                gte: convertDateStringToTimeStampInSeconds(filter['last_login_at'][0]), 
                lte: convertDateStringToTimeStampInSeconds(filter['last_login_at'][1], 'T23:59:59Z') , 
            };
        }

        return this.getUsers(page, pageSize, whereCondition);
        
        

    }

    
}

export const userRepository = new UserRepository();