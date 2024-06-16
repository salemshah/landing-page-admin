import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import MessageDataTable from 'ui-component/MessageDataTable';

// ============================|| MESSAGE ADMIN PAGE ||============================ //

const Home = () => {
  return (
    <MainCard title="Message" sx={{ mt: 3, mb: 15 }}>
      <Grid container>
        <Grid item xs={12}>
          <MessageDataTable />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Home;
