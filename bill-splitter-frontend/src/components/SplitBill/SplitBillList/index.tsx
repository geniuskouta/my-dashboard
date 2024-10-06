import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { ProjectModel } from '../../../models';

type Props = {
    rows: ProjectModel.Bill[],
    handleRemoveBill: (billIndex: number) => void,
    phase: ProjectModel.ProjectPhase
}


function SplitBillList({ rows, phase, handleRemoveBill }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '50ch' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Amount&nbsp;(¥)</TableCell>
                        <TableCell align="center">Payer</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="center">{row.payer}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleRemoveBill(rowIndex)} disabled={phase !== ProjectModel.ProjectPhase.BILLING}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SplitBillList;
