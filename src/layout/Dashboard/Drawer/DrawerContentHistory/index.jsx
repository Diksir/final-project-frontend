// project import
import { Stack, Typography } from '@mui/material';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Stack sx={{px: '20px'}}>
          <Typography variant='body1'>History</Typography>
        </Stack>
      </SimpleBar>
    </>
  );
}
