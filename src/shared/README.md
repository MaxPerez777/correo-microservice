# Carpeta `shared`

Centraliza **todos los elementos reutilizables** del proyecto para facilitar el mantenimiento, la colaboración y la escalabilidad.

> **Estado actual:**
> La carpeta `shared` fue revisada y se confirmó que todos sus subdirectorios y utilidades están siendo utilizados activamente por los módulos del microservicio. Puedes dejarla intacta y utilizarla como referencia para futuros desarrollos.

## Estructura y propósito
- `base/` — Clases abstractas base para servicios (ej: `BaseService`).
- `services/` — Servicios singleton reutilizables, como `PrismaService` para acceso a base de datos.
- `interfaces/` — Interfaces comunes para contratos de servicios (ej: `ICrudService`).
- `dto/` — DTOs reutilizables, como `PaginationDto` para paginación estándar.
- `constants/` — Centralización de mensajes de error y éxito (`messages.ts`).
- `filters/` — Filtros globales para manejo uniforme de excepciones HTTP y gRPC.
- `utils/` — Utilidades genéricas (ej: `cleanDto` para limpiar objetos antes de updates parciales).
- `transformers/` — Helpers para transformar objetos entre camelCase y snake_case (útil en gRPC).

## Buenas prácticas
- **Importa siempre desde `shared`** para mantener la arquitectura limpia y evitar duplicidad de lógica entre módulos.
- **Centraliza mensajes**: Usa siempre los mensajes de `constants/messages.ts` para errores y respuestas, así aseguras consistencia y facilidad de mantenimiento.
- **DTOs y filtros**: Utiliza los DTOs y filtros globales para mantener validaciones y manejo de errores uniforme en todos los módulos.
- **Extiende BaseService**: Todos los servicios de módulos deben extender `BaseService` para heredar el comportamiento estándar CRUD.

## Ejemplo de uso
```typescript
// Importar un DTO reutilizable
import { PaginationDto } from '../../shared/dto/pagination.dto';

// Importar y usar mensajes centralizados
import { Messages } from '../../shared/constants/messages';
throw new NotFoundException(Messages.ROLE_NOT_FOUND);

// Extender BaseService en un módulo
export class RolesService extends BaseService<...> { ... }
```

---

**Cualquier nuevo elemento reutilizable debe agregarse aquí para mantener la coherencia y facilitar el trabajo colaborativo.**

> **Recomendación:**
> Antes de cada revisión o despliegue, revisa que los elementos de `shared` sigan en uso. Si encuentras algo obsoleto, elimínalo para mantener la carpeta limpia y relevante.

> Si agregas nuevos helpers, DTOs, servicios o utilidades, documenta brevemente su propósito aquí.

---

## Ejemplo mínimo de DTO y Entity para un nuevo módulo

### DTO de creación (create-mi-modulo.dto.ts)
```typescript
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO para crear un nuevo elemento de MiModulo
 */
export class CreateMiModuloDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
```

### DTO de actualización (update-mi-modulo.dto.ts)
```typescript
import { IsString, IsOptional } from 'class-validator';

/**
 * DTO para actualizar un elemento de MiModulo
 */
export class UpdateMiModuloDto {
  @IsString()
  @IsOptional()
  nombre?: string;
}
```

### DTO de respuesta (mi-modulo-response.dto.ts)
```typescript
/**
 * DTO de respuesta para MiModulo
 */
export class MiModuloResponseDto {
  id: number;
  nombre: string;
}
```

### Entidad (mi-modulo.entity.ts)
```typescript
/**
 * Entidad de dominio para MiModulo
 */
export class MiModuloEntity {
  id: number;
  nombre: string;
}
```

---

> **Recuerda:** Los DTOs deben estar en la carpeta `dto/` y las entidades en `entities/`, siguiendo la estructura estándar del proyecto. Utiliza decoradores de validación y mantén los comentarios claros y concisos.
