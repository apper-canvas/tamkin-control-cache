import sitesData from '@/services/mockData/sites.json';

class SiteService {
  constructor() {
    this.sites = [...sitesData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.sites];
  }

  async getByCompanyId(companyId) {
    await this.delay();
    return this.sites.filter(site => site.companyId === companyId);
  }

  async getById(id) {
    await this.delay();
    return this.sites.find(site => site.id === id) || null;
  }

  async create(siteData) {
    await this.delay();
    const newSite = {
      ...siteData,
      id: `site-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.sites.push(newSite);
    return { ...newSite };
  }

  async update(id, siteData) {
    await this.delay();
    const index = this.sites.findIndex(site => site.id === id);
    if (index === -1) {
      throw new Error('Site not found');
    }
    
    const updatedSite = {
      ...this.sites[index],
      ...siteData,
      updatedAt: new Date().toISOString()
    };
    
    this.sites[index] = updatedSite;
    return { ...updatedSite };
  }

  async delete(id) {
    await this.delay();
    const index = this.sites.findIndex(site => site.id === id);
    if (index === -1) {
      throw new Error('Site not found');
    }
    
    this.sites.splice(index, 1);
    return { success: true };
  }
}

export default new SiteService();