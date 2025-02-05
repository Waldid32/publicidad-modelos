# Etapa de construcción (builder)
FROM node:20 AS builder

WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Ejecutar la construcción de la aplicación (generar archivos en .next)
RUN npm run build

# ------------------------------------------------------------------
# Etapa de producción (runner)
FROM node:20

WORKDIR /app

# Copiar solo las dependencias necesarias para producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar los archivos generados en la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./
COPY --from=builder /app/next.config.ts ./

# Crear grupo y usuario 'nextjs'
RUN groupadd nextjs && useradd -m -g nextjs nextjs

# Crear la carpeta de caché de imágenes y asignar permisos al usuario 'nextjs'
RUN mkdir -p .next/cache/images && chown -R nextjs:nextjs .next

# Cambiar a usuario no privilegiado
USER nextjs

# Exponer el puerto y definir variables de entorno
EXPOSE 3232
ENV PORT=3232
ENV NODE_ENV=production

# Comando de inicio
CMD ["npm", "start"]
