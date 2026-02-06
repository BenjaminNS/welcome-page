import './style.css'
import { contenidoPagina, type contenido, type idioma } from './traducciones'

window.addEventListener('load', ()=>{
    // IDIOMA
    let params = new URLSearchParams(document.location.search)
    let idioma:null|idioma = params.get("lang")
    
    if( idioma === 'EN' ){
      document.querySelectorAll('[data-text]').forEach(textoNode =>{
        const nombreTexto = textoNode.getAttribute('data-text')
        if( nombreTexto ){
          textoNode.innerHTML = contenidoPagina[idioma][nombreTexto]
        }
      })
    }

    // ANIMACIONES
    gsap.registerPlugin(ScrollTrigger)
    // const seccionesId = ['#header', '#nombre', '#proyecto-estrella', '#capturas', '#tecnologias', '#sobre-mi', '#contacto']
    const seccionesId = ['#header', '#nombre', '#proyecto-estrella', '#tecnologias', '#sobre-mi', '#contacto']

    let tl_portafolio = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'none'
        },
        smoothChildTiming: true,
        autoRemoveChildren: true,
        onComplete: () => {
            // console.log("finished")
        },
    });

    seccionesId.forEach((seccion) => {
        tl_portafolio.fromTo(seccion, {
            delay: .5,
            opacity: 0,
            y: 10
        }, 
        {
            scrollTrigger: {
                trigger: seccion,
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: .5
        });
    })

    tl_portafolio.from('.technology', {
        scrollTrigger: {
            trigger: '#tecnologias',
            toggleActions: 'play none none none'
        },
        y: -25,
        delay: .4,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1,0.4)",
        stagger: .1
    })
})