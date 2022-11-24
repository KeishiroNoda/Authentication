import React , { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Stack } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthQuery } from "../api";
import { SignInInfo } from "../types";
import { useSnackbar } from "../utils/Snackbar"

const query = new AuthQuery();

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn:React.FC = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar()

    const {
        control,
        handleSubmit,
    } = useForm<SignInInfo>()

    const validationRules = {
        email: {
            required: { value:true, message: 'emailアドレスを入力してください。'}
        },
        password: {
            required: { value:true, message: 'パスワードを入力してください。'},
            minLength: { value: 4, message: '4文字以上で入力してください。' }
        }
    }

    const onSubmit: SubmitHandler<SignInInfo> = (data:SignInInfo) => {
        query.postSignIn(data)
            .then((response) => {
                if (response){
                    showSnackbar('Success!', 'success')
                }else{
                    showSnackbar('False!', 'error')
                }
            })
    };

    const moveToSignUp = () => {
        navigate(`/signup`)
    };

    const moveToList = () => {
        navigate(`/signlist`)
    };

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2} sx={{ width: '100%' }}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={validationRules.email}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            type="email"
                            name="email"
                            autoComplete="email"
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            autoFocus
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={validationRules.password}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link onClick={moveToSignUp} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link onClick={moveToList} variant="body2">
                        {"Account list for developper"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </Stack>
        </ThemeProvider>
    );
}

export default SignIn;