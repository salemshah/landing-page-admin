import axiosInstance from 'api/axiosInstance';
import {
  FETCH_ABOUT_REQUEST,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  SELECT_ABOUT_TO_EDIT
} from '../types/aboutTypes';

export const fetchAboutRequest = () => {
  return {
    type: FETCH_ABOUT_REQUEST
  };
};

export const fetchAboutSuccess = (abouts) => {
  return {
    type: FETCH_ABOUT_SUCCESS,
    payload: abouts
  };
};

export const fetchAboutFailure = (error) => {
  return {
    type: FETCH_ABOUT_FAILURE,
    payload: error
  };
};

export const selectAboutToEdit = (data) => {
  return {
    type: SELECT_ABOUT_TO_EDIT,
    payload: data
  };
};

export const fetchAbouts = () => {
  return (dispatch) => {
    dispatch(fetchAboutRequest());
    axiosInstance.get('/about')
      .then(response => {
        const abouts = response.data.data;
        dispatch(fetchAboutSuccess(abouts));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAboutFailure(errorMsg));
      });
  };
};

export const deleteAbout = (id) => {
  return (dispatch) => {
    axiosInstance.delete(`/about/${id}`)
      .then(() => {
        dispatch(fetchAbouts());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAboutFailure(errorMsg));
      });
  };
};

export const updateAbout = (id, updatedAbout, setLoading) => {
  return (dispatch) => {
    axiosInstance.put(`/about/${id}`, updatedAbout, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchAbouts());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAboutFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const createAbout = (newAbout, setLoading) => {
  return (dispatch) => {
    axiosInstance.post('/about', newAbout, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchAbouts());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAboutFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const updateStatus = (id) => {
  return (dispatch) => {
    axiosInstance.put(`/about-status/${id}`)
      .then(() => {
        dispatch(fetchAbouts());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAboutFailure(errorMsg));
      });
  };
};

export const selectAboutToEdite = (data) => {
  return (dispatch) => {
    dispatch(selectAboutToEdit(data));
  };
};
