import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import ApproachForm from 'ui-component/ApproachForm';
import ApproachDataTable from 'ui-component/ApproachDataTable';

// ============================|| APPROACH ADMIN PAGE ||============================ //

const About = () => {

  return (
    <>
      <MainCard title="Approche">
        <Grid container>
          <Grid item xs={12}>
            <ApproachForm />
          </Grid>
        </Grid>
      </MainCard>
      <MainCard title="Liste de à propos" sx={{ mt: 3, mb: 15 }}>
        <Grid container>
          <Grid item xs={12}>
            <ApproachDataTable />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default About;
