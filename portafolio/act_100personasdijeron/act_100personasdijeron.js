window.addEventListener('load', function () {
	// VARIABLES Y CONSTANTES
	const modalInfo = $('#modal-info');
	let paginaData;
	const textoTiempohtml = $('[data-text="tiempo"]');
	textoTiempohtml.text('');
	const textoPreguntahtml = $('[data-text="texto-pregunta"]');
	const flipcardRespuestahtml = $('.flipcard-respuesta').clone();
	$('.flipcard-respuesta').remove();
	const errorhtml = $('.error-elemento').clone();
	$('.error-elemento').remove();
	const seccionRespuestashtml = $('.seccion-respuestas');
	const inputRespuestahtml = $('[name="respuesta-usuario"]');
	let preguntaActual=0;
	let erroresActuales=0;
	let puntosActuales = 0;
	let tiempoRestante=0;
	let timerActividad;
    let tiempoCorriendoSFX=true;

	let infoActividad={};
	let pruebaLocal=true;
	const milisegundosSegundo = 1200;

	// MUSICA y SONIDO
	const musicPlayer = $('#musicPlayer')[0];
    $('#musicPlayer').prop('volume', .2);
	const sfxPlayer = $('#sfxPlayer')[0];
	const sfxPlayer2 = $('#sfxPlayer2')[0];
	const listaSFX = {
		"respuestaCorrecta": "sfx/sfx_respuestacorrecta.wav",
		"respuestaIncorrecta": "sfx/sfx_respuestaincorrecta.wav",
		"respuestaRepetida": "sfx/sfx_respuestarepetida.wav",
		"tiempoCorriendo": "sfx/sfx_tiempocorriendo.wav",
		"aplausos": "sfx/sfx_genteaplausos.wav",
		"genteDecepcionada": "sfx/sfx_gentedecepcionada.wav",
		"flipcardGenerada": "sfx/sfx_flipcardgenerado.wav",
		"responderHabilitado": "sfx/sfx_responderhabilitado.wav"
	}
	let nombrePagina;

	$('#modal-info').on('hidden.bs.modal', ()=>{
		$('#modal-info').off('hidden.bs.modal');
		iniciarJuego();
	});

	// FUNCIONES
	async function iniciarPagina(){

		paginaData = {
			"puntosActividad": 10,
			"maximoErrores": 3,
			"tiempoRespuestas": 25,
			"preguntas": [{
				"texto": "Los 3 colores de la bandera de México",
				"retropositiva": "Esos son los 3 colores de la bandera mexicana.",
				"retronegativa": "Verde, blanco y rojo",
				"respuestas": [
					{"texto": "Verde", "puntos": 34},
					{"texto": "Blanco", "puntos": 33},
					{"texto": "Rojo", "puntos": 33}
				]
			}, {
				"texto": "5 idiomas más hablados del mundo",
				"retropositiva": "Esos son los idiomas más hablados del mundo.",
				"retronegativa": "Los idiomas más hablados son:<br>Inglés, Chino, Hindi, Español, Arabe",
				"respuestas": [
					{"texto": "Inglés", "puntos": 30},
					{"texto": "Chino", "puntos": 25},
					{"texto": "Hindi", "puntos": 20},
					{"texto": "Español", "puntos": 15},
					{"texto": "Arabe", "puntos": 10},
				]
			},]
		}
		console.log('paginaData: ', paginaData);
		$('#modal-info').modal('show');
	}

	iniciarPagina();

	function iniciarJuego(){
		musicPlayer.play();
		console.log('Inicia juego 100 personas dijeron');
		for (let i = 0; i < paginaData.maximoErrores; i++) {
			let tempErrorHtml = errorhtml.clone();
			$('.seccion-errores').append(tempErrorHtml);
		}

		inputRespuestahtml.on('keypress', function(e){
			if(e.key == 'Enter'){
				$('[btn-responder]').click();
			}
		});

		$('[btn-responder]').on('click', function(){
			let tempRespuestas = paginaData.preguntas[preguntaActual].respuestas;
			for (let i = 0; i < tempRespuestas.length; i++) {

				let tempRespuestaUsuario = estandarizarTexto(inputRespuestahtml.val());
				let tempRespuestaAct = estandarizarTexto(tempRespuestas[i].texto);

				if( tempRespuestaAct ===  tempRespuestaUsuario ){
					let tempRespuestahtml = $('.flipcard-respuesta').eq(i);

					// RESPUESTA REPETIDA
					if ( tempRespuestahtml.eq(0).attr('respondido') ) {
						gsap.to(tempRespuestahtml , {
						    x: -10,
						    repeat: 5,
						    yoyo: true,
						    duration: 0.1,
						    ease: "power2.inOut",
						});
						inputRespuestahtml.val('');
						reproducirAudio(sfxPlayer, listaSFX.respuestaRepetida);
						return;
					}

					$('.flipcard-respuesta').eq(i).attr('respondido', 'true');
					puntosActuales += tempRespuestas[i].puntos;
					$('.seccion-puntaje').text(puntosActuales);

                    tiempoCorriendoSFX=true;
                    pararAudio(sfxPlayer2);

					let cantidadRespuestasCorrectas = $('.flip-card[respondido="true"]').length;
					if( cantidadRespuestasCorrectas >= paginaData.preguntas[preguntaActual].respuestas.length ){
						mostrarRetroCorrecta();
					} else{
						reproducirAudio(sfxPlayer, listaSFX.respuestaCorrecta);
						reiniciarContador();
					}
					inputRespuestahtml.val('');
					return;
				}
			}

			inputRespuestahtml.val('');
			marcarError();
		});

		cargarPregunta(paginaData.preguntas[preguntaActual]);
	}

	function cargarPregunta(pregunta){
		inputRespuestahtml.prop('disabled', true);

		erroresActuales = 0;
		$('.error-elemento .flip-card-inner').css('transform', 'rotateX(0deg)');
		// console.log('Objeto Pregunta: ', pregunta);
		textoPreguntahtml.text('');
		const palabras=pregunta.texto.split(' ');

		palabras.forEach(palabra => {
			const palabraSpan = document.createElement("span");
			palabraSpan.innerText = `${palabra} `;
			textoPreguntahtml.append(palabraSpan);
		});

		// FLIPCARDS RESPUESTAS
		$('.flipcard-respuesta').remove();
			pregunta.respuestas.forEach(respuesta => {
			let tempFlipcard = flipcardRespuestahtml.clone();
			$(tempFlipcard).find('[data-text="respuesta"]').text(respuesta.texto);
			$(tempFlipcard).find('[data-text="puntos"]').text(respuesta.puntos);
			seccionRespuestashtml.append(tempFlipcard);
		});
		
		
		gsap.timeline().from('[data-text="texto-pregunta"] span', {
			opacity: 0,
			duration: .4,
			y: 15,
			stagger: 0.15,
			ease: "linear",
		}).from('.flipcard-respuesta',{
			scale: 0,
			duration: .5,
			ease: 'power3',
			stagger: .2,
			onComplete: habilitarResponder
		});

		// FLIPCARDS ERRORES
		$('.error-elemento').css('transform', 'rotateX(0deg)');
	}

	function habilitarResponder(){
		reproducirAudio(sfxPlayer, listaSFX.responderHabilitado);
		reiniciarContador();
	}

	function marcarError(){
        tiempoCorriendoSFX=true;
        pararAudio(sfxPlayer2);

		$('.error-elemento').eq(erroresActuales).find('.flip-card-inner').css('transform', 'rotateX(180deg)');
		erroresActuales++;
		if( erroresActuales >= paginaData.maximoErrores ){
			mostrarRetroIncorrecta();
		} else{
			reproducirAudio(sfxPlayer, listaSFX.respuestaIncorrecta);
			reiniciarContador();
		}
	}
	function reiniciarContador(){
		inputRespuestahtml.prop('disabled', true);

		clearInterval(timerActividad);
		textoTiempohtml.text('');
		setTimeout(()=>{
			inputRespuestahtml.prop('disabled', false);
			inputRespuestahtml.focus();

			tiempoRestante = paginaData.tiempoRespuestas;
			textoTiempohtml.text(tiempoRestante);
			timerActividad = setInterval(()=>{
				tiempoRestante--;
				textoTiempohtml.text(tiempoRestante);
				if(tiempoRestante <= 0){
					clearInterval(timerActividad);
					textoTiempohtml.text('');
					marcarError();
				} else if(tiempoRestante <= 10 && tiempoCorriendoSFX){
					reproducirAudio(sfxPlayer2, listaSFX.tiempoCorriendo);
                    tiempoCorriendoSFX=false;
				}
			}, milisegundosSegundo);
		}, 500);
	}

	function mostrarRetroCorrecta(){
		$('#modal-info').modal('hide');
		$('[data-text="retro_bien_texto"]').html(paginaData.preguntas[preguntaActual].retropositiva);
		reproducirAudio(sfxPlayer, listaSFX.aplausos);
		clearInterval(timerActividad);
		textoTiempohtml.text('');
		inputRespuestahtml.prop('disabled', true);

		preguntaActual++;
		$('#modal-correcta').modal('show');
		if(preguntaActual < paginaData.preguntas.length){
			$('#modal-correcta').on('hide.bs.modal', ()=>{
				cargarPregunta(paginaData.preguntas[preguntaActual]);
				$('#modal-correcta').off('hide.bs.modal');
			})
		}
	}
	function mostrarRetroIncorrecta(){
		$('#modal-info').modal('hide');
		$('[data-text="retro_mal_texto"]').html(paginaData.preguntas[preguntaActual].retronegativa);
		reproducirAudio(sfxPlayer, listaSFX.genteDecepcionada);
		clearInterval(timerActividad);
		textoTiempohtml.text('');
		inputRespuestahtml.prop('disabled', true);

		preguntaActual++;
		$('#modal-incorrecta').modal('show');
		if(preguntaActual < paginaData.preguntas.length){
			$('#modal-incorrecta').on('hide.bs.modal', ()=>{
				cargarPregunta(paginaData.preguntas[preguntaActual]);
				$('#modal-incorrecta').off('hide.bs.modal');
			})
		}
	}

	function cargarInfoJuego(nombreTema, hojaExcel){
		paginaData.preguntas = [];

		try{
			for (var i = 0; i < hojaExcel.items.length; i++) {
	            if (hojaExcel.items[i].nombre == nombreTema) {
	            	let tempPregunta={};

	            	tempPregunta.texto = hojaExcel.items[i].pregunta;
	            	tempPregunta.retropositiva = hojaExcel.items[i].retropositiva;
	            	tempPregunta.retronegativa = hojaExcel.items[i].retronegativa;

	            	let respuestasTexto = hojaExcel.items[i].respuestas.split('<br>');
	            	let respuestasPuntos = hojaExcel.items[i].puntos.split('<br>').map(function(valor) {
					  return parseInt(valor, 10);
					});

	            	tempPregunta.respuestas=[];

	            	for (var y = 0; y < respuestasTexto.length; y++) {
	            		let tempRespuesta={};
	            		tempRespuesta.texto = respuestasTexto[y];
	            		tempRespuesta.puntos = respuestasPuntos[y];
	            		tempPregunta.respuestas.push(tempRespuesta);
	            	}

	                paginaData.preguntas.push(tempPregunta);
	            }
	        }

	        console.log('Preguntas: ', paginaData.preguntas);
		} catch(error){
			console.error(error);
		}
	}

	function estandarizarTexto(texto) {
	  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	}
	function reproducirAudio(htmlPlayer, ligaAudio){
		htmlPlayer.src = ligaAudio;
		htmlPlayer.load();
		htmlPlayer.currentTime=0;
		htmlPlayer.play();
	}
	function pararAudio(htmlPlayer){
		htmlPlayer.pause();
	}

	function bloquearPagina(){
		textoPreguntahtml.remove();
		$('#div-responder').remove();
		$('.seccion-tiempo').remove();
		$('.seccion-puntaje').text('-');
		$('#texto-act-respondida').removeClass('d-none');
	}

});