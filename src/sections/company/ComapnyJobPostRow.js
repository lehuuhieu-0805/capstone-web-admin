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
 
  // const [jobPostSkillDetail, setJobPostSkillDetail] = useState([]);
  const [skillDetail, setSkillDetail] = useState([]);
 

  const handleCloseDialogDetail = () => {
    setOpenDialogDetail(false);
  };

  useEffect(() => {
    rows.job_post_skills.map((jobPostSkill) => axios( {
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
  }, []);
  
  return (
    <TableRow>
      <TableCell align="center">{dayjs(rows.create_date).format('DD-MM-YYYY')}</TableCell>
      <TableCell align="center">
      <h5>{rows.title.slice(0, 60)}</h5>
      <h5>{rows.title.slice(60, 100)}</h5>
        </TableCell>
      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {rows.quantity}
      </TableCell>
      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {rows.job_position.name}
      </TableCell>

      <TableCell align="center">{(() => {
            if (rows.status === 0) {
              return (
                <Label
                 
                color={'success'}
                sx={{ textTransform: 'capitalize' }}
              >
                Ho???t ?????ng
              </Label>
               
              );
            }
            if (rows.status === 1) {
              return (
                <Label
                 
                color={'primary'}
                sx={{ textTransform: 'capitalize' }}
              >
                ???n
              </Label>
               
              );
            }
            if (rows.status === 2) {
              return (
                <Label
                 
                color={'warning'}
                sx={{ textTransform: 'capitalize' }}
              >
                Ch??? duy???t
              </Label>
              
              );
            }
            if (rows.status === 3) {
              return (
                <Label
                 
                color={'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                T??? ch???i
              </Label>
                
              );
            }
            if (rows.status === 4) {
              return (
                <Label
                 
                color={'warning'}
                sx={{ textTransform: 'capitalize' }}
              >
                Ch??? Ho???t ?????ng
              </Label>
                
              );
            }
          })()}</TableCell>

      <TableCell align="right">
      <Tooltip title="Xem chi ti???t">
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
        <DialogTitle id="alert-dialog-title">Th??ng tin b??i tuy???n d???ng</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <h3>{rows.title}</h3>
                      <h4  variant="subtitle2" style={{ fontWeight: 'normal' }}>
                        {dayjs(rows.create_date).format('DD-MM-YYYY HH:mm:ss')}
                      </h4>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>  {(() => {
            if (rows.status === 0) {
              return (
                <Chip label=" Ho???t ?????ng" color="success" />
              );
            }
            if (rows.status === 1) {
              return (
                <Chip label=" ???n" color="primary" />
              );
            }
            if (rows.status === 2) {
              return (
                <Chip label=" Ch??? duy???t" color="warning" />
              );
            }
            if (rows.status === 3) {
              return (
                <Chip label="T??? ch???i" color="error" />
              );
            }
            if (rows.status === 4) {
              return (
                <Chip label="Ch??? ho???t ?????ng" color="warning" />
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
                  <CardHeader title="Th??ng tin" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          S??? l?????ng tuy???n:{' '}
                        </Box>
                        {rows.quantity}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          H??nh th???c l??m vi???c:{' '}
                        </Box>
                        {rows.working_style.name}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          ?????a ??i???m l??m vi???c:{' '}
                        </Box>
                        {rows.working_place}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Typography variant="h7" component="div">
                        <Box display="inline" fontWeight="fontWeightBold">
                          V??? tr?? c??ng vi???c:{' '}
                        </Box>
                        {rows.job_position.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                <Stack direction="row">
                  <ImageList variant="standard" cols={2} gap={8}>
                    {rows.album_images &&
                      rows.album_images.map((item) => (
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
                  <CardHeader title="Gi???i thi???u" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h4>M?? t???:</h4>
                        <h4 style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: rows?.description }} />
                      </Grid>
                      <Grid item xs={6}>
                        <h4>B???t ?????u:</h4>
                        <h4 style={{ fontWeight: 'normal' }}>{dayjs(rows.start_time).format('DD-MM-YYYY')}</h4>
                      </Grid>
                      <Grid item xs={6}>
                        <h4>K???t th??c:</h4>
                        <h4 style={{ fontWeight: 'normal' }}>{dayjs(rows.end_time).format('DD-MM-YYYY')}</h4>
                      </Grid>
                    </Grid>
                  </Stack>
                </Card>
                <Card>
                  <CardHeader title="K??? n??ng y??u c???u" />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    {skillDetail &&
                      skillDetail.map((element) => (
                        <Stack key={element.id} spacing={15} direction="row">
                          <Typography variant="body2">-Ng??n ng???: {element.skill}</Typography>
                          <Typography variant="body2">Tr??nh ????? : {element.skillLevel}</Typography>
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
            ????ng
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
