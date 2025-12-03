export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Experiment {
  id: string;
  name: string;
  parameters: Record<string, any> | null;
  projectId: string;
  createdAt: string;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  experimentId: string;
}