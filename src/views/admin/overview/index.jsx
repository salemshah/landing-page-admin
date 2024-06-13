import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// ============================|| PROFILE ADMIN PAGE ||============================ //

const About = () => {

  return (
    <MainCard title="Basic Shadow" secondary={<SecondaryAction />}>
      <Grid container >
        <Grid item xs={12}>

        </Grid>
      </Grid>
    </MainCard>
  );
};

export default About;
