type OperationType='update'|'read'|'delete'|'create'


export abstract class BaseRepository<T> {
    protected entityName: string;
    protected logger: any;
    constructor(entityName: string, loggerInstance: any) {
        this.entityName = entityName;
        this.logger = loggerInstance;
    }

    abstract getRecordById(id: string): Promise<T>;
    abstract getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:T[], total:number}>;

    abstract updateRecord(data: Record<string, any>): Promise<T>;

    abstract createRecord(data: Record<string, any>): Promise<T>;

    abstract getFilter(filter: Record<string, any>): string;

    abstract mapToDataType(data: any): T;

    protected async handleDatabaseOperation<U>(operation: () => Promise<U>, operationName: OperationType, changedData?: Record<string, any> ): Promise<U> {
        try {

            if (['update'].includes(operationName)) {
                this.logger.info({ msg: `Entity ${this.entityName} operation ${operationName} data`,changedData, user: changedData ? changedData.user ?  changedData.user: 'undefined' :'undefined' });
                
            }
            return await operation();

        } catch (error) {
        if (error instanceof Error) {
            this.logger.error({
            msg: `${this.entityName} Repository Error. Failed to process ${this.entityName} data during ${operationName} operaton`,
            error: error.message,
            stack: error.stack,
            });
            
        } else {
            this.logger.error(`${this.entityName} Repository Error during ${operationName} operaton. An unknown error occurred`);
        }
        throw new Error(`Failed to process ${this.entityName} data during ${operationName} operaton`);
        }
    }

}