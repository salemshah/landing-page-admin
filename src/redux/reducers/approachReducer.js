import {
  FETCH_APPROACH_REQUEST,
  FETCH_APPROACH_SUCCESS,
  FETCH_APPROACH_FAILURE,
  SELECT_APPROACH_TO_EDIT
} from '../types/approachTypes';

const initialState = {
  loading: false,
  approaches: [],
  error: '',
  approachToEdit: {},
  isEdit: false,
  approachEditId: null
};

const approachReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_APPROACH_TO_EDIT:
      const {
        description,
        imgUrl,
        _id
      } = action.payload;

      return {
        ...state,
        approachToEdit: {
          description,
          image: imgUrl
        },
        approachEditId: _id,
        isEdit: !!action.payload
      };
    case FETCH_APPROACH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_APPROACH_SUCCESS:
      return {
        approachToEdit: {},
        isEdit: false,
        approachEditId: null,
        loading: false,
        approaches: action.payload,
        error: ''
      };
    case FETCH_APPROACH_FAILURE:
      return {
        loading: false,
        approaches: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default approachReducer;
