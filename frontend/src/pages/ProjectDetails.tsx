import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import api from '../services/api';
import type { Project, Experiment } from '../types';
import ExperimentCard from '../components/ExperimentCard';

export default function ProjectDetails() {
  const { projectId } = useParams(); 
  const [project, setProject] = useState<Project | null>(null);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/projects/${projectId}`),
      api.get(`/projects/${projectId}/experiments`)
    ])
    .then(([projRes, expRes]) => {
      setProject(projRes.data);
      setExperiments(expRes.data);
    })
    .catch(err => console.error("Erro ao carregar dados", err))
    .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className="text-center mt-10">Carregando detalhes...</div>;
  if (!project) return <div className="text-center mt-10 text-red-500">Projeto não encontrado.</div>;

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={20} />
        Voltar para Projetos
      </Link>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{project.name}</h1>
        <p className="text-slate-600 text-lg">{project.description}</p>
      </div>

      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Experimentos ({experiments.length})</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} /> Novo Experimento
        </button>
      </div>

      {experiments.length === 0 ? (
        <p className="text-slate-500 bg-slate-100 p-8 rounded-lg text-center">
          Este projeto ainda não tem experimentos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map(exp => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      )}
    </div>
  );
}