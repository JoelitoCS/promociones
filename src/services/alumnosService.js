
const API_URL = 'http://localhost:3000'; // Aqui ponemos el puerto q utilicemos, en mi caso utilizare el 3000

export const alumnosService = {
  // Obtener todos los alumnos
  async obtenerTodos() {
    try {

      const respuesta = await fetch(`${API_URL}/api/alumnos`);

      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener alumno por ID
  async obtenerPorId(id) {
    try {

      const respuesta = await fetch(`${API_URL}/api/alumnos/${id}`);

      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);
      throw error;
    }
  },

  // Buscar alumnos por nombre
  async buscarPorNombre(nombre) {
    try {

      const respuesta = await fetch(`${API_URL}/api/alumnos/buscar?q=${nombre}`);
     
      return await respuesta.json();

    } catch (error) {
      
      console.error('Error:', error);
      throw error;
    }
  },

  // Filtrar por promoción

  async filtrarPorPromocion(promocion) {
    try {

      const respuesta = await fetch(`${API_URL}/api/alumnos/promocion/${promocion}`);
      
      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);
      throw error;
    }
  },

  // Crear alumno
  async crear(alumno) {
    try {

      const respuesta = await fetch(`${API_URL}/api/alumnos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno),
      });
      
      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);
      throw error;
    }
  },

  // Actualizar alumno
  async actualizar(id, alumno) {
    try {
      const respuesta = await fetch(`${API_URL}/api/alumnos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno),
      });
      
      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);

      throw error;
    }
  },

  // Eliminar alumno
  async eliminar(id) {
    try {
      const respuesta = await fetch(`${API_URL}/api/alumnos/${id}`, {
        method: 'DELETE',
      });
      
      return await respuesta.json();

    } catch (error) {

      console.error('Error:', error);

      throw error;
    }
  }
};