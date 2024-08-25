import { PostState } from '../state/post.state';
import { PostActions } from './post.action';
import { PostActionType } from './post.action';
const initialState: PostState = {
  posts: [],
  loading: false,
  loaded: false,
  error: '',
};

export function postReducer(
  state: PostState = initialState,
  action: PostActions
): PostState {
  switch (action.type) {
    case PostActionType.LOAD_POSTS:
      return {
        ...state,
        loading: true,
      };

    case PostActionType.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: action.payload,
      };

    case PostActionType.LOAD_POSTS_FAIL:
      return {
        ...state,
        posts: [],
        loading: false,
        loaded: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
