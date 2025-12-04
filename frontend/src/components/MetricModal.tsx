import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { Metric } from '../types';

const metricSchema = z.object({
  name: z.string().min(1, "O nome da métrica é obrigatório"),
  value: z.coerce.number(),
});

type MetricFormData = z.infer<typeof metricSchema>;

interface MetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MetricFormData) => void;
  editingMetric: Metric | null;
}

export default function MetricModal({ isOpen, onClose, onSubmit, editingMetric }: MetricModalProps) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<MetricFormData>({
    resolver: zodResolver(metricSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (editingMetric) {
        reset({ name: editingMetric.name, value: editingMetric.value });
      } else {
        reset({ name: "", value: 0 });
      }
    }
  }, [editingMetric, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {editingMetric ? 'Editar Métrica' : 'Nova Métrica'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
            <input 
              {...register('name')}
              className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Acurácia"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Valor</label>
            <input 
              type="number"
              step="any" 
              {...register('value')}
              className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.95"
            />
            {errors.value && <span className="text-xs text-red-500">{errors.value.message}</span>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}