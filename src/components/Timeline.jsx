import React, { useEffect, useState } from 'react';

function Timeline({ planificacion, canales }) {
  const [paso, setPaso] = useState(0);
  const maxPaso = Math.max(...planificacion.map(canal => canal.length ? canal[canal.length-1].fin : 0));

  useEffect(() => {
    setPaso(0);
    const interval = setInterval(() => {
      setPaso(p => (p < maxPaso ? p + 1 : p));
    }, 500);
    return () => clearInterval(interval);
  }, [planificacion]);

  return (
    <div className="timeline-futurista">
      <h2>Timeline de Ejecución</h2>
      <div className="timeline-canales">
        {planificacion.map((canal, idx) => (
          <div key={idx} className="canal-row">
            <span className="canal-label">Canal {idx+1}:</span>
            <div className="timeline-bar">
              {[...Array(maxPaso)].map((_, t) => {
                const proc = canal.find(p => t >= p.inicio && t < p.fin);
                return (
                  <span
                    key={t}
                    className={`timeline-cell ${t < paso ? 'activo' : ''}`}
                    style={{ background: proc ? `var(--color-p${proc.prioridad})` : '#222' }}
                  >
                    {proc ? `T${proc.pid}` : ''}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="timeline-paso">Tiempo: {paso}</div>
    </div>
  );
}

export default Timeline; 