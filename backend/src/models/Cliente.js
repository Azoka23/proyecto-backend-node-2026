const Usuario = require("./Usuario"); // Importamos al "padre"

class Cliente extends Usuario {
  constructor(id, nombre, email, password, direccion, telefono) {
    // El "cliente" siempre nace con el rol "cliente" fijo
    super(id, nombre, email, password, "cliente");
    this.direccion = direccion;
    this.telefono = telefono;
    this.carrito = [];
  }
}

module.exports = Cliente;
