import { Component } from '@angular/core';
import { PostAddComponent } from '../post-add/post-add.component';
import { PostListComponent } from '../post-list/post-list.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostAddComponent, PostListComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {}
