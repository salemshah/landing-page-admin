import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import HomeForm from 'ui-component/HomeForm';
import DataTable from 'ui-component/DataTable';

// ============================|| PROFILE ADMIN PAGE ||============================ //

const Home = () => {

  return (
    <>
      <MainCard title="Accueil" secondary={<SecondaryAction />}>
        <Grid container>
          <Grid item xs={12}>
            <HomeForm />
          </Grid>
        </Grid>
      </MainCard>
      <MainCard title="Hero list" sx={{mt: 3, mb: 15}}>
        <Grid container>
          <Grid item xs={12}>
            <DataTable />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Home;
