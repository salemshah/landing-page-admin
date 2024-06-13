import React from 'react';
import { Button, Grid } from '@mui/material';
import TextEditor from './TextEditor';
import UploadImageComponent from './UploadImageComponent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const hero = {
  'imgUrl': '/images/home-banner.png',
  'heading': 'BIENVENUE SUR MINDA',
  'typingText': [
    'On joue ?',
    1500,
    'MindA est le premier jeu éducatif pensé comme un vrai jeu vidéo Visitez notre site pour en savoir plus.',
    1500
  ],
  'description': 'MindA est le premier jeu éducatif pensé comme un vrai jeu vidéo Visitez notre site pour en savoir plus.',
  'btnText': 'Entrer en contact',
  'btnUrl': 'contactus'
};

function App() {
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField fullwidth id="ttile" label="Titre d'accueil" variant="outlined" />
                <FormHelperText id="title">Le titre d'accueil</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField fullwidth id="anim-text1" label="Titre d'animation 1" variant="outlined" />
                <FormHelperText id="anim-text1">Le titre d'animation</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField fullwidth id="anim-text2" label="Titre d'animation 2" variant="outlined" />
                <FormHelperText id="anim-text2">Le titre d'animation</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextEditor />
                <FormHelperText id="lang-hero-text">Lange text sur hero</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <UploadImageComponent />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default App;
