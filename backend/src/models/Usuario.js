class Usuario {
  constructor(id, nombre, email, password, rol) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

// Exportamos la clase base
module.exports = Usuario;
