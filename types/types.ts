export interface ModelData {
  id: string;
  nombreCompleto: string;
  nombreUsuario: string;
  edad: number;
  descripcion: string;
  etnia: string;
  zona: string;
  multimedias: string[];
  numeroContacto: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface DataModels {
  activo: boolean;
  ciudad: string;
  createdAt: string;
  descripcion: string;
  duracionesAdicionales: string;
  edad: number;
  email: string;
  etnia: string;
  fechaNacimiento: string;
  idiomas: string[];
  multimedias: string[];
  nombreCompleto: string;
  nombreUsuario: string;
  numeroContacto: string;
  precioHora: number;
  rol: string;
  zona: string;
}

export interface Rating {
  id: string;
  modelId: string;
  clientId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  client: {
    nombreUsuario: string;
    nombreCompleto: string;
  };
}

interface OpenCageGeometry {
  lat: number;
  lng: number;
}

interface OpenCageComponents {
  city?: string;
  state?: string;
  country?: string;
  formatted?: string;
}

interface OpenCageResult {
  formatted: string;
  components: OpenCageComponents;
  geometry: OpenCageGeometry;
}

export interface OpenCageResponse {
  results: OpenCageResult[];
}
