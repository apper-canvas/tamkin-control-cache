import companiesData from '@/services/mockData/companies.json';

class CompanyService {
  constructor() {
    this.companies = [...companiesData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.companies];
  }

  async getById(id) {
    await this.delay();
    return this.companies.find(company => company.id === id) || null;
  }

  async create(companyData) {
    await this.delay();
    const newCompany = {
      ...companyData,
      id: `company-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.companies.push(newCompany);
    return { ...newCompany };
  }

  async update(id, companyData) {
    await this.delay();
    const index = this.companies.findIndex(company => company.id === id);
    if (index === -1) {
      throw new Error('Company not found');
    }
    
    const updatedCompany = {
      ...this.companies[index],
      ...companyData,
      updatedAt: new Date().toISOString()
    };
    
    this.companies[index] = updatedCompany;
    return { ...updatedCompany };
  }

  async delete(id) {
    await this.delay();
    const index = this.companies.findIndex(company => company.id === id);
    if (index === -1) {
      throw new Error('Company not found');
    }
    
    this.companies.splice(index, 1);
    return { success: true };
  }
}

export default new CompanyService();