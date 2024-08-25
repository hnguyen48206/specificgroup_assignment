import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { GeneralService } from '../../general.service';

interface PermissionNode {
  name: string;
  children?: PermissionNode[];
}

@Component({
  selector: 'app-permission-tree',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  providers: [GeneralService],
  templateUrl: './permission-tree.component.html',
  styleUrl: './permission-tree.component.css',
})
export class PermissionTreeComponent {
  treeData: PermissionNode[] = [];

  selectedPermissions: string[] = [];

  toggleSelection(event: { node: PermissionNode; path: string }) {
    const { node, path } = event;
    if (this.selectedPermissions.includes(path)) {
      this.deselectNode(node, path);
    } else {
      this.selectNode(node, path);
    }
    console.log(this.selectedPermissions);
  }

  selectNode(node: PermissionNode, path: string) {
    if (!this.selectedPermissions.includes(path)) {
      this.selectedPermissions.push(path);
    }
    if (node.children) {
      node.children.forEach((child) => {
        const childPath = `${path}.${child.name}`;
        this.selectNode(child, childPath);
      });
    }
  }

  deselectNode(node: PermissionNode, path: string) {
    this.selectedPermissions = this.selectedPermissions.filter(
      (p) => p !== path
    );
    if (node.children) {
      node.children.forEach((child) => {
        const childPath = `${path}.${child.name}`;
        this.deselectNode(child, childPath);
      });
    }
  }
  transformData(permissions: string[]) {
    const root: PermissionNode[] = [];

    permissions.forEach((permission) => {
      const parts = permission.split('.');
      let currentLevel = root;

      parts.forEach((part, index) => {
        let existingNode = currentLevel.find((node) => node.name === part);

        if (!existingNode) {
          existingNode = { name: part, children: [] };
          currentLevel.push(existingNode);
        }

        if (index === parts.length - 1) {
          delete existingNode.children;
        } else {
          currentLevel = existingNode.children!;
        }
      });
    });

    this.treeData = root;
  }
  constructor(private generalService: GeneralService) {
    this.loadTreeData();
  }

  async loadTreeData() {
    let res = (await this.generalService.loadPermission()) as string[];
    this.transformData(res);
  }
}
