import React, { useState } from 'react'
import { FormControl, InputLabel, FilledInput, Button, Typography, Box } from '@mui/material';
import { ProjectModel } from '../../../models';
import ProjectMemberAdd from '../ProjectMemberAdd';
import ProjectMemberList from '../ProjectMemberList';
import { useNavigate } from "react-router-dom";

type Props = {
    projects: ProjectModel.Project[],
    handleAddProject: (project: ProjectModel.Project) => void
}

function ProjectAdd({ projects, handleAddProject }: Props) {
    const [name, setName] = useState<string>('')
    const [members, setMembers] = useState<ProjectModel.Member[]>([])
    const navigate = useNavigate();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleUpdateMembers = (members: ProjectModel.Member[]) => {
        setMembers(members)
    }

    const createProject = () => {
        if (name !== '' && members.length > 1) {
            handleAddProject({
                id: projects.length,
                name,
                members,
                invoices: [],
                bills: [],
                phase: ProjectModel.ProjectPhase.BILLING
            })
            navigate('/split-bill')
        }
    }

    return (
        <div>
            <Typography variant="h2" sx={{ fontSize: 18 }}>Create project</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 2,
                    gap: 2
                }}
            >
                <Box
                    sx={{
                        '& > :not(style)': { width: '50ch' },
                    }}
                >
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <FilledInput
                            id="name"
                            value={name}
                            placeholder='Bomb ass tacos'
                            onChange={handleChangeName}
                        />
                    </FormControl>
                </Box>
                <ProjectMemberAdd members={members} handleUpdateMembers={handleUpdateMembers} />
                <ProjectMemberList rows={members} handleUpdateMembers={handleUpdateMembers} />
                <Box
                    sx={{
                        '& > :not(style)': { width: '50ch' },
                    }}
                >
                    <Button variant='contained' onClick={createProject} disabled={members.length < 2}>Create</Button>
                </Box>
            </Box>
        </div>
    )
}

export default ProjectAdd
