import React, { useState } from 'react'
import { FormControl, InputLabel, FilledInput, Button, Typography, Box } from '@mui/material';
import { ProjectModel } from '../../../models';

type Props = {
    members: ProjectModel.Member[],
    handleUpdateMembers: (members: ProjectModel.Member[]) => void
}

function ProjectMemberAdd({ members, handleUpdateMembers }: Props) {
    const [name, setName] = useState<string>('')
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const addMember = (member: ProjectModel.Member) => {
        handleUpdateMembers([...members, member])
        setName('')
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        '& > :not(style)': { width: '50ch' },
                    }}
                >
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="name">Member</InputLabel>
                        <FilledInput
                            id="member-name"
                            value={name}
                            placeholder='Member name'
                            onChange={handleChangeName}
                        />
                    </FormControl>
                </Box>
                <Button variant='contained' onClick={() => addMember({
                    name: name
                })}>Add</Button>
            </Box>
        </div>
    )
}

export default ProjectMemberAdd
