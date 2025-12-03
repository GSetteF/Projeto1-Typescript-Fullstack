import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, ArrowRight } from 'lucide-react';
import api from '../services/api';
import type { Project } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then((response) => setProjects(response.data))
      .catch((err) => console.error("Erro ao buscar projetos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Carregando projetos...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Meus Projetos</h2>
      
      {projects.length === 0 ? (
        <p className="text-slate-500">Nenhum projeto encontrado. Crie um via API (Postman).</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FolderGit2 size={24} />
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500" />
              </div>
              
              <h3 className="font-semibold text-lg text-slate-800 mb-2">{project.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">
                {project.description || "Sem descrição definida."}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                Criado em: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}