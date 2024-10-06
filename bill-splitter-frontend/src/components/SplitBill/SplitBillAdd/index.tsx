import React, { useState } from 'react'
import { FormControl, InputLabel, InputAdornment, FilledInput, Button, Typography, Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ProjectModel } from '../../../models';

type Props = {
    handleAddBill: (bill: ProjectModel.Bill) => void,
    members: ProjectModel.Member[]
}

function SplitBillAdd({ handleAddBill, members }: Props) {
    const [name, setName] = useState('')
    const [payer, setPayer] = useState('')
    const [amount, setAmount] = useState(0)

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value))
    }

    const handleChangePayer = (event: SelectChangeEvent<string>) => {
        setPayer(event.target.value)
    }

    const saveBill = () => {

        if (name !== '' && amount !== 0) {
            handleAddBill({ name, amount, payer });
            setName('');
            setAmount(0);
        }

    }

    return (
        <div>
            <Typography variant="h2" sx={{ fontSize: 18 }}>Add your bill</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexWrap: 'wrap',
                    gap: 2,
                    marginTop: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        gap: 2,
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
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="amount">Amount</InputLabel>
                        <FilledInput
                            id="amount"
                            value={amount === 0 ? '' : amount}
                            startAdornment={<InputAdornment position="start">¥</InputAdornment>}
                            onChange={handleChangeAmount}
                            type='number'
                        />
                    </FormControl>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="person-name">Who paid</InputLabel>
                        <Select
                            labelId="person-name"
                            id="person-name"
                            value={payer}
                            label="Age"
                            onChange={handleChangePayer}
                        >
                            {members.map((item) => {
                                return <MenuItem value={item.name}>{item.name}</MenuItem>    
                            })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Button variant='contained' onClick={saveBill}>Add</Button>
            </Box>
        </div>
    )
}

export default SplitBillAdd
