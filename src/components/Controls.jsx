import React, { useState } from 'react';

function Controls({ procesos, setProcesos, algoritmo, setAlgoritmo, algoritmos, canales, setCanales, planificar, resetear }) {
  const [nuevo, setNuevo] = useState({ pid: '', llegada: '', ejecucion: '', prioridad: '' });

  function agregarProceso() {
    if (!nuevo.pid || !nuevo.llegada || !nuevo.ejecucion || nuevo.prioridad === '') return;
    setProcesos([...procesos, {
      pid: parseInt(nuevo.pid),
      llegada: parseInt(nuevo.llegada),
      ejecucion: parseInt(nuevo.ejecucion),
      prioridad: parseInt(nuevo.prioridad)
    }]);
    setNuevo({ pid: '', llegada: '', ejecucion: '', prioridad: '' });
  }

  return (
    <div className="controles-futurista">
      <div className="fila-controles">
        <input type="number" placeholder="PID" value={nuevo.pid} onChange={e => setNuevo({ ...nuevo, pid: e.target.value })} />
        <input type="number" placeholder="T. Llegada" value={nuevo.llegada} onChange={e => setNuevo({ ...nuevo, llegada: e.target.value })} />
        <input type="number" placeholder="T. Ejecución" value={nuevo.ejecucion} onChange={e => setNuevo({ ...nuevo, ejecucion: e.target.value })} />
        <input type="number" placeholder="Prioridad" value={nuevo.prioridad} onChange={e => setNuevo({ ...nuevo, prioridad: e.target.value })} />
        <button onClick={agregarProceso}>+ Agregar Proceso</button>
        <button onClick={resetear}>Cargar Ejemplo</button>
      </div>
      <div className="fila-controles">
        <label>Algoritmo: </label>
        <select value={algoritmo} onChange={e => setAlgoritmo(e.target.value)}>
          {algoritmos.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
        <label>Canales: </label>
        <input type="number" min={1} max={8} value={canales} onChange={e => setCanales(Math.max(1, Math.min(8, parseInt(e.target.value)||1)))} />
        <button className="ejecutar-btn" onClick={planificar}>Ejecutar Planificación</button>
      </div>
    </div>
  );
}

export default Controls; 