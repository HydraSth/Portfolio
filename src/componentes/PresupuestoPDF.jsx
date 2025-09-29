import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Registrar fuentes (incluyendo la versión itálica)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' }
  ]
});

// Función para formatear números en formato de pesos argentinos
const formatoPesoArgentino = (numero) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numero).replace('ARS', '$');
};

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  companyInfo: {
    width: '60%',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyDetails: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  documentInfo: {
    width: '35%',
    textAlign: 'right',
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  documentDetails: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  clientSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientDetails: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  tableCol1: {
    width: '70%',
  },
  tableCol2: {
    width: '30%',
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    color: '#d97706',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  factorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    fontSize: 9,
    color: '#555',
  },
  factorSection: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 3,
  },
  factorTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginBottom: 3,
  },
  discountSection: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fef3cd',
    padding: 5,
    borderRadius: 3,
  },
  discountTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginBottom: 3,
    color: '#d97706',
  },
  discountReason: {
    fontSize: 8,
    color: '#92400e',
    fontStyle: 'italic',
    marginTop: 2,
  }
});

// Componente para generar el PDF
const PresupuestoPDF = ({ 
  selectedService, 
  selectedAddons, 
  total, 
  totalHoras, 
  costoPorHora, 
  selectedSizeOptions, 
  projectSizeCategories, 
  includeIVA, 
  selectedProjectType, 
  discount, 
  discountReason, 
  clientData 
}) => {
  // Calcular fecha actual y fecha de validez (30 días)
  const fechaActual = new Date();
  const fechaValidez = new Date(fechaActual);
  fechaValidez.setDate(fechaValidez.getDate() + 30);
  
  // Formatear fechas
  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Generar número de presupuesto único
  const numeroPresupuesto = `PRES-${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  // Calcular el subtotal antes de aplicar factores
  const subtotalSinFactores = selectedService ? 
    selectedService.basePrice + selectedAddons.reduce((sum, addon) => sum + addon.price, 0) : 0;

  // Calcular subtotal con factores pero sin descuento
  const calcularSubtotalConFactores = () => {
    let baseTotal = subtotalSinFactores;
    
    let factorAcumulado = 0;
    Object.values(selectedSizeOptions).forEach(option => {
      if (option) factorAcumulado += option.factor;
    });
    if (selectedProjectType) factorAcumulado += selectedProjectType.factor;
    
    if (factorAcumulado > 0) {
      baseTotal = baseTotal * (1 + factorAcumulado);
    }
    
    return baseTotal;
  };

  const subtotalConFactores = calcularSubtotalConFactores();
  
  // Calcular descuento en pesos
  const montoDescuento = discount > 0 ? subtotalConFactores * (discount / 100) : 0;
  
  // Calcular subtotal después del descuento
  const subtotalConDescuento = subtotalConFactores - montoDescuento;
  
  // Calcular IVA y total
  const iva = includeIVA ? subtotalConDescuento * 0.21 : 0;
  const totalFinal = subtotalConDescuento + iva;

  // Función para verificar si hay datos del cliente para mostrar
  const hayDatosCliente = () => {
    return clientData && (
      clientData.nombre || 
      clientData.empresa || 
      clientData.email || 
      clientData.telefono || 
      clientData.direccion || 
      clientData.cuit || 
      clientData.condicionIVA
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>SOLUCIONES DIGITALES</Text>
            <Text style={styles.companyDetails}>Santa Rosa, La Pampa, Argentina</Text>
            <Text style={styles.companyDetails}>Tel: +54 9 2954-232060</Text>
            <Text style={styles.companyDetails}>juanespasan@gmail.com</Text>
            <Text style={styles.companyDetails}>portfolio-juan-cruz.vercel.app</Text>
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>PRESUPUESTO</Text>
            <Text style={styles.documentDetails}>Nº: {numeroPresupuesto}</Text>
            <Text style={styles.documentDetails}>Fecha: {formatearFecha(fechaActual)}</Text>
            <Text style={styles.documentDetails}>Válido hasta: {formatearFecha(fechaValidez)}</Text>
          </View>
        </View>
        
        {/* Información del cliente - Solo mostrar si hay datos */}
        {hayDatosCliente() && (
          <View style={styles.clientSection}>
            <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
            {clientData?.nombre && (
              <Text style={styles.clientDetails}>
                Nombre: {clientData.nombre}
              </Text>
            )}
            {clientData?.empresa && (
              <Text style={styles.clientDetails}>
                Empresa: {clientData.empresa}
              </Text>
            )}
            {clientData?.email && (
              <Text style={styles.clientDetails}>
                Email: {clientData.email}
              </Text>
            )}
            {clientData?.telefono && (
              <Text style={styles.clientDetails}>
                Teléfono: {clientData.telefono}
              </Text>
            )}
            {clientData?.direccion && (
              <Text style={styles.clientDetails}>
                Dirección: {clientData.direccion}
              </Text>
            )}
            {clientData?.cuit && (
              <Text style={styles.clientDetails}>
                CUIT/CUIL: {clientData.cuit}
              </Text>
            )}
            {clientData?.condicionIVA && (
              <Text style={styles.clientDetails}>
                Condición IVA: {clientData.condicionIVA}
              </Text>
            )}
          </View>
        )}
        
        {/* Tabla de servicios */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol1}>DESCRIPCIÓN</Text>
            <Text style={styles.tableCol2}>IMPORTE</Text>
          </View>
          
          {/* Servicio base */}
          {selectedService && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>
                {selectedService.name} ({selectedService.horasBase} horas)
              </Text>
              <Text style={styles.tableCol2}>{formatoPesoArgentino(selectedService.basePrice)}</Text>
            </View>
          )}
          
          {/* Addons */}
          {selectedAddons.map((addon) => (
            <View key={addon.id} style={styles.tableRow}>
              <Text style={styles.tableCol1}>
                {addon.name} ({addon.horas} horas)
              </Text>
              <Text style={styles.tableCol2}>{formatoPesoArgentino(addon.price)}</Text>
            </View>
          ))}
          
          {/* Subtotal antes de factores */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCol1}>Subtotal servicios base</Text>
            <Text style={styles.tableCol2}>{formatoPesoArgentino(subtotalSinFactores)}</Text>
          </View>
          
          {/* Factores de tamaño del proyecto */}
          {Object.keys(selectedSizeOptions).length > 0 && (
            <View style={styles.factorSection}>
              <Text style={styles.factorTitle}>FACTORES DE COMPLEJIDAD DEL PROYECTO:</Text>
              
              {Object.entries(selectedSizeOptions).map(([categoryId, option]) => {
                const category = projectSizeCategories.find(cat => cat.id === categoryId);
                return (
                  <View key={categoryId} style={styles.factorRow}>
                    <Text>{category?.name}: {option.name}</Text>
                    <Text>+{(option.factor * 100).toFixed(0)}%</Text>
                  </View>
                );
              })}
              
              <View style={styles.factorRow}>
                <Text>Incremento total por factores</Text>
                <Text>
                  {formatoPesoArgentino(subtotalConFactores - subtotalSinFactores)}
                </Text>
              </View>
            </View>
          )}

          {/* Subtotal con factores */}
          {Object.keys(selectedSizeOptions).length > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Subtotal con factores de complejidad</Text>
              <Text style={styles.tableCol2}>{formatoPesoArgentino(subtotalConFactores)}</Text>
            </View>
          )}

          {/* Sección de descuento */}
          {discount > 0 && (
            <View style={styles.discountSection}>
              <Text style={styles.discountTitle}>DESCUENTO APLICADO:</Text>
              <View style={styles.factorRow}>
                <Text>Descuento ({discount}%)</Text>
                <Text>-{formatoPesoArgentino(montoDescuento)}</Text>
              </View>
              {discountReason && (
                <Text style={styles.discountReason}>
                  Motivo: {discountReason}
                </Text>
              )}
            </View>
          )}
        </View>
        
        {/* Resumen */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text>Subtotal {discount > 0 ? 'con descuento' : ''}</Text>
            <Text>{formatoPesoArgentino(subtotalConDescuento)}</Text>
          </View>
          
          {includeIVA && (
            <View style={styles.summaryRow}>
              <Text>IVA (21%)</Text>
              <Text>{formatoPesoArgentino(iva)}</Text>
            </View>
          )}
          
          <View style={styles.totalRow}>
            <Text>TOTAL {includeIVA ? 'CON IVA' : ''}</Text>
            <Text>{formatoPesoArgentino(totalFinal)}</Text>
          </View>
        </View>
        
        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>CONDICIONES COMERCIALES:</Text>
          <Text>• Forma de pago: 50% al inicio del proyecto, 50% a la entrega.</Text>
          <Text>• Tiempo estimado de entrega: {Math.ceil(totalHoras / 6)} días laborables.</Text>
          <Text>• Costo por hora: {formatoPesoArgentino(costoPorHora)}</Text>
          <Text>• Total de horas estimadas: {totalHoras} horas</Text>
          <Text>• Este presupuesto no incluye servicios adicionales no especificados.</Text>
          <Text>• Los precios no incluyen costes de licencias de software de terceros.</Text>
          {!includeIVA && (
            <Text>• Los precios no incluyen IVA.</Text>
          )}
          <Text style={{ marginTop: 10 }}>
            Agradecemos su confianza en nuestros servicios.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PresupuestoPDF; 