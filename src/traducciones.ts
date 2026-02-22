export type categoriaTextoContenido = 'titulo_head'|'proyectos_link_txt'|'tecnologias_link_txt'|'sobremi_link_txt'|'contacto_link_txt'|'titulo_body'|'proyectoestrella_titulo'|'proyectoestrella_texto'|'repositorio_texto'|'juego_texto'|'blog_texto'|'blog_titulo'|'portafolioanimacion_texto'|'portafolioanimacion_titulo'|'tarjetacredito_texto'|'tarjetacredito_titulo'|'juegotrivia_texto'|'juegotrivia_titulo'|'sobremi_titulo'|'sobremi_texto'|'correoelectronico_txt'

export type contenido = Record<categoriaTextoContenido, string>

// Los nombres de las tecnologías no requieren traducción
export type idioma='ES'|'EN'

export const contenidoPagina:Record<idioma, contenido> = {
  'ES': {
    titulo_head: 'Benjamin - Portafolio Web',
    titulo_body: 'Benjamín Navarro Salinas - Portafolio',
    proyectos_link_txt: 'Proyectos',
    tecnologias_link_txt: 'Tecnologías',
    contacto_link_txt: 'Contacto',
    sobremi_link_txt: 'Sobre mi',
    proyectoestrella_titulo: '⭐ Videojuego tipo ajedrez con temática militar',
    proyectoestrella_texto: 'Videojuego de estrategia táctico por turnos de temática militar. <br> Eres un comandante y controlas un batallón de unidades cuyo objetivo es destruir todas las unidades de tu oponente ó tomar su Sede Principal.',
    repositorio_texto: 'Repositorio',
    juego_texto: 'Juego',
    blog_titulo: 'Blog de reseñas',
    blog_texto: 'Blog de reseñas para libros, películas y otros pensamientos.',
    portafolioanimacion_titulo: 'Portafolio de animación',
    portafolioanimacion_texto: 'Ejemplo de portafolio de un artista digital',
    tarjetacredito_titulo: 'Tarjeta de crédito personalizada',
    tarjetacredito_texto: '¡Personaliza tu tarjeta de crédito con tus datos y los estilos que más te gusten!',
    juegotrivia_titulo: 'Juego de trivia',
    juegotrivia_texto: '¡Obtén la mayor cantidad de puntos respondiendo a una variedad de preguntas con múltiples respuestas!',
    sobremi_titulo: '¡Hola! ¡Soy Benjamín!',
    sobremi_texto: 'Soy un Front End Developer con 7 años de experiencia. Estoy especializado en desarrollo front-end con HTML5, CSS3, JavaScript (ES6), Typescript y Tailwind. Actualmente estoy ampliando conocimientos en React, Astro, .NET, Node y PHP.',
    correoelectronico_txt: 'Correo electrónico:',
  },
  'EN': {
    titulo_head: 'Benjamin - Portfolio Web',
    titulo_body: 'Benjamin Navarro Salinas - Portfolio',
    proyectos_link_txt: 'Projects',
    tecnologias_link_txt: 'Technologies',
    contacto_link_txt: 'Contact',
    sobremi_link_txt: 'About me',
    proyectoestrella_titulo: '⭐ Tactical platform game',
    proyectoestrella_texto: 'Tactical strategic online game with a military theme. Choose your commander, build your own units and destroy oponents unit to win!',
    repositorio_texto: 'Repository',
    juego_texto: 'Game',
    blog_titulo: 'Review Blog',
    blog_texto: 'Blog for reviewing books, movies and other toughts',
    portafolioanimacion_titulo: 'Animation Portfolio',
    portafolioanimacion_texto: 'Digital artist portfolio example',
    tarjetacredito_titulo: 'Custom Credit Card',
    tarjetacredito_texto: 'Design your own credit card page with your data and the style you like!',
    juegotrivia_titulo: 'Trivia Game',
    juegotrivia_texto: 'Get the highest amount of points and answering a variety of trivia!',
    sobremi_titulo: 'Hi! I\'m Benjamín!',
    sobremi_texto: 'I\'m a Front End Developer with 7 years of experience. Specialized in HTML5, CSS3, JavaScript (ES6), Typescript y Tailwind. Currently learning React, Astro, .NET, Node and PHP.',
    correoelectronico_txt: 'E-mail:',
  }
}