# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copia de package.json y package-lock.json
COPY package*.json ./

# Instalación de dependencias
RUN npm ci

# Copia del resto de archivos
COPY . .

# Construcción de la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Instala solo las dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copia los archivos necesarios desde la etapa de builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./

# Configuración de usuario no root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Configuración del puerto
EXPOSE 3232
ENV PORT=3232
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["npm", "start"]