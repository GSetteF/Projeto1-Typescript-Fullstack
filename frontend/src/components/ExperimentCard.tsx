import { useEffect, useState } from 'react';
import { FlaskConical, BarChart3, Pencil, Trash2, Plus } from 'lucide-react';
import api from '../services/api';
import type { Experiment, Metric } from '../types';
import MetricModal from './MetricModal';

interface Props {
  experiment: Experiment;
  onEdit: (experiment: Experiment) => void;
  onDelete: (id: string) => void;
}

export default function ExperimentCard({ experiment, onEdit, onDelete }: Props) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);

  const fetchMetrics = () => {
    api.get(`/experiments/${experiment.id}/metrics`)
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(`Erro métricas exp ${experiment.id}`, err));
  };

  useEffect(() => {
    fetchMetrics();
  }, [experiment.id]);

  const handleSaveMetric = async (data: { name: string; value: number }) => {
    try {
      if (editingMetric) {
        // PUT /metrics/:id
        await api.put(`/metrics/${editingMetric.id}`, data);
      } else {
        await api.post(`/experiments/${experiment.id}/metrics`, data);
      }
      setIsMetricModalOpen(false);
      setEditingMetric(null);
      fetchMetrics();
    } catch (error) {
      console.error("Erro ao salvar métrica:", error);
      alert("Erro ao salvar métrica.");
    }
  };

  const handleDeleteMetric = async (metricId: string) => {
    if (window.confirm("Deletar esta métrica?")) {
      try {
        await api.delete(`/metrics/${metricId}`);
        fetchMetrics();
      } catch (error) {
        console.error("Erro ao deletar métrica:", error);
      }
    }
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const openCreateMetricModal = () => {
    setEditingMetric(null);
    setIsMetricModalOpen(true);
  };

  const openEditMetricModal = (metric: Metric) => {
    setEditingMetric(metric);
    setIsMetricModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative group">
      
      <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={(e) => handleAction(e, () => onEdit(experiment))}
          className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 rounded-md shadow-sm"
          title="Editar Experimento"
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={(e) => handleAction(e, () => onDelete(experiment.id))}
          className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 rounded-md shadow-sm"
          title="Deletar Experimento"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4 pr-16">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
          <FlaskConical size={20} />
        </div>
        <div className="overflow-hidden">
          <h4 className="font-semibold text-slate-800 truncate" title={experiment.name}>{experiment.name}</h4>
          <span className="text-xs text-slate-400 font-mono">ID: {experiment.id.slice(0, 8)}...</span>
        </div>
      </div>

      <div className="mb-4 bg-slate-50 p-3 rounded text-xs font-mono text-slate-600 overflow-x-auto">
        <p className="font-bold mb-1 text-slate-400 uppercase">Parâmetros:</p>
        {experiment.parameters ? (
           <pre>{JSON.stringify(experiment.parameters, null, 2)}</pre>
        ) : (
          <span>Nenhum parâmetro</span>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <BarChart3 size={16} />
            <h5>Métricas</h5>
          </div>
          <button 
            onClick={(e) => handleAction(e, openCreateMetricModal)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Adicionar Métrica"
          >
            <Plus size={16} />
          </button>
        </div>
        
        {metrics.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Sem métricas.</p>
        ) : (
          <div className="space-y-1">
            {metrics.map((metric) => (
              <div key={metric.id} className="group/metric flex justify-between items-center text-sm border-b border-slate-100 last:border-0 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-600">{metric.name}</span>
                
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{metric.value}</span>
                  
                  <div className="flex opacity-0 group-hover/metric:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleAction(e, () => openEditMetricModal(metric))}
                      className="p-1 text-slate-400 hover:text-blue-600"
                    >
                      <Pencil size={12} />
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, () => handleDeleteMetric(metric.id))}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MetricModal 
        isOpen={isMetricModalOpen}
        onClose={() => setIsMetricModalOpen(false)}
        onSubmit={handleSaveMetric}
        editingMetric={editingMetric}
      />
    </div>
  );
}