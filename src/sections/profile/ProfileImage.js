// @mui
import { Card, Stack, ImageListItem, ImageList } from '@mui/material';
import axios from 'axios';
import ModalImage from 'react-modal-image';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------

export default function ProfileFollowInfo(profile) {
  const [listImage, setListImage] = useState([]);
  useEffect(() => {
    axios({
      url: `https://stg-api-itjob.unicode.edu.vn/api/v1/album-images?page-size=50&profileApplicantId=${profile.profile.id}`,
      method: 'get',
    })
      .then((response) => {
        console.log(response);
        setListImage(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [profile.profile.id]);

  return (
    
      <Stack direction="row">
                  <ImageList variant="standard" cols={2} gap={8}>
                    {listImage &&
                      listImage.map((item) => (
                        <ImageListItem key={item.id}>
                          {item.url_image && <ModalImage small={item.url_image} large={item.url_image} />}
                        </ImageListItem>
                      ))}
                  </ImageList>
                </Stack>
 
    
  );
}
