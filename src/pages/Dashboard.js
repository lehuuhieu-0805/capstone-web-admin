import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
// @mui
import { Grid, Container, Avatar, useTheme, LinearProgress } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// sections
import { AdminWidgetSummary, AdminCheckInWidgets, EcommerceSaleByGender, BankingBalanceStatistics, } from '../sections/dashboard';
import { api } from '../constants';
// import EcommerceSaleByGender from '../sections/dashboard/EcommerceSaleByGender';



// ----------------------------------------------------------------------

export default function PageOne() {
  const [listApplicant, setListApplicant] = useState(0);
  const [listCompany, setListCompany] = useState(0);
  const [listProfileApplicant, setListProfileApplicant] = useState(0);
  const [listProfileApplicantOnl, setListProfileApplicantOnl] = useState(0);
  const [listJobPost, setListJobPost] = useState(0);
  const [listJobPostOnl, setListJobPostOnl] = useState(0);
  const [day0, setDay0] = useState([]);
  const { themeStretch } = useSettings();
  const [loadingData, setLoadingData] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    getAll()
  }, []);

  const getAll = async() => {
    axios({
      url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_APPLICANT}`,
      method: 'get',
    })
      .then((response) => {
        setListApplicant(response.data.data.length);
      })
      .catch((error) => console.log(error));
      axios({
        url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_COMPANY}`,
        method: 'get',
      })
        .then((response) => {
          setListCompany(response.data.data.length);
        })
        .catch((error) => console.log(error));
           axios({
        url: `https://stg-api-itjob.unicode.edu.vn/api/v1/profile-applicants?status=0`,
        method: 'get',
      })
        .then((response) => {
          setListProfileApplicantOnl(response.data.data.length);
        })
        .catch((error) => console.log(error));
           axios({
        url: `https://stg-api-itjob.unicode.edu.vn/api/v1/profile-applicants?sort-key=CreateDate`,
        method: 'get',
      })
        .then((response) => {
          setListProfileApplicant(response.data.data.length);
        })
        .catch((error) => console.log(error));
           axios({
        url: `https://stg-api-itjob.unicode.edu.vn/api/v1/job-posts?status=0`,
        method: 'get',
      })
        .then((response) => {
          setListJobPostOnl(response.data.data.length);
        })
        .catch((error) => console.log(error));
          axios({
        url: `https://stg-api-itjob.unicode.edu.vn/api/v1/job-posts`,
        method: 'get',
      })
        .then((response) => {
          setListJobPost(response.data.data.length);
        })
        .catch((error) => console.log(error));
        await  axios({
          url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-9, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-8, 'day').format('YYYY-MM-DD')}`,
          method: 'get',
        })
          .then((response) => {
            if (response.status === 204) {
              day0.push(0);
            } else {
              day0.push(response.data.data.length);
            }
            // console.log(response)
          })
          .catch((error) => console.log(error));
          await  axios({
            url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-8, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-7, 'day').format('YYYY-MM-DD')}`,
            method: 'get',
          })
            .then((response) => {
              if (response.status === 204) {
                day0.push(0);
              } else {
                day0.push(response.data.data.length);
              }
              // console.log(response)
            })
            .catch((error) => console.log(error));
            await   axios({
              url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-7, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-6, 'day').format('YYYY-MM-DD')}`,
              method: 'get',
            })
              .then((response) => {
                if (response.status === 204) {
                  day0.push(0);
                } else {
                  day0.push(response.data.data.length);
                }
                // console.log(response)
              })
              .catch((error) => console.log(error));
              await   axios({
                url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-6, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-5, 'day').format('YYYY-MM-DD')}`,
                method: 'get',
              })
                .then((response) => {
                  if (response.status === 204) {
                    day0.push(0);
                  } else {
                    day0.push(response.data.data.length);
                  }
                  // console.log(response)
                })
                .catch((error) => console.log(error));
                await   axios({
                  url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-5, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-4, 'day').format('YYYY-MM-DD')}`,
                  method: 'get',
                })
                  .then((response) => {
                    if (response.status === 204) {
                      day0.push(0);
                    } else {
                      day0.push(response.data.data.length);
                    }
                    // console.log(response)
                  })
                  .catch((error) => console.log(error));
                  await   axios({
                    url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-4, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-3, 'day').format('YYYY-MM-DD')}`,
                    method: 'get',
                  })
                    .then((response) => {
                      if (response.status === 204) {
                        day0.push(0);
                      } else {
                        day0.push(response.data.data.length);
                      }
                      // console.log(response)
                    })
                    .catch((error) => console.log(error));
                    await   axios({
                      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-3, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-2, 'day').format('YYYY-MM-DD')}`,
                      method: 'get',
                    })
                      .then((response) => {
                        // console.log(response.data.data)
                        if (response.status === 204) {
                          day0.push(0);
                        } else {
                          day0.push(response.data.data.length);
                        }
                
                      })
                      .catch((error) => console.log(error));
                      await  axios({
                        url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-2, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(-1, 'day').format('YYYY-MM-DD')}`,
                        method: 'get',
                      })
                        .then((response) => {
                          if (response.status === 204) {
                            day0.push(0);
                          } else {
                            day0.push(response.data.data.length);
                          }
                        })
                        .catch((error) => console.log(error));
                        await  axios({
                          url: `https://stg-api-itjob.unicode.edu.vn/api/v1/likes/date?fromDate=${dayjs().add(-1, 'day').format('YYYY-MM-DD')}&toDate=${dayjs().add(1, 'day').format('YYYY-MM-DD')}`,
                          method: 'get',
                        })
                          .then((response) => {
                            if (response.status === 204) {
                              day0.push(0);
                            } else {
                              day0.push(response.data.data.length);
                            }
                            // console.log(response)
                    
                          })
                          .catch((error) => console.log(error));
                         
     

    
     
     
    
    
    
      
      setLoadingData(false);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoadingData(false);
  //   }, 1000);
  // }, [loadingData]);
  //  console.log(listProfileApplicant);
  //  console.log(listProfileApplicantOnl);
  //  console.log(listJobPost);
  //  console.log(listJobPostOnl);
  // console.log(day0);
  //  console.log(dayjs().add(-1, 'day').format('YYYY-MM-DD'));

  return (
    <Page title="Trang chủ">
      {loadingData ? (
        <LinearProgress fullwidth="true" />
      ) : (
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
                icon={<Avatar
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
                icon={<Avatar
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
                        label: 'Hồ sơ hoạt động',
                        percent: ((listProfileApplicantOnl / listProfileApplicant) * 100).toFixed(1),
                        total: listProfileApplicantOnl,
                      },
                      {
                        label: 'Bài tuyển dụng hoạt động',
                        percent: ((listJobPostOnl / listJobPost) * 100).toFixed(1),
                        total: listJobPostOnl,
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <BankingBalanceStatistics
                title="Thống kê sử dụng"
                subheader="Lượt Thích trong hệ thống"
                chartLabels={[`${dayjs().add(-8, 'day').format('DD/MM')}`, `${dayjs().add(-7, 'day').format('DD/MM')}`, `${dayjs().add(-6, 'day').format('DD/MM')}`, `${dayjs().add(-5, 'day').format('DD/MM')}`, `${dayjs().add(-4, 'day').format('DD/MM')}`, `${dayjs().add(-3, 'day').format('DD/MM')}`, `${dayjs().add(-2, 'day').format('DD/MM')}`, `${dayjs().add(-1, 'day').format('DD/MM')}`, `${dayjs().format('DD/MM')}`]}
                chartData={[
                  {
                    year: 'Ngày',
                    data: [
                      { name: 'Like', data: day0 },

                      // { name: 'Match', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    
                    ],
                  },

                ]}
              />
            </Grid>

          </Grid>
        </Container>
      )}
    </Page>
  );
}
