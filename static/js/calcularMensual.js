function calcularMensual(tipo, anual) {
  switch (tipo) {
    case "sueldos":
    case "pensiones":
      return anual / 12;
    case "honorarios":
      return (anual / 12) * 0.8; // descuento 20%
    default:
      return anual / 12;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcularMensual };
} else {
  window.calcularMensual = calcularMensual;
}
