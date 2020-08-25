export interface Orders {
    orderId: string;
    account: string;
    accountId: string;
    billingAddress: string;
    estimatedInstallDate: Date;
    owner: string;
    shippingAddress: string;
    status: string;
    type: string;
    notestoOrders: string;
    paymentTerms: string;
    soldtoContact: string;
    opportunityName: string;
    opportunityId: string;
    currencyiso: string;
    createdDate: Date;
    lastModifiedDate: Date;
    orderNumber: string;
    orderAmount: number;
    ordersCount: number;
    pageOptions: {};
}

export interface OrderItem {
    orderItemsId: string;
    listPrice: number;
    orderId: string;
    productName: string;
    quantity: 1;
    totalPrice: number;
    unitPrice: number;
    discount: number;
    productFamily: string;
}
