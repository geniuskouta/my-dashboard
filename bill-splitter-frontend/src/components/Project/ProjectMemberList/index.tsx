import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import { ProjectModel } from '../../../models';

type Props = {
    rows: ProjectModel.Member[],
    handleUpdateMembers: (embers: ProjectModel.Member[]) => void
}


function ProjectMemberList({ rows, handleUpdateMembers }: Props) {

    const handleRemoveMember = (memberIndex: number) => {
        const newMembers = rows.filter((_, index) => index !== memberIndex);
        handleUpdateMembers(newMembers)
    }

    return (
        <Box sx={{
            '& > :not(style)': { width: '50ch' },
        }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '50ch' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
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
                                <TableCell align="center">
                                    <IconButton onClick={() => handleRemoveMember(rowIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}

export default ProjectMemberList;
