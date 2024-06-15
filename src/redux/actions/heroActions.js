import axiosInstance from 'api/axiosInstance';
import {
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
  FETCH_HERO_FAILURE,
  SELECT_HERO_TO_EDIT
} from '../types/heroTypes';

export const fetchHeroRequest = () => {
  return {
    type: FETCH_HERO_REQUEST
  };
};

export const fetchHeroSuccess = (heroes) => {
  return {
    type: FETCH_HERO_SUCCESS,
    payload: heroes
  };
};

export const fetchHeroFailure = (error) => {
  return {
    type: FETCH_HERO_FAILURE,
    payload: error
  };
};

export const selectHeroToEdit = (data) => {
  return {
    type: SELECT_HERO_TO_EDIT,
    payload: data
  };
};

export const fetchHeroes = () => {
  return (dispatch) => {
    dispatch(fetchHeroRequest());
    axiosInstance.get('/hero')
      .then(response => {
        const heroes = response.data.data;
        dispatch(fetchHeroSuccess(heroes));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchHeroFailure(errorMsg));
      });
  };
};

export const deleteHero = (id) => {
  return (dispatch) => {
    axiosInstance.delete(`/hero/${id}`)
      .then(() => {
        dispatch(fetchHeroes());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchHeroFailure(errorMsg));
      });
  };
};

export const updateHero = (id, updatedHero, setLoading) => {
  return (dispatch) => {
    axiosInstance.put(`/hero/${id}`, updatedHero, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchHeroes());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchHeroFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const createHero = (newHero, setLoading) => {
  return (dispatch) => {
    axiosInstance.post('/hero', newHero, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchHeroes());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchHeroFailure(errorMsg));
        setLoading(false);
      });
  };
};
export const updateStatus = (id) => {
  return (dispatch) => {
    axiosInstance.put(`/hero-status/${id}`)
      .then(() => {
        dispatch(fetchHeroes());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchHeroFailure(errorMsg));
      });
  };
};

export const selectHeroToEdite = (data) => {
  return (dispatch) => {
    dispatch(selectHeroToEdit(data));
  };
};