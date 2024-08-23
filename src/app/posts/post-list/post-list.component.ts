import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../post.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch({
      type: 'LOAD_POSTS',
    });
    this.store.subscribe((state) => {
      let tmp = <any>state;
      this.posts = tmp.posts.post;
    });
  }
}
