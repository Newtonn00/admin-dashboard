

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

    protected async handleDatabaseOperation<U>(operation: () => Promise<U>, operationName?: string): Promise<U> {
        try {
            return await operation();
        } catch (error) {
        if (error instanceof Error) {
            this.logger.error({
            msg: `${this.entityName} Repository Error. Failed to retrieve ${this.entityName} data`,
            error: error.message,
            stack: error.stack,
            });
            
        } else {
            this.logger.error(`${this.entityName} Repository Error. An unknown error occurred`);
        }
        throw new Error(`Failed to retrieve ${this.entityName} data`);
        }
    }

}