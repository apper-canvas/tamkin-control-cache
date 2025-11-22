import usersData from '@/services/mockData/users.json';

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.users];
  }

  async getByCompanyId(companyId) {
    await this.delay();
    return this.users.filter(user => user.companyId === companyId);
  }

  async getBySiteId(siteId) {
    await this.delay();
    return this.users.filter(user => user.siteId === siteId);
  }

  async getById(id) {
    await this.delay();
    return this.users.find(user => user.id === id) || null;
  }

  async create(userData) {
    await this.delay();
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      lastLogin: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await this.delay();
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    this.users[index] = updatedUser;
    return { ...updatedUser };
  }

  async delete(id) {
    await this.delay();
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users.splice(index, 1);
    return { success: true };
  }
}

export default new UserService();