import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment, Button, CircularProgress } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceValidationSchema } from 'ui-component/formik/validationSchemas';
import axiosInstance from 'api/axiosInstance';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import useSWR from 'swr';
import AppTextFieldHookForm from 'ui-component/AppTextFieldHookForm';

const TiktokIcon = () => (
  <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
       xmlSpace="preserve">
    <path
      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const getOneServices = async (url) => {
  const response = await axiosInstance.get(url);
  return response?.data?.data;
};

const ServiceForm = () => {
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR('/landing-page-setting-one', getOneServices);
  const [servicesId, setServicesId] = useState(null);

  const methods = useForm({
    resolver: yupResolver(serviceValidationSchema),
    defaultValues: {
      phoneNumber: '',
      email: '',
      footerMessage: '',
      formHeader: '',
      formDescription: '',
      facebookLink: '',
      instagramLink: '',
      tiktokLink: '',
      youtubeLink: '',
      xLink: '',
      servicesEmails: ''
    }
  });

  const { reset } = methods;

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.servicesEmails)) {
        data.servicesEmails = data.servicesEmails.join(',');
      }
      setServicesId(data._id);
      delete data._id;
      delete data.__v;
      reset(data);
    }
  }, [data, reset]);


  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (servicesId) {
        await axiosInstance.put(`/landing-page-setting/${servicesId}`, values);
      } else {
        await axiosInstance.post('/landing-page-setting', values);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error in form submission:', error);
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AppTextFieldHookForm
                      name="phoneNumber"
                      label="Numéro de téléphone"
                      helper="Entrez le numéro de téléphone de contact"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AppTextFieldHookForm
                      name="email"
                      label="Email"
                      helper="Entrez l'adresse email de contact"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6}>
                <AppTextFieldHookForm
                  name="servicesEmails"
                  label="Emails des services"
                  helper="Entrez les emails des services séparés par des virgules"
                  multiline={true}
                  rows={5}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTextFieldHookForm
              name="facebookLink"
              label="Lien Facebook"
              helper="Entrez le lien du profil Facebook"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTextFieldHookForm
              name="instagramLink"
              label="Lien Instagram"
              helper="Entrez le lien du profil Instagram"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTextFieldHookForm
              name="tiktokLink"
              label="Lien TikTok"
              helper="Entrez le lien du profil TikTok"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TiktokIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTextFieldHookForm
              name="youtubeLink"
              label="Lien YouTube"
              helper="Entrez le lien de la chaîne YouTube"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <YouTubeIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTextFieldHookForm
              name="xLink"
              label="Lien X"
              helper="Entrez le lien du profil X"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextFieldHookForm
              name="formHeader"
              label="Titre de formulaire"
              helper="Entrez le titre du formulaire"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextFieldHookForm
              name="formDescription"
              label="Description du formulaire"
              helper="Entrez la description du formulaire"
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextFieldHookForm
              name="footerMessage"
              label="Message de pied de page"
              helper="Entrez le message de pied de page"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Mettre à jour'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default ServiceForm;
