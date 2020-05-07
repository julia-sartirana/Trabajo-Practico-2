const {vendedoras, sucursales, ventas, precios} = local

// ===============================================================================
//                                precioMaquina()
// ===============================================================================

// 1- precioMaquina(componentes, precios): dado una lista de componentes y una lista de precios, devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes, precios) => {

  const aPrecioFinal = (precioFinal, precio) => precioFinal + precio.precio
 
  return precios
    .filter(precio => componentes.includes(precio.componente))
    .reduce(aPrecioFinal, 0)
    
}

// console.log(precioMaquina(["Motherboard ASUS 1500", "HDD Wezter Dishital"], precios))

// // valor, index, array

// ===============================================================================
//                                cantidadVentasComponente()
// ===============================================================================

// // 2- cantidadVentasComponente(componente, ventas): dado un componente y una lista de ventas, devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió.

const cantidadVentasComponente = (componente, ventas) => {

  const aComponente =  venta => venta.componentes.includes(componente)

  return ventas.filter(aComponente).length

}
 console.log(cantidadVentasComponente("Monitor GPRS 3000", ventas))

 // ===============================================================================
//                                vendedoraDelMes()
// ===============================================================================

// 3- vendedoraDelMes(mes, anio, local): dados dos parámetros numéricos (mes, anio) y un objeto local, devuelve el nombre de la vendedora que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).


const vendedoraDelMes = (mes, anio, local) => {

  const ventasPorMes = venta => (venta.fecha.getMonth() + 1) === mes && venta.fecha.getFullYear() === anio

  const aTotalVentas = (acc, venta) => {
    acc[venta.nombreVendedora] === undefined ? 
    acc[venta.nombreVendedora] = precioMaquina(venta.componentes, precios) : 
    acc[venta.nombreVendedora] += precioMaquina(venta.componentes, precios)
    return acc
  }

  const aVendedoraDelMes = (mayorVentas, vendedora) => totalPorVendedora[vendedora] > totalPorVendedora[mayorVentas] ? vendedora : mayorVentas

  const totalPorVendedora = local.ventas.filter(ventasPorMes).reduce(aTotalVentas, {})


  return local.vendedoras.reduce(aVendedoraDelMes)
}
  // console.log(vendedoraDelMes(1, 2019, local))
  
// ===============================================================================
//                                ventasMes()
// ===============================================================================

// 4- ventasMes(mes, anio, local): obtiene el valor total de las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio, local) => {

  const porVentaMes = venta => (venta.fecha.getMonth() + 1) === mes && venta.fecha.getFullYear() === anio
  
  const totalVentasMes = (acc, venta) => acc + precioMaquina(venta.componentes, precios); 


  return local.ventas
    .filter(porVentaMes)
    .reduce(totalVentasMes, 0)
}

// console.log(ventasMes(1, 2019, local))

// ===============================================================================
//                                ventasVendedora()
// ===============================================================================

// 5- ventasVendedora(nombre, local): obtiene el valor total de todas las ventas realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre, local) => {

  const porVendedora = venta => venta.nombreVendedora === nombre

  const aVentaTotal = (acc, venta) => acc + precioMaquina(venta.componentes, precios)

  return local.ventas
          .filter(porVendedora)
          .reduce(aVentaTotal, 0)
}
// console.log(ventasVendedora("Grace", local))

// ===============================================================================
//                                componenteMasVendido()
// ===============================================================================

// 6- componenteMasVendido(local): devuelve el nombre del componente que más cantidad de ventas tuvo históricamente en
// un local. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = local => {
  const aComponentes = precio => ({
    nombreComponente: precio.componente,
    cantidadVentas: cantidadVentasComponente(precio.componente, ventas)
  })

  const masVendido = local.precios.map(aComponentes).reduce(
    (mayorVenta, componente) => componente.cantidadVentas < mayorVenta.cantidadVentas ? mayorVenta : componente)

  return masVendido.nombreComponente
}
// console.log(componenteMasVendido(local))

// ===============================================================================
//                                huboVentas()
// ===============================================================================

// 7- huboVentas(mes, anio, ventas): indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio, ventas) => {

  const ventaPorMes = venta => (venta.fecha.getMonth() + 1)  === mes && venta.fecha.getFullYear() === anio 

  return ventas.some(ventaPorMes)
}
// console.log(huboVentas(1, 2019, ventas))

// ===============================================================================
//                                ventasSucursal()
// ===============================================================================

// 8- ventasSucursal(sucursal, local): obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventaSucursal = (sucursal, local) => {

  const aSucursal = venta => venta.sucursal === sucursal

  const aTotalPorSucursal = (acc, venta) => acc + precioMaquina(venta.componentes, precios); 
  
  return local.ventas
          .filter(aSucursal)
          .reduce(aTotalPorSucursal, 0)
}
//  console.log(ventaSucursal("Centro", local))

// ===============================================================================
//                                ventasPorItem()
// ===============================================================================

// 9- Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const ventasPorItem= (item, valor, local) => {
  
  const aItem = venta => venta[item] === valor

  const aTotalItem = (acc, venta) => acc + precioMaquina(venta.componentes, precios)

  return local.ventas.filter(aItem).reduce(aTotalItem, 0)
}

// ===============================================================================
//                                sucursalDelMes()
// ===============================================================================

// 10- sucursalDelMes(mes, anio, local): dado dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio, local) => {

  const porVentaMes = venta => (venta.fecha.getMonth() + 1) === mes && venta.fecha.getFullYear() === anio

  const aVentasSucursal = (acc, venta) => {
    acc[venta.sucursal] === undefined ? 
    acc[venta.sucursal] = precioMaquina(venta.componentes, precios) : 
    acc[venta.sucursal] += precioMaquina(venta.componentes, precios)
    return acc
  }
  const totalPorSucursal = local.ventas.filter(porVentaMes).reduce(aVentasSucursal, {})

  const aSucursalDelMes = (mayorSucursal, sucursal) => totalPorSucursal[sucursal] > totalPorSucursal[mayorSucursal] ? sucursal : mayorSucursal

  return sucursales.reduce(aSucursalDelMes)
}
// console.log(sucursalDelMes(1, 2019, local))

// ===============================================================================
//                                renderPorMes()
// ===============================================================================

// 11- renderPorMes(local): Muestra una lista ordenada del importe total vendido por cada mes/año, p. ej. 
//(los mostrados datos no son los resultados reales):
// Ventas por mes:
//    Total de enero 2019: XXXX
//    Total de febrero 2019: XXXX

const renderPorMes = local => {
  
  const aRender = (renderInicial, fecha, ventasPorMes) => {
    renderInicial += `- Total de ${fecha}: $ ${ventasPorMes[fecha]}\n`
    return renderInicial
  }

  obtenerMesYAnio = fecha => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const mesYAnio = meses[fecha.getMonth()] + ' ' + fecha.getFullYear()
    return mesYAnio
  }

  const aVentasDelMes = (acc, venta) => {
    acc[obtenerMesYAnio(venta.fecha)] === undefined ? 
    acc[obtenerMesYAnio(venta.fecha)] = precioMaquina([...venta.componentes], [...precios]) : 
    acc[obtenerMesYAnio(venta.fecha)] += precioMaquina([...venta.componentes], [...precios]) 
    return acc
  }
  
  const ventasPorMes = local.ventas.reduce((acc, venta) => aVentasDelMes(acc, venta), {})

    const fechas = Object.keys(ventasPorMes);

    return fechas.reduce((renderInicial, fecha) => aRender(renderInicial, fecha, ventasPorMes), `Ventas por mes:\n------------------------------\n`)
}
//  console.log(renderPorMes(local))

// ===============================================================================
//                                renderPorSucursal()
// ===============================================================================

// 12- renderPorSucursal(local): Muestra una lista del importe total vendido por cada sucursal, p. ej. (los datos mostrados no son los resultados reales):
// Ventas por sucursal:
// ----------------------------
//   - Total de Centro: 4195
//   - Total de Caballito: 1265

const renderPorSucursal = local => {

  const aRender = (parcial, sucursal, ventasPorSucursal) => {
    parcial += `- Total de ${sucursal} : ${ventasPorSucursal[sucursal]}\n`
    return parcial
  }

  const aVentaPorSucursal = (acc, venta) => {
    acc[venta.sucursal] === undefined ? 
    acc[venta.sucursal] = precioMaquina(venta.componentes, precios) : 
    acc[venta.sucursal] += precioMaquina(venta.componentes, precios)
    return acc
  }

  const ventasPorSucursal = local.ventas.reduce((acc, venta) => aVentaPorSucursal(acc, venta))

  return local.sucursales.reduce((parcial, sucursal) => aRender(parcial, sucursal, ventasPorSucursal), `Ventas por sucursal:\n------------------------------\n`)
}
//  console.log(renderPorSucursal(local))

// ===============================================================================
//                                render()
// =============================================================================== 

// 13- render(local): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó, p. ej. (los datos mostrados no son los resultados reales):
// Reporte
// ==========================================
//  Ventas por mes:
//   - Total de enero 2019: 1250
//   - Total de febrero 2019: 4210
// ------------------------------------------
//  Ventas por sucursal:
//   - Total de Centro: 4195
//   - Total de Caballito: 1265
// ------------------------------------------
//  Producto estrella: Monitor GPRS 3000
// ------------------------------------------ 
//  Vendedora que más ingresos generó: Grace

const render = local => {

  const aVentasPorVendedora = (acc, venta) => {
    acc[venta.nombreVendedora] === undefined ? 
    acc[venta.nombreVendedora] = precioMaquina(venta.componentes, precios) : 
    acc[venta.nombreVendedora] += precioMaquina(venta.componentes, precios)
    return acc    
  }

  const aVendedoraConMayorVenta = (vendedoraConMayorVenta, vendedora, ventasPorVendedora) => {
    return ventasPorVendedora[vendedora] > ventasPorVendedora[vendedoraConMayorVenta] ? vendedora : vendedoraConMayorVenta
  }

  const ventasPorVendedora = local.ventas.reduce((acc, venta) => aVentasPorVendedora(acc, venta), {})
  const vendedoraConMayorVenta = local.vendedoras.reduce((vendedoraConMayorVenta, vendedora) => aVendedoraConMayorVenta(vendedoraConMayorVenta, vendedora, ventasPorVendedora))

  const reporte = `Reporte \n========================================== \n - ${renderPorMes(local)} \n - ${renderPorSucursal(local)} \n------------------------------------------ \n Producto estrella: ${componenteMasVendido(local)} \n------------------------------------------ \n Vendedora que más ingresos generó: ${vendedoraConMayorVenta}`

  return reporte
}
console.log(render(local))