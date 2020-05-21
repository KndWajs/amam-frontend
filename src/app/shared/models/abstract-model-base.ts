export class AbstractModelBase {
    id: number;

    userName: string;

    creationDate: Date;

    updateDate: Date;

    constructor(obj: any) {
        this.id = obj.id;
        this.userName = obj.userName;
        this.creationDate = obj.creationDate;
        this.updateDate = obj.updateDate;
    }
}
