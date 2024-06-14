import {
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
  FETCH_HERO_FAILURE,
  SELECT_HERO_TO_EDIT
} from '../types/heroTypes';

const initialState = {
  loading: false,
  heroes: [],
  error: '',
  heroToEdit: {},
  isEdit: false,
  heroEditId: null
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_HERO_TO_EDIT:
      const {
        description,
        heading,
        imgUrl,
        textAnim1,
        textAnim2,
        _id
      } = action.payload;

      console.log({ pay: action.payload });
      return {
        ...state,
        heroToEdit: {
          description,
          heading,
          image: imgUrl,
          textAnim1,
          textAnim2
        },
        heroEditId: _id,
        isEdit: !!action.payload
      };
    case FETCH_HERO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_HERO_SUCCESS:
      return {
        heroToEdit: {},
        isEdit: false,
        heroEditId: null,
        loading: false,
        heroes: action.payload,
        error: ''
      };
    case FETCH_HERO_FAILURE:
      return {
        loading: false,
        heroes: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default heroReducer;
