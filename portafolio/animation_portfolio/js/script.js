window.addEventListener('load', ()=>{
    gsap.registerPlugin(ScrollTrigger)
    const seccionesId = ['#seccion-portafolio', '#seccion-trabajos', '#seccion-yo', '#seccion-contacto']

    // gsap.to('#portrait', {
    //     scrollTrigger: '#portrait',
    //     x: -200
    // });

    let tl_portafolio = gsap.timeline({
        // delay: 0.5,
        defaults: {
            duration: 1,
            ease: 'none'
        },
        smoothChildTiming: true,
        autoRemoveChildren: true,
        onComplete: () => {
            console.log("finished")
        },
    });

    seccionesId.forEach((seccion) => {
        tl_portafolio.fromTo(seccion, {
            // scrollTrigger: {
            //     trigger: seccion,
            //     toggleActions: 'restart none none none'
            // },
            opacity: 0,
            y: 10
        }, 
        {
            scrollTrigger: {
                trigger: seccion,
                toggleActions: 'restart none none none'
            },
            opacity: 1,
            y: 0,
            duration: .5,
        });
    })
    // tl_portafolio.fromTo('.navbar', {
    //     opacity: 0,
    //     y: 30
    // }, 
    // {
    //     opacity: 1,
    //     y: 0,
    //     duration: .5,
    // }).fromTo('.seccion', {
    //     opacity: 0,
    //     y: 30
    // }, 
    // {
    //     opacity: 1,
    //     y: 0,
    //     stagger: .25,
    //     duration: .5,
    // });

    // EMPEZAR LA PAGINA CON LAS PIEZAS OCULTAS APENAS ABRIENDO LA PÁGINA
    // ANIMAR TEXTOS
    // ANIMAR POR MEDIO DE SCROLL
})