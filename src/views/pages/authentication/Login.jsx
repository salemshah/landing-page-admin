import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';


// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  {/*<Grid item xs={12}>*/}
                  {/*  <Divider />*/}
                  {/*</Grid>*/}
                  {/*<Grid item xs={12}>*/}
                  {/*  <Grid item container direction="column" alignItems="center" xs={12}>*/}
                  {/*    <Typography component={Link} to="/auth/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>*/}
                  {/*      Vous n&apos;avez pas de compte?*/}
                  {/*    </Typography>*/}
                  {/*  </Grid>*/}
                  {/*</Grid>*/}
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
