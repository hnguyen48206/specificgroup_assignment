import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.css',
})
export class PostAddComponent {
  expanded = false;

  toggle() {
    if (this.expanded == false) this.expanded = true;
    else this.expanded = false;
    console.log(this.expanded);
  }
}
