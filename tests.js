// ===============================================================
//                           precioMaquina()
// ===============================================================

describe('precioMaquina()', (componentes, precios) => {

  it("Deberia no modificar el parámetro", () => {
    const componentes = ["Motherboard ASUS 1200", "Monitor GPRS 3000"];
    const precios = [
        { componente: "Monitor GPRS 3000", precio: 200 },        
        { componente: "Motherboard ASUS 1200", precio: 100 }     
    ];
    const copiaPrecios = precios;
    precioMaquina(componentes, precios)
    expect(precios).to.eql(copiaPrecios);
  });

  it("Debería sumar el precio de todos los componentes", () => {
    const precios = [     
      { componente: "Motherboard MZI", precio: 30 },       
      { componente: "HDD Wezter Dishital", precio: 75 },      
    ]
    const componentes = ["Motherboard MZI", "HDD Wezter Dishital"]
    const resultado = precioMaquina(componentes, precios)
    expect(resultado).to.equal(105)
  });

  it("Debería sumar 0 si el componente no se encuentra en la lista", () => {
    const precios = [          
      { componente: "RAM Quinston", precio: 110 },
      { componente: "RAM Quinston Fury", precio: 230 } 
    ]
    const componentes = ["RAM Quinston Fury", "HDD Toyiva 2000"]
    const resultado = precioMaquina(componentes, precios)
    expect(resultado).to.equal(230)
  })
})
// ===============================================================
//                   cantidadVentasComponente()
// ===============================================================

describe("cantidadVentasComponente()", (componente, ventas) => {
  it("Deberia no modificar el parámetro", () => {
    const componente = "RAM Quinston Fury"
    const ventas = [
      { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
    ]
    const copiaVentas = ventas
    cantidadVentasComponente(componente, ventas)
    expect(ventas).to.eql(copiaVentas);
  })

  it("Debería devolver un número", () => {
    const componente = "RAM Quinston Fury"
    const ventas = [
      { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
    ]
    resultado = cantidadVentasComponente(componente, ventas)
    expect(resultado).to.be.a.finite
  })

  it("Debería devolver la cantidad de veces que fue vendido un componente", () => {
    const componente = "Monitor GPRS 3000"
    const ventas = [
      { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
      { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }      
    ]
    resultado = cantidadVentasComponente(componente, ventas)
    expect(resultado).to.equal(2);
  })

  it("Debería sumar 0 si el componente no se vendió", () => {
    const componente = "HDD Toyiva"
    const ventas = [
      { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" }      
    ]
    resultado = cantidadVentasComponente(componente, ventas)
    expect(resultado).to.equal(0) 
  })
})
// ===============================================================
//                         vendedoraDelMes()
// ===============================================================

describe("vendedoraDelMes()", (mes, anio, local) => {
  it("Debería no modificar el parámetro", () => {
    const mes = 1
    const anio = 2019
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }    
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 }      
      ]
    }
    const copiaLocal = local
    vendedoraDelMes(mes, anio, local)
    expect(local).to.eql(copiaLocal)
  })

  it("Debería devolver el nombre de la vendedora que más vendió", () => {
    const mes = 1
    const anio = 2019
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }        
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },        
        { componente: "Motherboard MZI", precio: 30 }        
      ]
    }
    const resultado = vendedoraDelMes(mes, anio, local)
    expect(resultado).to.equal("Ada")
  })

  it("Debería devolver un string", () => {
    const mes = 1
    const anio = 2019
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "HDD Toyiva", precio: 90 }
      ]
    }
    const resultado = vendedoraDelMes(mes, anio, local);
    expect(resultado).to.be.a.string;
  })
})
// ===============================================================
//                         ventasMes()
// ===============================================================

describe("ventaMes()", (mes, anio, local) => {
  it("Debería no modificar el parámetro",() => {
    const mes = 1
    const anio = 2019
    const local = {
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }            
      ]
    }
    const copiaLocal = local
    ventasMes(mes, anio, local)
    expect(local).to.eql(copiaLocal)
  })

  it("Debería devolver un número del total de ventas de un mes", () => {
    const mes = 1
    const anio = 2019
    const local = {
      ventas: [       
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }
      ]
    }
    const resultado = ventasMes(mes, anio, local)
    expect(resultado).to.be.a.finite
  })

  it("Debería devolver el importe total de ventas que hubo en un mes", () => {
    const mes = 1
    const anio = 2019
    const local = {
      ventas: [       
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" }
      ]
    }
    const resultado = ventasMes(mes, anio, local) 
    expect(resultado).to.equal(650)
  })
})
// ===============================================================
//                         ventasVendedora()
// ===============================================================

describe("ventasVendedora()", (nombre, local) => {
  it("Debería no modificar el parámetro", () => {
    const nombre = "Ada"
    const local = {
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }        
      ]
    } 
    const copiaLocal = local
    ventasVendedora(nombre, local)
    expect(local).to.eql(copiaLocal)
  })

  it("Debería devolver un número", () =>  {
    const nombre = "Ada"
    const local = {
      ventas: [
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }
      ]
    }
    const resultado = ventasVendedora(nombre, local)
    expect(resultado).to.be.a.finite
  })

  it("Debería devolver el importe total que vendió un vendedora", () => {
    const nombre = "Ada"
    const local = {
      ventas: [        
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }              
      ]
    }  
    const resultado = ventasVendedora(nombre, local)
    expect(resultado).to.equal(350)
  })
})

// ===============================================================
//                         componenteMasVendido()
// ===============================================================

describe("componenteMasVendido()", (local) => {
  it("Debería no modificar el parámetro", () => {
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }              
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 }      
      ]
    }
    const copiaLocal = local
    componenteMasVendido(local)
    expect(local).to.eql(copiaLocal)
  })

  it("Debería devolver un string", () => {
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }                   
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 }      
      ]
    }
    const resultado = componenteMasVendido(local)
    expect(resultado).to.be.a.string
  })
  it("Debería devolver el nombre del componente más vendido", () => {
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },        
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }        
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 }
      ]
    };
    const resultado = componenteMasVendido(local)
    expect(resultado).to.equal("Motherboard ASUS 1200")
  })
})
// ===============================================================
//                         huboVentas()
// ===============================================================

describe("huboVentas()", (mes, anio, ventas) => {
  it("Debería devolver un booleano", () => {
    const mes = 1
    const anio = 2019
    const ventas = 
      [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }           
      ]      
    const resultado = huboVentas(mes, anio, ventas)
    expect(resultado).to.be.a("boolean")
  })

  it("Debería devolver true si hubo ventas en ese mes", () => {
    const mes = 1
    const anio = 2019
    const ventas = 
    [
      { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }             
    ] 
    const resultado = huboVentas(mes, anio, ventas)
    expect(resultado).to.equal(true)
  })

  it("Debería devolver false si no hubo ventas en ese mes", () => {
    const mes = 1
    const anio = 2019
    const ventas = 
    [
      { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
                 
    ] 
    const resultado = huboVentas(mes, anio, ventas)
    expect(resultado).to.equal(false)
  })
})

// ===============================================================
//                         ventaSucursal()
// ===============================================================

describe("ventasSucursal()", (sucursal, local) => {
  it("Debería no modificar el parámetro", () => {
    const sucursal = "Centro"
    const local = {
      ventas: [
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }       
      ]
    }
    const copiaLocal = local
    ventaSucursal(sucursal, local)
    expect(local).to.eql(copiaLocal)
  })

  it("Debería devolver un número", () => {
    const sucursal = "Centro"
    const local = {
      ventas: [
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }       
      ]
    }
    const resultado = ventaSucursal(sucursal, local)
    expect(resultado).to.be.a.finite
  })

  it("Debería devolver cero si no hubo ventas en esa sucursal", () => {
    const sucursal = "Centro"
    const local = {
      ventas: [       
        { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" }
      ]
    }
    const resultado = ventaSucursal(sucursal, local)
    expect(resultado).to.equal(0)
  })

  it("Debería sumar el total de ventas que tuvo una sucursal", () => {
    const sucursal = "Centro"
    const local = {
      ventas: [
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" }
      ]
    }
    const resultado = ventaSucursal(sucursal, local)
    expect(resultado).to.equal(350)
  })
})
// ===============================================================
//                         sucursalDelMes()
// ===============================================================

describe("sucursalDelMes()", (mes, anio, local) => {
  it("Debería no modificar el parámetro", () => {
    const mes = 1
    const anio = 2019
    const local = {
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }      
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 }
      ]
    };
    const copiaLocal = local
    sucursalDelMes(mes, anio, local)
    expect(local).to.eql(copiaLocal)
  })
  it("Debería devolver un string", () => {
    const mes = 1
    const anio = 2019
    const local = {
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }             
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 }        
      ]
    };
    const resultado = sucursalDelMes(mes, anio, local)
    expect(resultado).to.be.a.string
  })

  it("Debería devolver un string con el nombre de la sucursal que mas ventas tuvo en un mes", () => {
    const mes = 1
    const anio = 2019
    const local = {      
      sucursales: ['Centro', 'Caballito'],
      ventas: [        
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },        
        { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" }               
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },     
        { componente: "Motherboard ASUS 1200", precio: 100 },      
        { componente: "HDD Wezter Dishital", precio: 75 }       
      ]
    };
    const resultado = sucursalDelMes(mes, anio, local)
    expect(resultado).to.equal("Centro")
  })
})

// ===============================================================
//                         renderPorMes()
// ===============================================================

describe("renderPorMes()", (local) => {
  it("Debería devolver un string", () => {
    const local = {      
      ventas: [
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },        
        { componente: "Motherboard MZI", precio: 30 }        
      ]
    };
    const resultado = renderPorMes(local)
    expect(resultado).to.be.a.string
  })

  it("Debería devolver un string con el importe total de ventas en un mes", () => {
    const local = {      
      ventas: [
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },        
        { componente: "Motherboard MZI", precio: 30 }        
      ]
    };
    const resultado = renderPorMes(local)
    expect(resultado).to.equal("Ventas por mes:\n------------------------------\n- Total de Enero 2019: $ 600\n")
  })
})

// ===============================================================
//                         renderPorSucursal()
// ===============================================================

describe("renderPorSucursal()", (local) => {
  it("Debería devolver un string", () => {
    const local = {      
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },        
        { componente: "Motherboard MZI", precio: 30 }        
      ]
    };
    const resultado = renderPorSucursal(local)
    expect(resultado).to.be.a.string
  })

  it("Debería devolver un string con el importe total de ventas de una sucursal en un mes", () => {
    const local = {      
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
      ]
    };
    
    const resultado = renderPorSucursal(local)
    expect(resultado).to.equal("Ventas por sucursal:\n------------------------------\n- Total de Centro : 4085\n- Total de Caballito : 1265\n")
  })
})

// ===============================================================
//                         render()
// ===============================================================

describe("render()", (local) => {
  it("Debería devolver un string", () => {
    const local = {      
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },        
        { componente: "Motherboard MZI", precio: 30 }        
      ]
    };
    const resultado = render(local)
    expect(resultado).to.be.a.string
  })

  it("Debería devolver un string con toda la información en un render", () => {
    const local = {
      vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
      sucursales: ['Centro', 'Caballito'],
      ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "HDD Wezter Dishital"], sucursal: "Centro" },
        { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
        { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" }
      ],
      precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
      ]
    };
    const resultado = render(local)
    expect(resultado).to.equal("Reporte \n========================================== \n - Ventas por mes:\n------------------------------\n- Total de Febrero 2019: $ 4420\n- Total de Enero 2019: $ 1250\n \n - Ventas por sucursal:\n------------------------------\n- Total de Centro : 4085\n- Total de Caballito : 1265\n \n------------------------------------------ \n Producto estrella: Motherboard ASUS 1200 \n------------------------------------------ \n Vendedora que más ingresos generó: Grace")    

  })
})