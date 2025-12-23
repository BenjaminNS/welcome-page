var tl=gsap.timeline();
class tarjetaVirtual {
  constructor(codigotarjeta, titulartarjeta, fechavencimiento, cvc) {
  	this.codigotarjeta = codigotarjeta;
  	this.titulartarjeta = titulartarjeta;
  	this.fechavencimiento = fechavencimiento;
  	this.cvc = cvc;
  }
};

const tarjeta = new tarjetaVirtual(document.querySelectorAll('[data-text="codigotarjeta"]'),
	document.querySelectorAll('[data-text="titulartarjeta"]'),
	document.querySelectorAll('[data-text="fechavencimiento"]'),
	document.querySelectorAll('[data-text="cvc"]'));
console.log('Tarjeta: ', tarjeta);

const tamanoMovil = 992;
if (window.innerWidth > tamanoMovil){
	animarPaginaEscritorio();
} else{
	animarPaginaMovil();
}

function animarPaginaEscritorio(){
	tl.set('.form',{
		'y': '50px',
		'opacity': 0,
	});
	tl.from('.fondo-gradiente',{
		'x': '-100%',
		'delay': .3,
		'duration': .8,
	}).from('.logo', {
		'x': '-50px',
		'opacity': 0,
		'delay': 0,
		'duration': .5,
	}).from('.credit-card',{
		'--separacionTarjeta': '60px',
		'opacity': 0,
		'delay': 0,
		'duration': .8,
	}).to('.form',{
		'y': '0px',
		'opacity': 1,
		'delay': -.8,
		'duration': .8,
	});
}
function animarPaginaMovil(){
	tl.set('.form',{
		'y': '50px',
		'opacity': 0,
	});
	tl.from('.fondo-gradiente',{
		'y': '-100%',
		'delay': .3,
		'duration': .8,
	}).from('.logo', {
		'y': '-50px',
		'opacity': 0,
		'delay': 0,
		'duration': .5,
	}).from('.credit-card',{
		'--separacionTarjeta': '60px',
		'opacity': 0,
		'delay': 0,
		'duration': .8,
	}).to('.form',{
		'y': '0px',
		'opacity': 1,
		'delay': -.8,
		'duration': .8,
	});
}

let inputsTexto = document.querySelectorAll('input[type="text"]');
for (var i = 0; i < inputsTexto.length; i++) {
	inputsTexto[i].addEventListener("keydown", usuarioTecleoInput, false);
	inputsTexto[i].addEventListener("keyup", usuarioSoltoInput, false);
}
document.querySelector('[name="fechavencimientomes"]').addEventListener("change", usuarioCambioOpcionSeleccionada, false);

// EVENTOS TECLEADO
function usuarioTecleoInput(event){
	// console.log('event: ', event);
	// VERIFICACION DE TECLEADO
	if ( esTeclaEspecial(event.key) ) {
		// console.log('Es tecla especial');
		return;
	}
	if( !esCaracterValido(event.key, event) ){
		event.preventDefault();
		return;
	}
}
function esTeclaEspecial(teclaPulsada) {
	let teclasEspeciales = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Backspace", "Delete", "Shift", "Control", "Alt", "AltGraph", "Home", "End", "Meta", "PageDown", "PageUp", "Unidentified", "NumLock", "CapsLock", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

	for (var i = 0; i < teclasEspeciales.length; i++) {
		if ( teclaPulsada == teclasEspeciales[i] ) {
			return true;
		}
	}

	return false;
}

function esCaracterValido(letra, event){
	const regex = new RegExp(event.target.getAttribute('letras'));
	const found = letra.match(regex);
	if ( found != null || event.ctrlKey ) {
		// console.log(regex, 'Cadena encontrada: ', found);
		return true;
	} else{
		// console.log(regex, 'No se encontró el patrón esperado.');
		return false;
	}
}
function usuarioSoltoInput(event){
	let querySelectorTxt = '[data-text="'+event.target.getAttribute('name')+'"]';
	actualizarTextos(event.target.value, document.querySelector(querySelectorTxt));
}

// EVENTOS CHANGE
function usuarioCambioOpcionSeleccionada(event){
	console.log('Usuario cambio la opción seleccionada', event.target, event.target.value );

	let querySelectorTxt = '[data-text="' + event.target.getAttribute('name') + '"]';
	actualizarTextos(event.target.value, document.querySelector(querySelectorTxt));
}

// ACTUALIZAR TARJETA VIRTUAL
function actualizarTextos(texto, elementoHtml){
	elementoHtml.innerHTML = texto;
}