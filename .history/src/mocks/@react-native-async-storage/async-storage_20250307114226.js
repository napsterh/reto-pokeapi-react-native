const mockAsyncStorage = {
    getItem: jest.fn(() => Promise.resolve(null)), // Simula que no hay datos almacenados
    setItem: jest.fn(() => Promise.resolve()),    // Simula una operación de guardado exitosa
    removeItem: jest.fn(() => Promise.resolve()), // Simula una operación de eliminación exitosa
  };
  export default mockAsyncStorage;