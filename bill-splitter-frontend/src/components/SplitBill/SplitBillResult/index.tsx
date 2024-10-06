import { Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ProjectModel } from '../../../models';

type Props = {
    invoices: ProjectModel.Invoice[]
    phase: ProjectModel.ProjectPhase,
    handleUpdatePhase: (phase: ProjectModel.ProjectPhase) => void,
    handleToggleInvoicePaid: (invoiceIndex: number) => void
}

function SplitBillResult({ phase, invoices, handleUpdatePhase, handleToggleInvoicePaid }: Props) {


    const updatePhase = () => {
        switch(phase) {
            case ProjectModel.ProjectPhase.BILLING:
                handleUpdatePhase(ProjectModel.ProjectPhase.INVOICED)
                return
            case ProjectModel.ProjectPhase.INVOICED:
                handleUpdatePhase(ProjectModel.ProjectPhase.COMPLETE)
                return
            default:
                return
        }
    }

    return (
        <>
            <List sx={{ width: '100%' }}>
                {invoices.map((item, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <ListItem
                            key={index}
                            disableGutters
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        onChange={() => handleToggleInvoicePaid(index)}
                                        edge="start"
                                        checked={item.paid}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        disabled={phase !== ProjectModel.ProjectPhase.INVOICED}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`${item.payer} owes ${item.payee} ¥${item.amount}`} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Button onClick={updatePhase} disabled={phase === ProjectModel.ProjectPhase.COMPLETE}>
                {
                    phase === ProjectModel.ProjectPhase.BILLING ? 'Finalize the bills to invoice' :
                    phase === ProjectModel.ProjectPhase.INVOICED ? 'Finalize the billing project' :
                    'Completed' 
                }
            </Button>
        </>
    );
}

export default SplitBillResult;
