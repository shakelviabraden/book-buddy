import React from "react";
import { useState } from "react";

import {
    Box,
    Paper,
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    TextField,
    Typography,
    Button
} from "@mui/material";
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

export const AuthForm = (props) => {
    const { location } = props

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        e.preventDefault()
    }

    return (
        <Box sx={{padding: 5}}>
        <Paper elevation={3} sx={{height: 'auto', width: 300, margin: 'auto', padding: 5}}>
            <Typography sx={{textTransform: "capitalize", textAlign: 'center', fontSize: 40}}>{location}</Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
                >
                {location === 'register' ? 
                <>
                <Box>
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleFormChange}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleFormChange}
                    />
                </Box>
                </> : null}
                <Box>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                </Box>
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                </FormControl>
                <Box sx={{marginTop: 2, display: 'flex', justifyContent: 'center'}}>
                <Button onClick={handleSubmit} variant="outlined">{location}</Button>
                </Box>
            </Box>
        </Paper>
        </Box>
    )
}