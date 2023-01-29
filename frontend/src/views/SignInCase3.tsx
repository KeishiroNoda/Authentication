import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container, Stack, Dialog, DialogTitle } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthQuery } from "../api";
import { SignInInfo } from "../types";
import { useSnackbar } from "../utils/Snackbar"
import { Sidebar } from "../components"

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

const defaultPosition = { latitude: 0, longitude: 0 }


const theme = createTheme();

const SignInCase3:React.FC = () => {
    const { showSnackbar } = useSnackbar();
    const [position, setPosition] = useState(defaultPosition);
    const [open, setOpen] = useState<boolean>(true);

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
        query.postSignInCase3_2(data, position.latitude, position.longitude).then((response) => {
            if (response){
                showSnackbar('Success!', 'success')
            }else{
                showSnackbar('False!', 'error')
            }
        })
    };

    setInterval(function(){
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setPosition({ latitude, longitude });
            });
            console.log(position)
            if (position === defaultPosition){
                setOpen(true)
            }else{
                setOpen(false)
            }
    }, 10000)



    return (
        <ThemeProvider theme={theme}>
            <Sidebar>
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
                Sign in (Case 2)
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
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Loading..."}
                    </DialogTitle>
                </Dialog>
                </form>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </Stack>
            </Sidebar>
        </ThemeProvider>
    );
}

export default SignInCase3;
