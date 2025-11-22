import permissionsData from '@/services/mockData/permissions.json';

class PermissionService {
  constructor() {
    this.permissions = [...permissionsData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.permissions];
  }

  async getByRole(role) {
    await this.delay();
    return this.permissions.filter(permission => permission.role === role);
  }

  async hasPermission(role, resource, action, scope = null) {
    await this.delay();
    const permission = this.permissions.find(p => 
      p.role === role && 
      p.resource === resource &&
      (scope ? p.scope === scope : true)
    );
    
    return permission ? permission.actions.includes(action) : false;
  }
}

export default new PermissionService();