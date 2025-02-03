export interface ModelData {
  nombreCompleto: string;
  edad: number;
  descripcion: string;
  etnia: string;
  zona: string;
  multimedias: string[];
  numeroContacto: string;
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
