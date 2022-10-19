import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { AuthQuery } from "../api";
import { SignUpInfo } from "../types";

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

export default function SignUp() {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
    } = useForm<SignUpInfo>()

    const validationRules = {
        email: {
            required: { value:true, message: 'emailアドレスを入力してください。'}
        },
        password: {
            required: { value:true, message: 'パスワードを入力してください。'},
            minLength: { value: 4, message: '4文字以上で入力してください。' }
        },
        firstName: {
            required: { value:true, message: '名を入力してください'}
        },
        lastName: {
            required: { value:true, message: '性を入力してください。'}
        },
    }

    const onSubmit: SubmitHandler<SignUpInfo> = (data:SignUpInfo) => {
        console.log(query.postSignUp(data))
    };

    const moveToSignIn = () => {
        navigate(`/signin`)
    };

    return (
        <ThemeProvider theme={theme}>
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
                Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={validationRules.firstName}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={validationRules.lastName}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={validationRules.email}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link onClick={moveToSignIn} variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                </form>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}