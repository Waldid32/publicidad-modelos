# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar solo las dependencias necesarias
COPY package*.json ./
RUN npm ci --only=production

# Copiar los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./
COPY --from=builder /app/next.config.ts ./

# Crear la carpeta de caché de imágenes y asignar permisos al usuario 'nextjs'
RUN mkdir -p .next/cache/images && chown -R nextjs:nextjs .next

# Definir usuario seguro
RUN adduser --system nextjs
USER nextjs

# Exponer el puerto y definir variables de entorno
EXPOSE 3232
ENV PORT=3232
ENV NODE_ENV=production

# Comando de inicio
CMD ["npm", "start"]
