// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetStartedProcess } from './GetStartedProcess';
import { QProcess } from './QProcess';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PAGE_STATE = { GET_STARTED_PROCESS: 'data', QPROCESS: 'qprocess' };

export default function DashboardDefault() {
  const { user } = useSelector((state) => state.app);
  const [currentState, setCurrentState] = useState(PAGE_STATE.GET_STARTED_PROCESS);
  const [session, setSession] = useState(null);

  const handleNewSession = () => {
    setCurrentState(PAGE_STATE.GET_STARTED_PROCESS);
    setSession(null);
  };

  const handleStartSession = (data) => {
    setSession(data);
    setCurrentState(PAGE_STATE.QPROCESS);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={'12'}>
        <Stack>
          <Stack sx={{ mt: 2, width: { xs: '100%', sm: '70%', md: '60%' }, height: '100%', alignSelf: 'center' }}>
            {currentState === PAGE_STATE.QPROCESS ? (
              <QProcess user={user} session={session} onNewSession={handleNewSession} />
            ) : (
              <GetStartedProcess user={user} onCompleted={handleStartSession} />
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
