import { TableBody, TableHead, TableRow, TableCell, TableContainer, Table, Paper, Link as UiLink } from '@mui/material';
import { ProjectModel } from '../../../models';
import { useNavigate } from "react-router-dom";

type Props = {
    rows: ProjectModel.Project[],
    handleSelectProject: (projectId: number) => void
}

function ProjectList({ rows, handleSelectProject }: Props) {
    const navigate = useNavigate();

    const getMembers = (project: ProjectModel.Project) => {
        return project.members.map(item => {
            return item.name
        }).join(', ')
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '50ch' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Members</TableCell>
                        <TableCell >Phase</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"
                                onClick={() => {
                                    handleSelectProject(row.id)
                                    navigate('/split-bill')
                                }}
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <UiLink>
                                    {row.name}
                                </UiLink>
                            </TableCell>
                            <TableCell>
                                {getMembers(row)}
                            </TableCell>
                            <TableCell>
                                {row.phase}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectList
