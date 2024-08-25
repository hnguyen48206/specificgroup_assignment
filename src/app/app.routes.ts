import { Routes } from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { PostComponent } from './posts/post/post.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from './posts/state/post.reducer';
import { PostEffect } from './posts/state/post.effect';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  { path: 'permission', component: PermissionComponent },
  {
    path: 'post',
    component: PostComponent,
    providers: [
      importProvidersFrom(StoreModule.forFeature('posts', postReducer)),
      importProvidersFrom(EffectsModule.forFeature([PostEffect])),
    ],
  },
  { path: '', redirectTo: 'permission', pathMatch: 'full' },
];
