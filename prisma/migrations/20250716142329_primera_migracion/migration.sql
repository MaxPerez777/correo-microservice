-- CreateTable
CREATE TABLE "Correo" (
    "idCorreo" SERIAL NOT NULL,
    "asunto" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idPersona" INTEGER,
    "idEmpresa" INTEGER,
    "idDestino" INTEGER,

    CONSTRAINT "Correo_pkey" PRIMARY KEY ("idCorreo")
);

-- CreateTable
CREATE TABLE "Persona" (
    "idPersona" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("idPersona")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "idEmpresa" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("idEmpresa")
);

-- CreateTable
CREATE TABLE "Destino" (
    "idDestino" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("idDestino")
);

-- CreateTable
CREATE TABLE "CorreoPedido" (
    "idCorreoPedido" SERIAL NOT NULL,
    "idCorreo" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CorreoPedido_pkey" PRIMARY KEY ("idCorreoPedido")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_dni_key" ON "Persona"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_ruc_key" ON "Empresa"("ruc");

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_idPersona_fkey" FOREIGN KEY ("idPersona") REFERENCES "Persona"("idPersona") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_idEmpresa_fkey" FOREIGN KEY ("idEmpresa") REFERENCES "Empresa"("idEmpresa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_idDestino_fkey" FOREIGN KEY ("idDestino") REFERENCES "Destino"("idDestino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorreoPedido" ADD CONSTRAINT "CorreoPedido_idCorreo_fkey" FOREIGN KEY ("idCorreo") REFERENCES "Correo"("idCorreo") ON DELETE RESTRICT ON UPDATE CASCADE;
