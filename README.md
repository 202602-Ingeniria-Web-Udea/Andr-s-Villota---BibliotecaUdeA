# Biblioteca UdeA — Proyecto evaluativo de Ingeniería Web

Aplicación fullstack basada en el repositorio `base-app` del curso, adaptada a un **Sistema de Gestión de Biblioteca**. Implementada con Next.js 16, React 19, Tailwind 4, Prisma 7 y PostgreSQL/Supabase.

## Funcionalidades
- Landing e inicio de sesión con cookie HTTP-only y token firmado, contraseñas con bcrypt.
- Sidebar con nombre y rol del usuario autenticado.
- Maestros: catálogo de libros, saldos, autor y responsable. Creación exclusiva de ADMIN.
- Transacciones: entrada, préstamo (salida) y devolución (entrada); se registra cantidad, fecha, usuario y destinatario del préstamo.
- Gráfica de evolución diaria de existencias para el libro seleccionado.
- Administración de roles de usuarios exclusiva de ADMIN (validación en el servidor).
- Interfaz adaptable a pantallas pequeñas.

**Nota de alcance:** la devolución registra una entrada de ejemplares, pero no está vinculada a un préstamo individual pendiente; no hay control de vencimientos ni multas. El saldo es la cantidad de ejemplares disponibles.

## Integrantes
- Andrés Alejandro Villota Villota

## Instalación
Requiere Node.js reciente compatible con Next.js 16, npm y un proyecto PostgreSQL en Supabase.

1. `npm install`
2. Copia `.env.example` a `.env` y completa las variables con los datos reales de Supabase. No subas `.env` al repositorio.
3. `npx prisma generate`
4. `npx prisma migrate deploy` para aplicar la migración inicial incluida (usa DIRECT_URL). Para cambios futuros al esquema, utiliza `npx prisma migrate dev --name nombre-del-cambio`.
5. `npm run db:seed` para crear las cuentas y los libros de demostración.
6. `npm run dev` y abre `http://localhost:3000`.

Si el pooler y la conexión directa de Supabase utilizan hosts o puertos diferentes, configura `DATABASE_URL` y `DIRECT_URL` por separado. En producción aplica las migraciones con `npx prisma migrate deploy` usando la conexión directa.

## Usuarios de prueba

Para facilitar la evaluación del proyecto, se han creado dos cuentas de demostración con diferentes niveles de acceso.

### Administrador (ADMIN)

- **Correo electrónico:** `admin@biblioteca.test`
- **Contraseña:** `BiblioAdmin#2026_UdeA!84`
- **Rol:** ADMIN

**Permisos:** acceso al panel general, consulta y creación de libros, registro de transacciones y administración de roles de usuarios.

### Usuario estándar (USER)

- **Correo electrónico:** `usuario@biblioteca.test`
- **Contraseña:** `BiblioUsuario#2026_UdeA!57`
- **Rol:** USER

**Permisos:** acceso al panel general, consulta del catálogo de libros y registro de transacciones. No puede crear libros ni administrar usuarios.

## Aplicación desplegada

La aplicación se encuentra desplegada en Vercel y utiliza PostgreSQL mediante Supabase.

**Enlace de acceso:** Pendiente de agregar después del despliegue.

## Despliegue en Vercel
1. Crear un repositorio `nombreEquipo-Biblioteca` en la organización del curso.
2. Subir el código a la rama `main`, agregar al profesor como colaborador o miembro del equipo.
3. Importar el repositorio a Vercel y configurar `DATABASE_URL` y `AUTH_SECRET` en Environment Variables.
4. Generar Prisma Client durante la compilación (`prisma generate && next build`).
5. Aplicar las migraciones a Supabase desde un entorno seguro con `DIRECT_URL`.
6. Verificar login, roles, libros, movimientos y gráfica en el enlace público.
7. Configurar un dominio `nombreEquipo-Biblioteca.vercel.app` si está disponible.

## Verificación
`npm run lint` · `npm run typecheck` · `npm run build` · `npm audit`

## Seguridad
Las rutas API validan sesión y rol. El servidor impide préstamos sin existencias suficientes mediante una actualización condicional dentro de una transacción. Las contraseñas se almacenan con hash y no se exponen en respuestas. Para producción real se recomiendan además protección contra fuerza bruta, auditoría, recuperación de contraseña y una política más completa de préstamos.

## Origen
Adaptación del código base académico `202602-Ingeniria-Web-Udea/base-app`. Se conservaron las tecnologías y utilidades pertinentes; se sustituyeron los modelos de tienda por modelos de biblioteca y se implementó la lógica de negocio específica.

## Estado de validación

El proyecto fue configurado y probado satisfactoriamente en un entorno local.

Se realizaron las siguientes verificaciones:

- Generación del cliente Prisma y conexión con PostgreSQL en Supabase.
- Ejecución de migraciones y carga de datos iniciales.
- Compilación de producción mediante `npm run build`.
- Inicio de sesión con cuentas ADMIN y USER.
- Creación de libros y actualización del catálogo.
- Registro de entradas, préstamos y devoluciones.
- Actualización automática de las existencias disponibles.
- Visualización del historial de movimientos y del saldo diario.
- Verificación de las restricciones de acceso según el rol.
- Visualización y administración de usuarios desde la cuenta ADMIN.

El sistema queda preparado para su despliegue en Vercel y posterior validación mediante una URL pública.
