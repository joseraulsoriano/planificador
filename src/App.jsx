import React, { useState } from 'react';
import Controls from './components/Controls';
import ProcessTable from './components/ProcessTable';
import Timeline from './components/Timeline';
import ResultsTable from './components/ResultsTable';

// Datos de ejemplo
const ejemploProcesos = [
  { pid: 1, llegada: 0, ejecucion: 3, prioridad: 0 },
  { pid: 2, llegada: 3, ejecucion: 3, prioridad: 0 },
  { pid: 3, llegada: 0, ejecucion: 4, prioridad: 1 },
  { pid: 4, llegada: 3, ejecucion: 3, prioridad: 0 },
  { pid: 5, llegada: 0, ejecucion: 3, prioridad: 1 },
  { pid: 6, llegada: 4, ejecucion: 4, prioridad: 2 },
  { pid: 7, llegada: 2, ejecucion: 3, prioridad: 0 },
  { pid: 8, llegada: 2, ejecucion: 2, prioridad: 2 },
  { pid: 9, llegada: 3, ejecucion: 3, prioridad: 0 }
];

const algoritmos = [
  { value: 'prioridad', label: 'Prioridad (Alta)' },
  { value: 'ejecucion', label: 'T. Ejecución (Ligero)' },
  { value: 'pid', label: 'PID (Asc)' }
];

function App() {
  const [procesos, setProcesos] = useState(ejemploProcesos);
  const [algoritmo, setAlgoritmo] = useState('prioridad');
  const [canales, setCanales] = useState(2);
  const [planificacion, setPlanificacion] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [ejecutado, setEjecutado] = useState(false);

  // Lógica de planificación simple (puedes mejorarla luego)
  function planificar() {
    let lista = [...procesos];
    if (algoritmo === 'prioridad') {
      lista.sort((a, b) => b.prioridad - a.prioridad || a.llegada - b.llegada || a.pid - b.pid);
    } else if (algoritmo === 'ejecucion') {
      lista.sort((a, b) => a.ejecucion - b.ejecucion || b.prioridad - a.prioridad || a.pid - b.pid);
    } else {
      lista.sort((a, b) => a.pid - b.pid);
    }
    // Simulación simple multiproceso
    let timeline = Array(canales).fill(0).map(() => []);
    let tiempos = Array(canales).fill(0);
    let resultadosTabla = [];
    lista.forEach((p) => {
      // Buscar canal libre más pronto
      let idx = tiempos.indexOf(Math.min(...tiempos));
      let inicio = Math.max(tiempos[idx], p.llegada);
      let espera = inicio - p.llegada;
      timeline[idx].push({ ...p, inicio, fin: inicio + p.ejecucion });
      tiempos[idx] = inicio + p.ejecucion;
      resultadosTabla.push({ ...p, espera, fin: inicio + p.ejecucion });
    });
    setPlanificacion(timeline);
    setResultados(resultadosTabla);
    setEjecutado(true);
  }

  function resetear() {
    setProcesos(ejemploProcesos);
    setPlanificacion([]);
    setResultados([]);
    setEjecutado(false);
  }

  return (
    <div className="app-futurista">
      <h1>Planificador de Procesos</h1>
      <Controls
        procesos={procesos}
        setProcesos={setProcesos}
        algoritmo={algoritmo}
        setAlgoritmo={setAlgoritmo}
        algoritmos={algoritmos}
        canales={canales}
        setCanales={setCanales}
        planificar={planificar}
        resetear={resetear}
      />
      <ProcessTable procesos={procesos} setProcesos={setProcesos} />
      {ejecutado && <Timeline planificacion={planificacion} canales={canales} />}
      {ejecutado && <ResultsTable resultados={resultados} />}
    </div>
  );
}

export default App; 