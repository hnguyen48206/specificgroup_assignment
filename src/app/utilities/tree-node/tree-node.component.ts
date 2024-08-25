import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface PermissionNode {
  name: string;
  children?: PermissionNode[];
}

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css',
})
export class TreeNodeComponent {
  @Input() node: PermissionNode = { name: '' };
  @Input() parentPath: string = '';
  @Input() selectedPermissions: string[] = [];
  @Output() toggle = new EventEmitter<{ node: PermissionNode; path: string }>();

  get isChecked(): boolean {
    const path = this.parentPath
      ? `${this.parentPath}.${this.node.name}`
      : this.node.name;
    return this.selectedPermissions.includes(path);
  }

  get isIndeterminate(): boolean {
    if (!this.node.children) {
      return false;
    }
    const path = this.parentPath
      ? `${this.parentPath}.${this.node.name}`
      : this.node.name;
    const descendants = this.getDescendants(this.node, path);
    const selectedDescendants = descendants.filter((descendant) =>
      this.selectedPermissions.includes(descendant)
    );
    return (
      selectedDescendants.length > 0 &&
      selectedDescendants.length < descendants.length
    );
  }

  toggleSelection(node: PermissionNode) {
    const path = this.parentPath
      ? `${this.parentPath}.${node.name}`
      : node.name;
    this.toggle.emit({ node, path });
  }

  private getDescendants(node: PermissionNode, path: string): string[] {
    let descendants: string[] = [];
    if (node.children) {
      node.children.forEach((child) => {
        const childPath = `${path}.${child.name}`;
        descendants.push(childPath);
        descendants = descendants.concat(this.getDescendants(child, childPath));
      });
    }
    return descendants;
  }
}
