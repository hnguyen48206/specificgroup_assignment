import { Component } from '@angular/core';
import { PermissionTreeComponent } from '../utilities/permission-tree/permission-tree.component';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [PermissionTreeComponent],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css',
})
export class PermissionComponent {}
