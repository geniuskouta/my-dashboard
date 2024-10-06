export type Project = {
    id: number,
    name: string,
    members: Member[],
    bills: Bill[],
    invoices: Invoice[],
    phase: ProjectPhase
}

export enum ProjectPhase {
    BILLING = 'billing',
    INVOICED = 'invoiced',
    COMPLETE = 'complete'
}

export type Bill = {
    name: string,
    amount: number,
    payer: string
}

export type Member = {
    name: string
}

export type Invoice = {
    payer: string,
    payee: string,
    amount: number,
    paid: boolean
}
