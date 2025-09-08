const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularMensual } = require('../static/js/calcularMensual.js');

test('calcula mensual para sueldos', () => {
  assert.equal(calcularMensual('sueldos', 12000), 1000);
});

test('calcula mensual para pensiones', () => {
  assert.equal(calcularMensual('pensiones', 24000), 2000);
});

test('calcula mensual para honorarios aplica descuento', () => {
  assert.equal(calcularMensual('honorarios', 12000), 800);
});

test('calcula mensual default divide por 12', () => {
  assert.equal(calcularMensual('otros', 6000), 500);
});
