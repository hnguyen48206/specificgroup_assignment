import { Post } from '../post.model';

const initialState = {
  posts: [],
  loading: false,
  loaded: true,
};

export function postReducer(state = initialState, action: { type: any }) {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    default:
      return state;
  }
}
