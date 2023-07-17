import { useEffect, useState } from 'react'
import './App.css'
import LogoEgg from './components/LogoEgg'
import { SELECT_ACTIONS } from './constants'
import { getClasesRestantes } from './services/clasesService'
import { getFeriadosOfTheYearByMonths } from './services/feriadosService'
import ResultadoCalculadora from './components/ResultadoCalculadora'
//https://nolaborables.com.ar/api/v2/feriados/2023



function App() {

  const [feriadosProximos, setFeriadosProximos] = useState([])
  const [contenido, setContenido] = useState()

  useEffect(() => {
    const getFeriados = async () => {
      const data = await getFeriadosOfTheYearByMonths()
      setFeriadosProximos(data)
    }
    getFeriados()
  }, [])



  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const input = {
      type: "number",
      stringValue: data.get('clase').toString()
    }
    if (input.stringValue) {
      const content = await getClasesRestantes(input.stringValue, feriadosProximos)
      console.log(content);
      setContenido(content)
    }

  }

  return (
    <>
      <header className='header'>
        <LogoEgg className="logo" />
      </header>
      <main className='main'>
        <h1>¿Cuándo finaliza mi curso?</h1>

        <form onSubmit={handleSubmit}>
          <h3>Para calcular la fecha de exámen final ingresa el numero de clase en la que estas</h3>
          <div className='form-content'>
            <input type="number" name='clase' placeholder='100' />
            <button className='button'>Calcular</button>
          </div>
        </form>

        {contenido && <ResultadoCalculadora  contenido={contenido}/>}

      </main>
    </>
  )
}

export default App
