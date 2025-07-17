/**
 * Clase base abstracta para servicios CRUD reutilizables en todos los módulos.
 * Extiende ICrudService y define métodos genéricos a implementar por cada módulo.
 */
import { ICrudService } from '../interfaces/crud.interface';

/**
 * BaseService
 * -----------
 * Clase abstracta que implementa la interfaz ICrudService y define los métodos CRUD genéricos.
 * Todos los servicios de módulos deben extender esta clase para garantizar un comportamiento consistente.
 */
export abstract class BaseService<T, CreateDto, UpdateDto, ResponseDto = T> implements ICrudService<ResponseDto, CreateDto, UpdateDto> {
  /**
   * Modelo de Prisma para la entidad
   * Debe ser implementado por las clases hijas
   */
  protected abstract prismaModel: any;

  /**
   * Crea una nueva entidad
   * @param createDto DTO con los datos para crear la entidad
   * @returns La entidad creada
   */
  abstract create(createDto: CreateDto): Promise<ResponseDto>;

  /**
   * Obtiene todas las entidades con paginación y búsqueda
   * @param page Número de página
   * @param limit Límite de resultados por página
   * @param search Término de búsqueda
   * @returns Lista de entidades y metadatos de paginación
   */
  abstract findAll(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<{ data: ResponseDto[]; meta: { total: number; page: number; limit: number; pages: number } }>;

  /**
   * Obtiene una entidad por su ID
   * @param id ID de la entidad
   * @returns La entidad encontrada
   */
  abstract findOne(id: number): Promise<ResponseDto>;

  /**
   * Actualiza una entidad
   * @param id ID de la entidad
   * @param updateDto DTO con los datos a actualizar
   * @returns La entidad actualizada
   */
  abstract update(id: number, updateDto: UpdateDto): Promise<ResponseDto>;

  /**
   * Elimina una entidad
   * @param id ID de la entidad
   * @returns void
   */
  abstract remove(id: number): Promise<void>;

  /**
   * Construye la consulta de búsqueda para Prisma
   * @param search Término de búsqueda
   * @returns Consulta Prisma
   */
  protected abstract buildSearchQuery(search: string): any;

  /**
   * Mapea una entidad a un DTO de respuesta
   * @param entity Entidad
   * @returns DTO de respuesta
   */
  protected abstract mapToDto(entity: T): ResponseDto;
}
