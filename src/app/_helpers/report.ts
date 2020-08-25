export interface Report {
    accountId: string;
    accountName: string;
    accountOwner: string;
    accountRecordType: string;
    accountCurrency: string;
    phone: string;
    website: string;
    billingAddress: string;
    billingCountry: string;
    shippingAddress: string;
    territory: string;
    industry: string;
    annualRevenue: number;
    createdDate: Date;
    lastModifiedDate: Date;
}
