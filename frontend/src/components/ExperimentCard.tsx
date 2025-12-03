import { useEffect, useState } from 'react';
import { FlaskConical, BarChart3 } from 'lucide-react';
import api from '../services/api.ts';
import type { Experiment, Metric } from '../types/index.ts';

interface Props {
  experiment: Experiment;
}

export default function ExperimentCard({ experiment }: Props) {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    api.get(`/experiments/${experiment.id}/metrics`)
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(`Erro ao buscar métricas do exp ${experiment.id}`, err));
  }, [experiment.id]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      {/* Cabeçalho do Experimento */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
          <FlaskConical size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">{experiment.name}</h4>
          <span className="text-xs text-slate-400">ID: {experiment.id.slice(0, 8)}...</span>
        </div>
      </div>

      {/* Parâmetros (JSON) */}
      <div className="mb-4 bg-slate-50 p-3 rounded text-xs font-mono text-slate-600">
        <p className="font-bold mb-1 text-slate-400 uppercase">Parâmetros:</p>
        {experiment.parameters ? (
           // Prettify do JSON para ficar legível
           <pre>{JSON.stringify(experiment.parameters, null, 2)}</pre>
        ) : (
          <span>Nenhum parâmetro registrado</span>
        )}
      </div>

      {/* Lista de Métricas */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
          <BarChart3 size={16} />
          <h5>Métricas</h5>
        </div>
        
        {metrics.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Nenhuma métrica registrada.</p>
        ) : (
          <div className="space-y-2">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-1 last:border-0">
                <span className="text-slate-600">{metric.name}</span>
                <span className="font-mono font-bold text-blue-600">{metric.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}