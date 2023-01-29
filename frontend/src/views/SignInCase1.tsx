import React , { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Stack } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthQuery } from "../api";
import { SignInInfo } from "../types";
import { useSnackbar } from "../utils/Snackbar"
import { MessageDialog, Sidebar } from "../components"

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

// const defaultValue = {
//     email: "",
// 	password: ""
// }

const theme = createTheme();

const SignInCase1:React.FC = () => {
    const { showSnackbar } = useSnackbar()
    const [open, setOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const text1 = "Send this password to Twitter @nagoya_cs_study by DM."
    const text2 = "Wait for system receiving password"

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
        query.postSignInCase1_1(data).then((response) => {
            if (response){
                setSelectedValue(response)
                setOpen(true);
            }else{
                showSnackbar('False!', 'error')
            }
        })
    };

    setInterval(function() {
        if (selectedValue){
            query.postSignInCase1_2().then((response) => {
                if (response){
                    showSnackbar('Success!', 'success')
                    setSelectedValue("")
                    setOpen(false);
                }else{
                    console.log(response)
                }
            })
        }}, 30000
    )

    const showPassword = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };


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
                Sign in (Case 0)
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
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            disabled={!selectedValue}
                            variant="contained"
                            onClick={showPassword}
                        >
                            Onetime Password
                        </Button>
                    </Grid>
                </Grid>
                <MessageDialog
                    open={open}
                    selectedValue={selectedValue}
                    text1={text1}
                    text2={text2}
                    onClose={handleClose}
                />
                </form>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </Stack>
            </Sidebar>
        </ThemeProvider>
    );
}

export default SignInCase1;
