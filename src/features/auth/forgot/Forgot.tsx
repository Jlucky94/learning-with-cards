import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "app/store";
import {forgotTC} from "../authSlice";
import {Link} from "react-router-dom";
import {Button, Container, FormGroup, Paper, TextField, Typography} from "@mui/material";
import classes from "features/auth/login/Login.module.css";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotSchema} from "common/utils/yupResolvers/yupResolvers";

export type ForgotFormData = {
    email: string
    password: string
    passwordConfirmation: string
};

const Forgot = () => {

        const dispatch = useAppDispatch()

        const {
            control,
            handleSubmit,
            formState: {errors},
        } = useForm<ForgotFormData>({resolver: yupResolver(forgotSchema)})

        const onSubmit = handleSubmit(data => {
            dispatch(forgotTC({email: data.email}))
        });


        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form onSubmit={onSubmit}>
                            <h2>Forgot your password?</h2>
                            {/*<FormControl sx={{width: '100%'}}>*/}
                            <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                                <Controller
                                    control={control}
                                    name={'email'}
                                    render={({field}) => (
                                        <TextField
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            variant={'outlined'}
                                            label={'Email'}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e)}
                                        />)
                                    }/>
                                <Typography component={'span'} sx={{opacity: 0.5}}>
                                    Enter your email address and we will send you further instructions
                                </Typography>
                                <Button type="submit" variant={'contained'}>
                                    Send Instructions
                                </Button>
                                <div>
                                    Did you remember your password?
                                </div>
                                <Link to={'/login'}>
                                    Try To Sign In
                                </Link>
                            </FormGroup>
                            {/*</FormControl>*/}
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Forgot;