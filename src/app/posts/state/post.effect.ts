import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostService } from '../post.service';
import * as postActions from '../state/post.action';
import { Post } from '../post.model';

@Injectable()
export class PostEffect {
  private actions$ = inject(Actions);
  constructor(private postService: PostService) {}

  loadPosts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<postActions.LoadPosts>(postActions.PostActionType.LOAD_POSTS),
      mergeMap((action: postActions.LoadPosts) =>
        this.postService.getPosts().pipe(
          map((posts: Post[]) => new postActions.LoadPostsSuccess(posts)),
          catchError((err) => of(new postActions.LoadPostsFail(err)))
        )
      )
    )
  );

  //   @Effect()
  //   createCustomer$: Observable<Action> = this.actions$.pipe(
  //     ofType<customerActions.CreateCustomer>(
  //       customerActions.CustomerActionTypes.CREATE_CUSTOMER
  //     ),
  //     map((action: customerActions.CreateCustomer) => action.payload),
  //     mergeMap((customer: Customer) =>
  //       this.customerService.createCustomer(customer).pipe(
  //         map(
  //           (newCustomer: Customer) =>
  //             new customerActions.CreateCustomerSuccess(newCustomer)
  //         ),
  //         catchError(err => of(new customerActions.CreateCustomerFail(err)))
  //       )
  //     )
  //   );

  //   @Effect()
  //   updateCustomer$: Observable<Action> = this.actions$.pipe(
  //     ofType<customerActions.UpdateCustomer>(
  //       customerActions.CustomerActionTypes.UPDATE_CUSTOMER
  //     ),
  //     map((action: customerActions.UpdateCustomer) => action.payload),
  //     mergeMap((customer: Customer) =>
  //       this.customerService.updateCustomer(customer).pipe(
  //         map(
  //           (updateCustomer: Customer) =>
  //             new customerActions.UpdateCustomerSuccess({
  //               id: updateCustomer.id,
  //               changes: updateCustomer
  //             })
  //         ),
  //         catchError(err => of(new customerActions.UpdateCustomerFail(err)))
  //       )
  //     )
  //   );

  //   @Effect()
  //   deleteCustomer$: Observable<Action> = this.actions$.pipe(
  //     ofType<customerActions.DeleteCustomer>(
  //       customerActions.CustomerActionTypes.DELETE_CUSTOMER
  //     ),
  //     map((action: customerActions.DeleteCustomer) => action.payload),
  //     mergeMap((id: number) =>
  //       this.customerService.deleteCustomer(id).pipe(
  //         map(() => new customerActions.DeleteCustomerSuccess(id)),
  //         catchError(err => of(new customerActions.DeleteCustomerFail(err)))
  //       )
  //     )
  //   );
}
