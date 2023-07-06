import moment from "moment"
const dateFormat = "DD-MM-YYYY"

export async function getFeriadosOfTheYearByMonths() {


  const actualDate = moment().format(dateFormat)
  const [, , actualYear] = actualDate.split("-")


  const res = await fetch(`https://nolaborables.com.ar/api/v2/feriados/${actualYear}`)
  const data = await res.json()
  return data

}

export async function obtenerCantidadFeriados(clasesRestantes, feriados) {
  const fechaActual = new Date();
  let fecha = new Date(fechaActual);

  let diasRestantes = clasesRestantes;
  let diasFeriados = 0;

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1);

    if (esDiaHabil(fecha) && !esFeriado(fecha, feriados)) {
      diasRestantes--;
    } else if (esDiaHabil(fecha) && esFeriado(fecha, feriados)) {
      diasFeriados++;
    }
  }

  fecha.setDate(fecha.getDate() + diasFeriados);

  const finalDate = moment(fecha).format(dateFormat);
  return finalDate;
}

function esDiaHabil(fecha) {
  return fecha.getDay() !== 0 && fecha.getDay() !== 6; // Días hábiles son de lunes a viernes (0: domingo, 6: sábado)
}

function esFeriado(fecha, feriados) {
  const feriadoEnFecha = feriados.find((feriado) => {
    return (
      feriado.dia === fecha.getDate() &&
      feriado.mes - 1 === fecha.getMonth() // Restamos 1 porque los meses en JavaScript van de 0 a 11
    );
  });

  return feriadoEnFecha !== undefined;
}
