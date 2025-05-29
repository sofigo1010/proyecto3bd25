// src/lib/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    return Promise.reject(error);
  }
);

// Servicios de API
export const puzzleAPI = {
  // Crear un nuevo puzzle
  createPuzzle: async (puzzleData) => {
    try {
      const response = await api.post('/puzzle', puzzleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creando puzzle');
    }
  },

  // Obtener todos los puzzles
  getAllPuzzles: async () => {
    try {
      const response = await api.get('/puzzles');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error obteniendo puzzles');
    }
  },

  // Crear una pieza
  createPiece: async (pieceData) => {
    try {
      const response = await api.post('/pieza', pieceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creando pieza');
    }
  },

  // Obtener piezas de un puzzle
  getPieces: async (puzzleName) => {
    try {
      const response = await api.get(`/piezas/${encodeURIComponent(puzzleName)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error obteniendo piezas');
    }
  },

  // Crear conexión entre piezas
  createConnection: async (connectionData) => {
    try {
      const response = await api.post('/match', connectionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creando conexión');
    }
  },

  // Crear múltiples conexiones
  createMultipleConnections: async (puzzleName, connections) => {
    try {
      const response = await api.post('/conexiones', {
        puzzle_name: puzzleName,
        connections: connections
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creando conexiones');
    }
  },

  // Armar puzzle desde una pieza inicial
  solvePuzzle: async (initialPiece) => {
    try {
      const response = await api.get(`/armar/${encodeURIComponent(initialPiece)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error armando puzzle');
    }
  },

  // Verificar conexión con el backend
  checkConnection: async () => {
    try {
      const response = await api.get('/');
      return { success: true, message: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default api;