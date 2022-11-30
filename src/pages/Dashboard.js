import { useEffect, useState } from 'react';

import axios from 'axios';
// @mui
import { Grid, Container,Avatar } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// sections
import {  AdminWidgetSummary, AdminCheckInWidgets } from '../sections/dashboard';
import { api } from '../constants';



// ----------------------------------------------------------------------

export default function PageOne() {
  const [listApplicant, setListApplicant] = useState(0);
  const [listCompany, setListCompany] = useState(0);
  const [listProfileApplicant, setListProfileApplicant] = useState(0);
  const [listProfileApplicantOnl, setListProfileApplicantOnl] = useState(0);
  const [listJobPost, setListJobPost] = useState(0);
  const [listJobPostOnl, setListJobPostOnl] = useState(0);
  const { themeStretch } = useSettings();

  useEffect(()  =>  {
     axios({
      url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_APPLICANT}`,
      method: 'get',
    })
      .then((response) => {
        setListApplicant(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_COMPANY}`,
      method: 'get',
    })
      .then((response) => {
        setListCompany(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/profile-applicants?status=0`,
      method: 'get',
    })
      .then((response) => {
        setListProfileApplicantOnl(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/profile-applicants?sort-key=CreateDate`,
      method: 'get',
    })
      .then((response) => {
        setListProfileApplicant(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/job-posts?status=0`,
      method: 'get',
    })
      .then((response) => {
        setListJobPostOnl(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/job-posts`,
      method: 'get',
    })
      .then((response) => {
        setListJobPost(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);
//  console.log(listProfileApplicant);
//  console.log(listProfileApplicantOnl);
//  console.log(listJobPost);
//  console.log(listJobPostOnl);
  return (
    <Page title="Trang chủ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AdminWidgetSummary
              title="Số người dùng"
              total={listApplicant + listCompany}
              icon={
                <Avatar
                alt='test'
                src='https://media.istockphoto.com/vectors/young-woman-working-with-a-computer-back-view-vector-flat-style-vector-id1298299509?s=612x612'
                // href={setOpenViewImage(true)}
                // onClick={
                //   setOpenViewImage(true)
                // }
                sx={{
                  width: 120,
                  height: 120,
                  zIndex: 11,
                  // left: 0,
                  // right: 0,
                  // bottom: 65,
                  mx: 'auto',
                  position: 'relative',
                }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AdminWidgetSummary
              title="Ứng viên"
              total={listApplicant}
              icon={ <Avatar
                alt='test'
                src='https://media.istockphoto.com/vectors/hand-holding-phone-with-picture-of-woman-and-checkmark-on-screen-vector-id1414008504?k=20&m=1414008504&s=612x612&w=0&h=oTsUwtgshmzywUqPVhJPJiBk0Z2JfSgGif9YMIEPirQ='
                // href={setOpenViewImage(true)}
                // onClick={
                //   setOpenViewImage(true)
                // }
                sx={{
                  width: 120,
                  height: 120,
                  zIndex: 11,
                  // left: 0,
                  // right: 0,
                  // bottom: 65,
                  mx: 'auto',
                  position: 'relative',
                }}
              />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AdminWidgetSummary
              title="Công ty"
              total={listCompany}
              icon={ <Avatar
                alt='test'
                src='https://media.istockphoto.com/vectors/digital-marketing-social-media-concept-group-of-people-working-vector-id1325945819?k=20&m=1325945819&s=612x612&w=0&h=dMlka6zUvLJqGPBjRGT3PLfuEzm8G0UO0HoCc1YQU60='
                // href={setOpenViewImage(true)}
                // onClick={
                //   setOpenViewImage(true)
                // }
                sx={{
                  width: 120,
                  height: 120,
                  zIndex: 11,
                  // left: 0,
                  // right: 0,
                  // bottom: 65,
                  mx: 'auto',
                  position: 'relative',
                }}
              />}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={6}>
                <BookingTotalIncomes total={18765} percent={2.6} chartData={[111, 136, 76, 108, 74, 54, 57, 84]} />
              </Grid> */}

              {/* <Grid item xs={12} md={6}>
                <BookingBookedRoom title="Booked Room" data={'_bookingsOverview'} />
              </Grid> */}

              <Grid item xs={12} md={12}>
                <AdminCheckInWidgets
                
                  chartData={[
                    {
                      label: 'Hồ sơ',
                      percent: ((listProfileApplicantOnl / listProfileApplicant) * 100).toFixed(1) ,
                      total: listProfileApplicant,
                    },
                    {
                      label: 'Bài tuyển dụng',
                      percent: ((listJobPostOnl / listJobPost) * 100).toFixed(1) ,
                      total: listJobPost,
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <BookingNewestBooking title="Newest Booking" subheader="12 Booking" list={listProfileApplicant} />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}