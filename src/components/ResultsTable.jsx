import React from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

function ResultsTable({ resultados }) {
  function exportarCSV() {
    const encabezado = 'PID,T. Llegada,T. Ejecución,Prioridad,T. Espera,T. Finalización\n';
    const filas = resultados.map(r => `T${r.pid},${r.llegada},${r.ejecucion},${r.prioridad},${r.espera},${r.fin}`).join('\n');
    const blob = new Blob([encabezado + filas], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'resultados.csv');
  }

  function exportarPDF() {
    const doc = new jsPDF();
    doc.text('Resultados de Planificación', 10, 10);
    let y = 20;
    doc.text('PID | T. Llegada | T. Ejecución | Prioridad | T. Espera | T. Finalización', 10, y);
    y += 8;
    resultados.forEach(r => {
      doc.text(`T${r.pid}    ${r.llegada}    ${r.ejecucion}    ${r.prioridad}    ${r.espera}    ${r.fin}`, 10, y);
      y += 8;
    });
    doc.save('resultados.pdf');
  }

  function copiarTabla() {
    const texto = resultados.map(r => `T${r.pid}\t${r.llegada}\t${r.ejecucion}\t${r.prioridad}\t${r.espera}\t${r.fin}`).join('\n');
    navigator.clipboard.writeText('PID\tT. Llegada\tT. Ejecución\tPrioridad\tT. Espera\tT. Finalización\n' + texto);
    alert('Tabla copiada al portapapeles');
  }

  return (
    <div className="resultados-futurista">
      <h2>Tabla de Resultados</h2>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>T. Llegada</th>
            <th>T. Ejecución</th>
            <th>Prioridad</th>
            <th>T. Espera</th>
            <th>T. Finalización</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(r => (
            <tr key={r.pid}>
              <td>{`T${r.pid}`}</td>
              <td>{r.llegada}</td>
              <td>{r.ejecucion}</td>
              <td>{r.prioridad}</td>
              <td>{r.espera}</td>
              <td>{r.fin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="exportar-btns">
        <button onClick={exportarCSV}>Exportar CSV</button>
        <button onClick={exportarPDF}>Exportar PDF</button>
        <button onClick={copiarTabla}>Copiar Tabla</button>
      </div>
    </div>
  );
}

export default ResultsTable; 