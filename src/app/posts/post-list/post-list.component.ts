import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../post.model';
import { CommonModule } from '@angular/common';
import * as postActions from '../state/post.action';
import { PaginationComponent } from '../../utilities/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule],
  providers: [provideAnimations(), Store, ToastrService],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  totalItems = 0;
  itemsPerPage = 5;
  currentPage = 1;
  searchTerm = '';
  postsForDisplay: Post[] = [];
  posts: Post[] = [];

  private searchTerms = new Subject<string>();
  filteredData: Post[] = [];

  constructor(private store: Store<any>, private toastr: ToastrService) {}

  ngOnInit() {
    this.store.dispatch(new postActions.LoadPosts());
    this.store.subscribe((state) => {
      console.log(state);
      if (state.posts.error != '') this.toastr.error('Fail to load posts');
      else if (state.posts.loaded && state.posts.posts.length > 0) {
        this.posts = state.posts.posts;
        this.totalItems = this.posts.length;
        this.changeDisplayData();
        this.toastr.success('Successfully load posts');
      }
    });

    this.searchTerms
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => this.search(term))
      )
      .subscribe((results) => {
        this.filteredData.push(results);
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.changeDisplayData();
  }
  changeDisplayData() {
    let start = (this.currentPage - 1) * this.itemsPerPage;
    let end = start + this.itemsPerPage;
    this.postsForDisplay = this.posts.slice(start, end);
    this.filteredData = this.postsForDisplay;
  }

  onSearch(event: any): void {
    this.searchTerms.next(event.target.value);
  }

  search(term: string): Post[] {
    this.filteredData = [];
    if (!term.trim() || term == '') {
      return this.postsForDisplay;
    }
    let result = this.postsForDisplay.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    return result;
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredData = this.postsForDisplay;
  }
}
