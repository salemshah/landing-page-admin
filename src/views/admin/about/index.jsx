import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import AboutForm from 'ui-component/AboutForm';
import AboutDataTable from 'ui-component/AboutDataTable';

// ============================|| PROFILE ADMIN PAGE ||============================ //

const About = () => {

  return (
    <>
      <MainCard title="À Propos">
        <Grid container>
          <Grid item xs={12}>
            <AboutForm />
          </Grid>
        </Grid>
      </MainCard>
      <MainCard title="Liste de à propos" sx={{ mt: 3, mb: 15 }}>
        <Grid container>
          <Grid item xs={12}>
            <AboutDataTable />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default About;
