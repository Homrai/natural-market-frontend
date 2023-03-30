export const obtenerFecha=()=>{
    var fechaActual = Date.now();
    const fechaMin = new Date(fechaActual);
    const fechaMax = new Date(fechaActual+546200000);
    const fecha={
      yearMin:fechaMin.getFullYear(),
      monthMin:month(fechaMin.getMonth()),
      dayMin:day(fechaMin.getDate()),
      yearMax:fechaMax.getFullYear(),
      monthMax:month(fechaMax.getMonth()),
      dayMax:day(fechaMax.getDate()),
    }

    const fechaMinima = `${fecha.yearMin}-${fecha.monthMin}-${fecha.dayMin}`.toString();
    const fechaMaxima = `${fecha.yearMax}-${fecha.monthMax}-${fecha.dayMax}`.toString();
    return {fechaMinima,fechaMaxima}
}

const month=(mes)=>{
    mes= mes+1;
    mes=String(mes);
    if(mes.length===1){
        mes=0+mes;
    }
    return mes
}

const day=(dia)=>{
    dia=String(dia);
    if(dia.length===1){
        dia=0+dia;
    }
    return dia
}