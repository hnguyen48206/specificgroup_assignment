import { Action } from '@ngrx/store';
import { Post } from '../post.model';
export enum PostActionType {
  LOAD_POSTS = '[Post] Load Posts',
  LOAD_POSTS_SUCCESS = '[Post] Load Posts Success',
  LOAD_POSTS_FAIL = '[Post] Load Posts Fail',
}
export class LoadPosts implements Action {
  readonly type = PostActionType.LOAD_POSTS;
}
export class LoadPostsSuccess implements Action {
  readonly type = PostActionType.LOAD_POSTS_SUCCESS;
  constructor(public payload: Post[]) {}
}
export class LoadPostsFail implements Action {
  readonly type = PostActionType.LOAD_POSTS_FAIL;
  constructor(public payload: string) {}
}

export type PostActions = LoadPosts | LoadPostsSuccess | LoadPostsFail;
