import React from 'react'

export default function ResultadoCalculadora({ contenido }) {
  return (
    <section className='resultado'>
      <div className='resultado-header'>
        <h3> Estás cursando: {contenido.guiaActual}</h3>
        {contenido.clasesRestantesGuiaActual > 1 || contenido.clasesRestantesGuiaActual === 0
          ? <p>Te quedan <span>{contenido.clasesRestantesGuiaActual}</span> días de guía</p>
          : <p>Te queda <span>{contenido.clasesRestantesGuiaActual}</span> día de guía</p>}
      </div>
      <div className='resultado-info'>
        <div>
          <h4>Modulo</h4>
          <p> Clases restantes hasta fin del módulo: <span>{contenido.clasesRestantesModuloActual}</span></p>
          <p> Fecha fin de módulo: <span>{contenido.fechaARendirModuloActual}</span></p>
        </div>
        <div>
          <h4>Curso completo</h4>
          <p> Clases restantes hasta test final: <span>{contenido.clasesRestantes}</span></p>
          <p> Fecha de test final: <span>{contenido.fechaARendir}</span></p>
        </div>
      </div>
    </section>
  )
}
