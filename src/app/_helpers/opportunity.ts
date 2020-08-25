import { last } from 'rxjs/operators';

export class Opportunity {
    constructor(
        opportunityId: string,
        opportunityName: string,
        opportunityOwner: string,
        accountName: string,
        type: string,
        amount: number,
        stage: string,
        expectedRevenue: number,
        closeDate: Date,
        contract: string,
        opportunityCurrency: number,
        forecastCategory: string,
        orderId: string,
        territory: string,
        currencyiso: string,
        createdDate: Date,
        lastModifiedDate: Date
    ) {
        this.opportunityId = opportunityId;
        this.opportunityName = opportunityName;
        this.opportunityOwner = opportunityOwner;
        this.accountName = accountName;
        this.type = type;
        this.amount = amount;
        this.stage = stage;
        this.expectedRevenue = expectedRevenue;
        this.closeDate = closeDate;
        this.contract = contract;
        this.opportunityCurrency = opportunityCurrency;
        this.forecastCategory = forecastCategory;
        this.orderId = orderId;
        this.territory = territory;
        this.currencyiso = currencyiso;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;

    }
    opportunityId: string;
    opportunityName: string;
    opportunityOwner: string;
    accountName: string;
    type: string;
    amount: number;
    stage: string;
    expectedRevenue: number;
    closeDate: Date;
    contract: string;
    opportunityCurrency: number;
    forecastCategory: string;
    orderId: string;
    territory: string;
    currencyiso: string;
    createdDate: Date;
    lastModifiedDate: Date
}
