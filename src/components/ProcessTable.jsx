import React from 'react';

function ProcessTable({ procesos, setProcesos }) {
  function eliminar(pid) {
    setProcesos(procesos.filter(p => p.pid !== pid));
  }

  function editar(pid, campo, valor) {
    setProcesos(procesos.map(p =>
      p.pid === pid ? { ...p, [campo]: parseInt(valor) || 0 } : p
    ));
  }

  return (
    <div className="tabla-futurista">
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>T. Llegada</th>
            <th>T. Ejecución</th>
            <th>Prioridad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {procesos.map(p => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td><input type="number" value={p.llegada} onChange={e => editar(p.pid, 'llegada', e.target.value)} /></td>
              <td><input type="number" value={p.ejecucion} onChange={e => editar(p.pid, 'ejecucion', e.target.value)} /></td>
              <td><input type="number" value={p.prioridad} onChange={e => editar(p.pid, 'prioridad', e.target.value)} /></td>
              <td><button onClick={() => eliminar(p.pid)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessTable; 