import { CURSO } from "../constants"
import { obtenerCantidadFeriados } from "./feriadosService"
export async function getClasesRestantes(clase, feriados) {
    clase = Number(clase)
    if (clase > CURSO.TOTAL_CLASES) {
        return
    }
    const clasesRestantes = CURSO.TOTAL_CLASES - clase
    let sumaClases = 0
    let guiaActual
    let moduloActual
    for (const contenido of CURSO.CONTENIDO) {
        if (sumaClases < 34) {
            moduloActual = 1
        }
        if (sumaClases >= 34 && sumaClases < 88) {
            moduloActual = 2
        }
        if (sumaClases >= 88) {
            moduloActual = 3
        }
        if (sumaClases >= clase) {
            break
        }

        sumaClases += contenido.clases
        guiaActual = contenido.guia
    }
    let clasesRestantesGuiaActual = sumaClases - clase
    let clasesRestantesModuloActual = 0
    switch (moduloActual) {
        case 1:
            clasesRestantesModuloActual = 33 - clase
            break;
        case 2:
            clasesRestantesModuloActual = 87 - clase
            break;
        case 3:
            clasesRestantesModuloActual = clasesRestantes
            break;
    }

    const fechaARendirModuloActual = await obtenerCantidadFeriados(clasesRestantesModuloActual, feriados)

    let fechaARendir = await obtenerCantidadFeriados(clasesRestantes, feriados)

    return {
        guiaActual,
        clasesRestantes,
        clasesRestantesGuiaActual,
        fechaARendir,
        clasesRestantesModuloActual,
        fechaARendirModuloActual

    }
}