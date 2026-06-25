import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jojofx-backend.onrender.com'

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  health: () => apiClient.get('/api/health'),
  signals: {
    create: (data: any) => apiClient.post('/api/signals', data),
    getAll: () => apiClient.get('/api/signals'),
    getOne: (id: string) => apiClient.get(`/api/signals/${id}`),
  },
  trades: {
    create: (data: any) => apiClient.post('/api/trades', data),
    getAll: () => apiClient.get('/api/trades'),
    getOne: (id: string) => apiClient.get(`/api/trades/${id}`),
    update: (id: string, data: any) => apiClient.patch(`/api/trades/${id}`, data),
  },
  rules: {
    getStatus: () => apiClient.get('/api/rules'),
    checkSetup: (data: any) => apiClient.post('/api/rules/check', data),
  },
  market: {
    getPrice: () => apiClient.get('/api/market/price'),
    getAnalysis: () => apiClient.get('/api/market/analysis'),
  },
}
