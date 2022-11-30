import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes

// hooks
import useAuth from '../../hooks/useAuth';
// import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  // const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  

  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required('Tên đăng nhập bắt buộc'),
    password: Yup.string().required('Mật khẩu bắt buộc'),
  });

  const defaultValues = {
    phone: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.phone, data.password);
    } catch (error) {
      console.error(error);
      console.log(error === 'Sai role')
      setError('afterSubmit', { ...error, message: error });
      reset();

      if (error.detail === 'Phone not correct!!! ') {
        setError('afterSubmit', { ...error, message: 'Tên đăng nhập không tồn tại' });
      } else if(error.detail === 'Password not correct!!! '){
        setError('afterSubmit', { ...error, message: 'Sai mật khẩu' });
      } else {
        setError('afterSubmit', { ...error, message: 'Tài khoản của bạn không phải admin' });
      }








      // if (isMountedRef.current) {
      //   setError('afterSubmit', { ...error, message: error.detail });
      // }
      
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="phone" label="Tên đăng nhập" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      

      <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
