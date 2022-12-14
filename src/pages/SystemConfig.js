// component
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Page from '../components/Page';
import { api, common } from '../constants';
import { PATH_DASHBOARD } from '../routes/paths';


// const formData = new FormData();


const schema = yup.object({

  earn_by_like: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  earn_by_match: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  earn_by_share: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  exchange_rate: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  like_daily_limit: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  score_of_job_position: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  score_of_skill: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  score_of_working_style: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  share_daily_limit: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),
  upgrade: yup.number().typeError('Vui lòng nhập số').required('*Vui lòng nhập số'),

});

export default function SystemConfig() {

  const [disabled, setDisabled] = useState(true);
  const [showButtonEdit, setShowButtonEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [severity, setSeverity] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);



  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      earn_by_like: '',
      earn_by_match: '',
      earn_by_share: '',
      exchange_rate: '',
      like_daily_limit: '',
      share_daily_limit: '',
      score_of_job_position: '',
      score_of_skill: '',
      score_of_working_style: '',
      upgrade: ''
    }
  });



  useEffect(() => {

    axios.get(`
    https://stg-api-itjob.unicode.edu.vn/api/v1/configurations
    `)
      .then((response) => {
        // console.log(response.data);
        setValue('score_of_skill', response.data.score_of_skill);
        setValue('score_of_job_position', response.data.score_of_job_position);
        setValue('score_of_working_style', response.data.score_of_working_style);
        setValue('like_daily_limit', response.data.like_daily_limit);
        setValue('share_daily_limit', response.data.share_daily_limit);
        setValue('exchange_rate', response.data.exchange_rate);
        setValue('earn_by_like', response.data.earn_by_like);
        setValue('earn_by_match', response.data.earn_by_match);
        setValue('earn_by_share', response.data.earn_by_share);
        setValue('upgrade', response.data.upgrade);
        setLoadingData(true);
      })
      .catch(err => console.log(err));
  }, [setValue, loadingData]);


  const onSubmit = (data) => {
    console.log(data.earn_by_like)
    setLoadingButton(true);
    // formData.append('id', companyId);
    // formData.append('email', data.email);
    // formData.append('phone', data.phone);
    // formData.append('website', data.website);
    // formData.append('status', 1);
    // formData.append('is_premium', data.premium);
    // formData.append('name', data.name);
    // formData.append('description', data.description);
    // formData.append('companyType', companyType);
    // if (logo) {
    //   formData.append('uploadFile', logo);
    // }

    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/configurations`,
      method: 'post',
      headers: {
        //  "Content-Type": "multipart/form-data" 
         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
      data: {
          score_of_skill: data.score_of_skill,
          score_of_working_style: data.score_of_working_style,
          score_of_job_position: data.score_of_job_position,
          like_daily_limit: data.like_daily_limit,
          share_daily_limit: data.share_daily_limit,
          exchange_rate: data.exchange_rate,
          earn_by_like: data.earn_by_like,
          earn_by_share: data.earn_by_share,
          earn_by_match: data.earn_by_match,
          upgrade: data.upgrade   
      },
    })
      .then((response) => {
        console.log(response)
        setDisabled(true);
        setLoadingButton(false);
        setShowButtonEdit(false);
        setOpenAlert(true);
        setSeverity('success');
        setMessageAlert('Cấu hình hệ thống thành công');
      })
      .catch((error) => {
        console.log(error);
      setLoadingButton(false);
      setOpenAlert(true);
      setSeverity('error');
      setMessageAlert('Cấu hình hệ thống thất bại');
      });

    // axios({
    //   url: `
    //   // ${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.PUT_COMPANY}/${companyId}
    //   `,
    //   method: 'put',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: formData
    // }).then(() => {
    //   axios({
    //     url: `
    //     // ${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_COMPANY}/${companyId}
    //     `,
    //     method: 'get',
    //     // headers: {
    //     //   Authorization: `Bearer ${token}`
    //     // }
    //   }).then((response) => {
    //     setDisabled(true);
    //     setLoadingButton(false);
    //     setShowButtonEdit(false);
    //     setOpenAlert(true);
    //     setSeverity('success');
    //     setMessageAlert('Cập nhật tài khoản thành công');

    //   }).catch(error => console.log(error));
    // }).catch(err => {
    //   console.log(err);
    //   setLoadingButton(false);
    //   setOpenAlert(true);
    //   setSeverity('error');
    //   setMessageAlert('Cập nhật tài khoản không thành công');
    // });
  };

  const onError = (data, event) => {
    console.log(data, event);
  };





  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div>
      <Page title='Cấu hình hệ thống'>
        <Container maxWidth='sm'>
          <Stack direction="row" alignItems="center" justifyContent="flex-start">

            <HeaderBreadcrumbs
              heading="Cấu hình hệ thống"
              links={[
                { name: 'Trang chủ', href: PATH_DASHBOARD.root },
                { name: 'Cấu hình' },
              ]}
            />


          </Stack>

          {loadingData
            ? (
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Card style={{ padding: 20 }}>
                  <Grid container spacing={2} style={{ paddingBottom: 20, paddingLeft: 20 }}>

                    <Grid item xs={12}>
                      <Grid container spacing={3} sx={{ pt: 2 }}>
                        <Grid item xs={12}>
                          {/* <TextField fullWidth disabled={disabled} {...register('name')} label='Score Skill' /> */}
                          <p>Suggest Score</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('score_of_skill')} label='Score Skill' />
                          <p style={{ color: 'red' }}>{errors.score_of_skill?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('score_of_working_style')} label='Score Working Style' />
                          <p style={{ color: 'red' }}>{errors.score_of_working_style?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('score_of_job_position')} label='Score Job Position' />
                          <p style={{ color: 'red' }}>{errors.score_of_job_position?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          {/* <TextField fullWidth disabled={disabled} {...register('name')} label='Score Skill' /> */}
                          <p>Exchange rate</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('exchange_rate')} label='Exchange Rate' />
                          <p style={{ color: 'red' }}>{errors.exchange_rate?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          {/* <TextField fullWidth disabled={disabled} {...register('name')} label='Score Skill' /> */}
                          <p>Limit action</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('like_daily_limit')} label='Limit daily like' />
                          <p style={{ color: 'red' }}>{errors.like_daily_limit?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('share_daily_limit')} label='Limit daily share' />
                          <p style={{ color: 'red' }}>{errors.share_daily_limit?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          {/* <TextField fullWidth disabled={disabled} {...register('name')} label='Score Skill' /> */}
                          <p>Price </p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('earn_by_like')} label='Earn by Like' />
                          <p style={{ color: 'red' }}>{errors.earn_by_like?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('earn_by_share')} label='Earn by Share' />
                          <p style={{ color: 'red' }}>{errors.earn_by_share?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('earn_by_match')} label='Earn by Match' />
                          <p style={{ color: 'red' }}>{errors.earn_by_match?.message}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth disabled={disabled} {...register('upgrade')} label='Upgrade' />
                          <p style={{ color: 'red' }}>{errors.upgrade?.message}</p>
                        </Grid>


                      </Grid>
                    </Grid>
                  </Grid>

                  {showButtonEdit ? (
                    <Grid container direction='row' justifyContent='flex-end' spacing={2}>
                      <Grid item>
                        <Button variant='outlined' onClick={() => {
                          clearErrors();
                          // setLogo(null);
                          setDisabled(true);
                          setShowButtonEdit(false);
                          setLoadingData(false);
                        }}>Huỷ</Button>
                      </Grid>
                      <Grid item>
                        <LoadingButton loading={loadingButton} variant='contained' type='submit'>Lưu</LoadingButton>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container direction='row' justifyContent='flex-end' spacing={2}>
                      <Grid item>
                        <Button variant='outlined' onClick={() => {
                          setDisabled(false);
                          setShowButtonEdit(true);
                        }}>Chỉnh sửa</Button>
                      </Grid>
                    </Grid>
                  )}
                </Card>
              </form>
            )
            : (
              <Box sx={{ minHeight: 500, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
        </Container>
      </Page>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openAlert} autoHideDuration={5000} onClose={closeAlert}>
        <Alert variant='filled' severity={severity}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div >
  );
}
