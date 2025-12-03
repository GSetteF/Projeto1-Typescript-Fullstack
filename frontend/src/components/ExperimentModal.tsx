import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { Experiment } from '../types';

const experimentSchema = z.object({
  name: z.string().min(1, "O nome do experimento é obrigatório"),
  parametersString: z.string().optional().refine((val) => {
    if (!val) return true; 
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Os parâmetros devem estar em formato JSON válido (ex: {\"lr\": 0.01})" }),
});

type ExperimentFormData = z.infer<typeof experimentSchema>;

interface ExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; parameters: Record<string, any> | null }) => void;
  editingExperiment: Experiment | null;
}

export default function ExperimentModal({ isOpen, onClose, onSubmit, editingExperiment }: ExperimentModalProps) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ExperimentFormData>({
    resolver: zodResolver(experimentSchema),
  });

  useEffect(() => {
    if (editingExperiment) {
      reset({
        name: editingExperiment.name,
        parametersString: editingExperiment.parameters 
          ? JSON.stringify(editingExperiment.parameters, null, 2) 
          : "",
      });
    } else {
      reset({ name: "", parametersString: "" });
    }
  }, [editingExperiment, isOpen, reset]);

  const handleFormSubmit = (data: ExperimentFormData) => {
    const parameters = data.parametersString && data.parametersString.trim() !== "" 
      ? JSON.parse(data.parametersString) 
      : null;

    onSubmit({
      name: data.name,
      parameters,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {editingExperiment ? 'Editar Experimento' : 'Novo Experimento'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Experimento</label>
            <input 
              {...register('name')}
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Teste Random Forest V1"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Parâmetros (JSON) <span className="text-xs text-slate-400 font-normal">(Opcional)</span>
            </label>
            <textarea 
              {...register('parametersString')}
              rows={5}
              className="w-full border border-slate-300 rounded-md p-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={'{\n  "learning_rate": 0.01,\n  "epochs": 100\n}'}
            />
            {errors.parametersString && <span className="text-xs text-red-500">{errors.parametersString.message}</span>}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {editingExperiment ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}