/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import '../../utils/style.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
// @mui
import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  CardHeader,
  Typography,
  Box,
  ImageList,
  ImageListItem,Tooltip
} from '@mui/material';
import ModalImage from 'react-modal-image';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { api } from '../../constants';

// ----------------------------------------------------------------------

CompanyJobPostRow.propTypes = {
  rows: PropTypes.object,
};

export default function CompanyJobPostRow({ rows }) {
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [jobPostDetail, setJobPostDetail] = useState('');
  const [workingStyleDetail, setWorkingStyleDetail] = useState('');
  const [jobPositionDetail, setJobPositionDetail] = useState('');
  const [albumImageDetail, setAlbumImageDetail] = useState([]);
  // const [jobPostSkillDetail, setJobPostSkillDetail] = useState([]);
  const [skillDetail, setSkillDetail] = useState([]);
  const [company, setCompany] = useState();

  const handleCloseDialogDetail = () => {
    setOpenDialogDetail(false);
  };

  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/job-posts/${rows.id}`,
      method: 'get',
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // },
    })
      .then((response) => {
        setJobPostDetail(response.data.data);
 
        axios({
          url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_WORKINGSTYLE}/${response.data.data.working_style_id}`,
          method: 'get',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // },
        }).then((response) => {
          setWorkingStyleDetail(response.data.data.name);
          
        }).catch(error => console.log(error));
  
        axios({
          url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_COMPANY}/${response.data.data.company_id}`,
          method: 'get',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // }
        }).then((response) => {
          setCompany(response.data.data);
        }).catch(error => console.log(error));
  
        axios({
          url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_JOBPOSITION}/${response.data.data.job_position_id}`,
          method: 'get',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // },
        }).then((response) => {
          setJobPositionDetail(response.data.data.name);
        }).catch(error => console.log(error));
  
        axios({
          url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_ALBUMIMAGE}?jobPostId=${rows.id}`,
          method: 'get',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // },
        }).then((response) => {
          setAlbumImageDetail(response.data.data);
        }).catch(error => console.log(error));
  
        axios({
          url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_JOBPOSTSKILL}?jobPostId=${rows.id}`,
          method: 'get',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // },
        }).then((response) => {
          // setJobPostSkillDetail(response.data.data);
          response.data.data.map((jobPostSkill) => axios( {
            url: `${api.baseUrl}/${api.configPathType.api}/${api.versionType.v1}/${api.GET_SKILL}/${jobPostSkill.skill_id}`,
            method: 'get',
            // headers: {
            //   'Authorization': `Bearer ${token}`
            // },
          }).then((response) => {
            setSkillDetail(prevState => ([...prevState, {
              skill: response.data.data.name,
              skillLevel: jobPostSkill.skill_level
            }]));
          }).catch(error => console.log(error)));
        
        }).catch(error => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [rows.id]);
  
  return (
    <TableRow>
      <TableCell align="center">{dayjs(jobPostDetail.create_date).format('DD-MM-YYYY')}</TableCell>
      <TableCell align="center">{jobPostDetail.title}</TableCell>
      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {jobPostDetail.quantity}
      </TableCell>
      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {jobPositionDetail}
      </TableCell>

      <TableCell align="center">{(() => {
            if (rows.status === 0) {
              return (
                <Label
                 
                color={'success'}
                sx={{ textTransform: 'capitalize' }}
              >
                Hoạt Động
              </Label>
               
              );
            }
            if (rows.status === 1) {
              return (
                <Label
                 
                color={'primary'}
                sx={{ textTransform: 'capitalize' }}
              >
                Ẩn
              </Label>
               
              );
            }
            if (rows.status === 2) {
              return (
                <Label
                 
                color={'warning'}
                sx={{ textTransform: 'capitalize' }}
              >
                Chờ duyệt
              </Label>
              
              );
            }
            if (rows.status === 3) {
              return (
                <Label
                 
                color={'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                Từ chối
              </Label>
                
              );
            }
            if (rows.status === 4) {
              return (
                <Label
                 
                color={'warning'}
                sx={{ textTransform: 'capitalize' }}
              >
                Chờ Hoạt Động
              </Label>
                
              );
            }
          })()}</TableCell>

      <TableCell align="right">
      <Tooltip title="Xem chi tiết">
        <IconButton
          onClick={() => {
            setOpenDialogDetail(true);
          }}
          color="info"
        >
          <Iconify icon={'carbon:view-filled'} color="success" width={20} height={20} />
        </IconButton>
        </Tooltip>
      </TableCell>
      <Dialog
        open={openDialogDetail}
        onClose={handleCloseDialogDetail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">Thông tin bài tuyển dụng</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        style={{ borderRadius: '50%', objectFit: 'contain' }}
                        src={company?.logo}
                        alt={company?.name}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <h3>{jobPostDetail.title}</h3>
                      <h4  variant="subtitle2" style={{ fontWeight: 'normal' }}>
                        {dayjs(jobPostDetail.create_date).format('DD-MM-YYYY HH:mm:ss')}
                      </h4>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>  {(() => {
            if (rows.status === 0) {
              return (
                <Chip label=" Hoạt Động" color="success" />
              );
            }
            if (rows.status === 1) {
              return (
                <Chip label=" Ẩn" color="primary" />
              );
            }
            if (rows.status === 2) {
              return (
                <Chip label=" Chờ duyệt" color="warning" />
              );
            }
            if (rows.status === 3) {
              return (
                <Chip label="Từ chối" color="error" />
              );
            }
            if (rows.status === 4) {
              return (
                <Chip label="Chờ hoạt động" color="warning" />
              );
            }
          })()}
                      
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card>
                  <CardHeader title="Thông tin" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          Số lượng tuyển:{' '}
                        </Box>
                        {jobPostDetail.quantity}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          Hình thức làm việc:{' '}
                        </Box>
                        {workingStyleDetail}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          Địa điểm làm việc:{' '}
                        </Box>
                        {jobPostDetail.working_place}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          Vị trí công việc:{' '}
                        </Box>
                        {jobPositionDetail}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                <Stack direction="row">
                  <ImageList variant="standard" cols={2} gap={8}>
                    {albumImageDetail &&
                      albumImageDetail.map((item) => (
                        <ImageListItem key={item.id}>
                          {item.url_image && <ModalImage small={item.url_image} large={item.url_image} className="modal-image1"/>}
                        </ImageListItem>
                      ))}
                  </ImageList>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Card>
                  <CardHeader title="Giới thiệu" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h4>Mô tả:</h4>
                        <h4 style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: jobPostDetail?.description }} />
                      </Grid>
                      <Grid item xs={6}>
                        <h4>Bắt đầu:</h4>
                        <h4 style={{ fontWeight: 'normal' }}>{dayjs(rows.start_time).format('DD-MM-YYYY')}</h4>
                      </Grid>
                      <Grid item xs={6}>
                        <h4>Kết thúc:</h4>
                        <h4 style={{ fontWeight: 'normal' }}>{dayjs(rows.end_time).format('DD-MM-YYYY')}</h4>
                      </Grid>
                    </Grid>
                  </Stack>
                </Card>
                <Card>
                  <CardHeader title="Kỹ năng yêu cầu" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    {skillDetail &&
                      skillDetail.map((element) => (
                        <Stack key={element.id} spacing={15} direction="row">
                          <Typography variant="body2">-Ngôn ngữ: {element.skill}</Typography>
                          <Typography variant="body2">Trình độ : {element.skillLevel}</Typography>
                        </Stack>
                      ))}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDetail} variant="contained">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
