# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependencias y realizar instalación
COPY package*.json ./
RUN npm ci

# Copiar el código fuente
COPY . . 

# Construcción de la aplicación
RUN npm run build

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

# Definir usuario seguro
RUN adduser --system nextjs
USER nextjs

# Exponer el puerto y definir variables de entorno
EXPOSE 3232
ENV PORT=3232
ENV NODE_ENV=production

# Comando de inicio
CMD ["npm", "start"]
