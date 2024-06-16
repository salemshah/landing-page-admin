import axiosInstance from 'api/axiosInstance';
import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  SELECT_MESSAGE_TO_EDIT
} from '../types/messageTypes';

export const fetchMessageRequest = () => {
  return {
    type: FETCH_MESSAGE_REQUEST
  };
};

export const fetchMessageSuccess = (messages) => {
  return {
    type: FETCH_MESSAGE_SUCCESS,
    payload: messages
  };
};

export const fetchMessageFailure = (error) => {
  return {
    type: FETCH_MESSAGE_FAILURE,
    payload: error
  };
};

export const selectMessageToEdit = (data) => {
  return {
    type: SELECT_MESSAGE_TO_EDIT,
    payload: data
  };
};

export const fetchMessages = () => {
  return (dispatch) => {
    dispatch(fetchMessageRequest());
    axiosInstance.get('/message')
      .then(response => {
        const messages = response.data.data;
        dispatch(fetchMessageSuccess(messages));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchMessageFailure(errorMsg));
      });
  };
};

export const deleteMessage = (id) => {
  return (dispatch) => {
    axiosInstance.delete(`/message/${id}`)
      .then(() => {
        dispatch(fetchMessages());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchMessageFailure(errorMsg));
      });
  };
};

export const updateMessage = (id) => {
  return (dispatch) => {
    axiosInstance.put(`/message/${id}`)
      .then(() => {
        dispatch(fetchMessages());
      }).catch(error => {
      const errorMsg = error.message;
      dispatch(fetchMessageFailure(errorMsg));
    });
  };
};

export const createMessage = (newMessage, setLoading) => {
  return (dispatch) => {
    axiosInstance.post('/message', newMessage)
      .then(() => {
        dispatch(fetchMessages());
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchMessageFailure(errorMsg));
        setLoading(false);
      });
  };
};

export const selectMessageToEdite = (data) => {
  return (dispatch) => {
    dispatch(selectMessageToEdit(data));
  };
};
