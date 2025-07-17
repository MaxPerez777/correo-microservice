/**
 * Interfaz estándar para servicios CRUD reutilizables en todos los módulos.
 */
export interface ICrudService<ResponseDto, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<ResponseDto>;
  findAll(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<{ data: ResponseDto[]; meta: { total: number; page: number; limit: number; pages: number } }>;
  findOne(id: number): Promise<ResponseDto>;
  update(id: number, updateDto: UpdateDto): Promise<ResponseDto>;
  remove(id: number): Promise<void>;
}
