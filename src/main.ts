import './style.css'
import { contenidoPagina, type idioma, type categoriaTextoContenido } from './traducciones'
// import { gsap } from "gsap";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', ()=>{
    // IDIOMA
    let params = new URLSearchParams(document.location.search)
    let idioma:null|idioma|string = params.get("lang")
    
    if( idioma === 'EN' ){
      document.querySelectorAll('[data-text]').forEach(textoNode =>{
        const nombreTexto = textoNode.getAttribute('data-text') as categoriaTextoContenido
        if( nombreTexto ){
          textoNode.innerHTML = contenidoPagina[idioma][nombreTexto]
        }
      })
    }

    if( idioma != null ){
      document.querySelector(`.btn-idioma[lang="${idioma}"]`)?.remove()
    } else{
      document.querySelector(`.btn-idioma[lang="ES"]`)?.remove()
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