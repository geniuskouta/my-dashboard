import { useEffect, useState } from 'react'
import SplitBillAdd from '../SplitBillAdd';
import { Typography } from '@mui/material';
import SplitBillList from '../SplitBillList';
import { ProjectModel } from '../../../models';
import SplitBillResult from '../SplitBillResult';

type Props = {
    project: ProjectModel.Project
    handleSetCurrentProject: (project: ProjectModel.Project) => void
}

function SplitBill({ project, handleSetCurrentProject }: Props) {
    const [bills, setBills] = useState<ProjectModel.Bill[]>(project.bills);
    const [invoices, setInvoices] = useState<ProjectModel.Invoice[]>(project.invoices);

    const handleAddBill = (bill: ProjectModel.Bill) => {
        setBills([
            bill,
            ...bills
        ])
    }

    const handleRemoveBill = (billIndex: number) => {
        const newBills = bills.filter((_, index) => index !== billIndex);
        setBills(newBills)
    }

    const getTotalAmountByMember = (bills: ProjectModel.Bill[], payer: string) => {
        let total = 0;
        bills.forEach(bill => {
            if (bill.payer === payer) {
                total += bill.amount
            }
        })
        return total;
    }

    const handleUpdateInvoices = (bills: ProjectModel.Bill[], members: ProjectModel.Member[]) => {
        const totalAmountList = members.map(member => {
            return {
                name: member.name,
                totalAmount: getTotalAmountByMember(bills, member.name)
            };
        })
        totalAmountList.sort((a, b) => b.totalAmount - a.totalAmount);
        const invoices: ProjectModel.Invoice[] = []
        totalAmountList.map((item, index) => {
            totalAmountList.slice(index + 1).forEach((otherMember) => {
                if (item.totalAmount > otherMember.totalAmount) {
                    invoices.push({
                        payer: otherMember.name,
                        payee: item.name,
                        amount: Math.floor((item.totalAmount - otherMember.totalAmount) / totalAmountList.length),
                        paid: false
                    })
                }
            })
        })
        setInvoices(invoices);
    }

    const handleToggleInvoicePaid = (invoiceIndex: number) => {
        const newInvoices = invoices.map((item, index) => {
            if (index === invoiceIndex) {
                return {
                    ...item,
                    paid: !item.paid
                }
            }
            return item
        })
        setInvoices(newInvoices)
    }

    const handleUpdatePhase = (phase: ProjectModel.ProjectPhase) => {
        handleSetCurrentProject({
            ...project,
            phase: phase
        })
    }

    useEffect(() => {
        if(project.phase === ProjectModel.ProjectPhase.BILLING) {
            handleUpdateInvoices(bills, project.members);
        }
    }, [bills, project.members]);

    useEffect(() => {
        handleSetCurrentProject({
            ...project,
            bills,
            invoices
        })
    }, [invoices, bills])

    return (
        <>
            <Typography variant="h1" sx={{ fontSize: 24 }}>{project.name}</Typography>
            {
                project.phase === ProjectModel.ProjectPhase.BILLING &&
                <SplitBillAdd handleAddBill={handleAddBill} members={project.members} />
            }
            <SplitBillResult invoices={invoices} phase={project.phase} handleUpdatePhase={handleUpdatePhase} handleToggleInvoicePaid={handleToggleInvoicePaid} />
            <SplitBillList rows={bills} handleRemoveBill={handleRemoveBill} phase={project.phase} />
        </>
    )
}

export default SplitBill
