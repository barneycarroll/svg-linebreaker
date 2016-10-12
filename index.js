const queue = requestAnimationFrame

function box(el){
  return el.getBBox()
}

function span(el){
  el.innerHTML = el.textContent.split( /\b/ ).map( string => 
    `<tspan class=\\${ /^\s$/.test( string ) ? 's' : 'S' }>${ string }</tspan>`
  ).join( '' )
}

function linebreak( root ){
  const texts     = Array.from( root.querySelectorAll( 'text' ) )
  let   increment = 0

  texts.forEach( text => {
    span( text )

    const lineHeight = getComputedStyle( text ).lineHeight
    const lHValue    = parseFloat( lineHeight )
    const lHUnits    = /\D*$/.exec( lineHeight )[ 0 ]
    const lineWidth  = box( text.nearestViewPortElement ).width
    const shuttle    = { x : 0, y : 0 }

    Array.from( text.children ).forEach( tspan => {
      const spanWidth = box( tspan ).width

      shuttle.x += spanWidth

      if( tspan.matches( '\\S' ) && shuttle.x > lineHeight ){
        shuttle.x = 0
        shuttle.y += lHValue
      }

      queue( () => {
        span.setAttribute( 'dx', shuttle.x )
        span.setAttribute( 'dy', shuttle.y )
      } )
    } )
  } )
}
