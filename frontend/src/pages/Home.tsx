import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, ArrowRight, Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../services/api';
import type { Project } from '../types';
import ProjectModal from '../components/ProjectModal';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = () => {
    api.get('/projects')
      .then((response) => setProjects(response.data))
      .catch((err) => console.error("Erro ao buscar projetos:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (data: { name: string; description?: string }) => {
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, data);
      } else {
        await api.post('/projects', data);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      alert("Erro ao salvar projeto. Verifique o console.");
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (confirm("Tem certeza que deseja deletar este projeto? Todos os experimentos dele serão apagados.")) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects(); 
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const openEditModal = (e: React.MouseEvent, project: Project) => {
    e.preventDefault(); 
    e.stopPropagation();
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center mt-10">Carregando projetos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Meus Projetos</h2>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} /> Novo Projeto
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
           <p className="text-slate-500">Nenhum projeto encontrado.</p>
           <button onClick={openCreateModal} className="text-blue-600 font-semibold mt-2 hover:underline">
             Crie seu primeiro projeto
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FolderGit2 size={24} />
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => openEditModal(e, project)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, project.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Deletar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg text-slate-800 mb-2">{project.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 h-10">
                {project.description || "Sem descrição definida."}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                <span>Criado em: {new Date(project.createdAt).toLocaleDateString()}</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500" />
              </div>
            </Link>
          ))}
        </div>
      )}

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProject}
        editingProject={editingProject}
      />
    </div>
  );
}