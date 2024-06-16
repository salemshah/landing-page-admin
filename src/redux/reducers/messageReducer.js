import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  SELECT_MESSAGE_TO_EDIT
} from '../types/messageTypes';

const initialState = {
  loading: false,
  messages: [],
  error: '',
  messageToEdit: {},
  isEdit: false,
  messageEditId: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MESSAGE_TO_EDIT:
      const {
        name,
        lastName,
        email,
        subject,
        message,
        _id
      } = action.payload;

      return {
        ...state,
        messageToEdit: {
          name,
          lastName,
          email,
          subject,
          message
        },
        messageEditId: _id,
        isEdit: !!action.payload
      };
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        messageToEdit: {},
        isEdit: false,
        messageEditId: null,
        loading: false,
        messages: action.payload,
        error: ''
      };
    case FETCH_MESSAGE_FAILURE:
      return {
        loading: false,
        messages: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default messageReducer;
