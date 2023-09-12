# Schritt 1: Node-Image als Basis
FROM node:16.14-alpine as build-step

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json /app/
RUN npm install

# Quellcode kopieren und App bauen
COPY . /app/
RUN npm run build

# Schritt 2: Nginx-Image verwenden, um die gebaute App zu hosten
FROM nginx:1.19

# Gebaute App vom build-step in den nginx-Container kopieren
COPY --from=build-step /app/dist/matura-unterlage-practitioner /usr/share/nginx/html

# Nginx-Konfigurationsdatei anpassen, um den Dienst auf Port 4200 laufen zu lassen
RUN echo "server { listen 4200; root /usr/share/nginx/html; index index.html index.htm; server_name localhost; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

# Nginx-Port
EXPOSE 4200
