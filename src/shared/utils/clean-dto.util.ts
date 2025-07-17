/**
 * Limpia un DTO eliminando propiedades undefined (útil para updates parciales con Prisma).
 */

export function cleanDto<T extends object>(dto: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
}
