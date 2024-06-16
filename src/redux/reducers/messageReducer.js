import {
  FETCH_ABOUT_REQUEST,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  SELECT_ABOUT_TO_EDIT
} from '../types/aboutTypes';

const initialState = {
  loading: false,
  abouts: [],
  error: '',
  aboutToEdit: {},
  isEdit: false,
  aboutEditId: null
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ABOUT_TO_EDIT:
      const {
        description,
        imgUrl,
        _id
      } = action.payload;

      return {
        ...state,
        aboutToEdit: {
          description,
          image: imgUrl
        },
        aboutEditId: _id,
        isEdit: !!action.payload
      };
    case FETCH_ABOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ABOUT_SUCCESS:
      return {
        aboutToEdit: {},
        isEdit: false,
        aboutEditId: null,
        loading: false,
        abouts: action.payload,
        error: ''
      };
    case FETCH_ABOUT_FAILURE:
      return {
        loading: false,
        abouts: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default aboutReducer;
