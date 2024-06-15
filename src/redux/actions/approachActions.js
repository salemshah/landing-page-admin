import axiosInstance from 'api/axiosInstance';
import {
  FETCH_APPROACH_REQUEST,
  FETCH_APPROACH_SUCCESS,
  FETCH_APPROACH_FAILURE,
  SELECT_APPROACH_TO_EDIT
} from '../types/approachTypes';

export const fetchApproachRequest = () => {
  return {
    type: FETCH_APPROACH_REQUEST
  };
};

export const fetchApproachSuccess = (approaches) => {
  return {
    type: FETCH_APPROACH_SUCCESS,
    payload: approaches
  };
};

export const fetchApproachFailure = (error) => {
  return {
    type: FETCH_APPROACH_FAILURE,
    payload: error
  };
};

export const approachToEdit = (data) => {
  return {
    type: SELECT_APPROACH_TO_EDIT,
    payload: data
  };
};

export const fetchApproaches = () => {
  return (dispatch) => {
    dispatch(fetchApproachRequest());
    axiosInstance.get('/approach')
      .then(response => {
        const approaches = response.data.data;
        dispatch(fetchApproachSuccess(approaches));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApproachFailure(errorMsg));
      });
  };
};

export const deleteApproach = (id) => {
  return (dispatch) => {
    axiosInstance.delete(`/approach/${id}`)
      .then(() => {
        dispatch(fetchApproaches());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApproachFailure(errorMsg));
      });
  };
};

export const updateApproach = (id, updatedApproach, setLoading) => {
  return (dispatch) => {
    axiosInstance.put(`/approach/${id}`, updatedApproach, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchApproaches());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApproachFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const createApproach = (newApproach, setLoading) => {
  return (dispatch) => {
    axiosInstance.post('/approach', newApproach, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        dispatch(fetchApproaches());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApproachFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const updateStatus = (id) => {
  return (dispatch) => {
    axiosInstance.put(`/approach-status/${id}`)
      .then(() => {
        dispatch(fetchApproaches());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApproachFailure(errorMsg));
      });
  };
};

export const selectApproachToEdit = (data) => {
  return (dispatch) => {
    dispatch(approachToEdit(data));
  };
};
