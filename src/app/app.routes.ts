import { Routes } from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { PostComponent } from './posts/post/post.component';
import { provideStore } from '@ngrx/store';
import { postReducer } from './posts/state/post.reducer';

export const routes: Routes = [
  { path: 'permission', component: PermissionComponent },
  {
    path: 'post',
    component: PostComponent,
    providers: [
      provideStore({
        posts: postReducer,
      }),
    ],
  },
  { path: '', redirectTo: 'permission', pathMatch: 'full' },
];
