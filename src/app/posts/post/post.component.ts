import { Component } from '@angular/core';
import { PostAddComponent } from '../post-add/post-add.component';
import { PostListComponent } from '../post-list/post-list.component';
import { PostEditComponent } from '../post-edit/post-edit.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostAddComponent, PostListComponent, PostEditComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {}
