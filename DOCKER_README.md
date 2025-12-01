# Dockerization: Angular Frontend

This document explains the Docker setup for the Angular Frontend application.

## 🐳 Dockerfile Overview (`Dockerfile.frontend`)

The Dockerfile uses a **Multi-Stage Build** to keep the final image light and secure.

### Stage 1: Build
- **Base Image:** `node:20-alpine`
- **Action:** Installs dependencies (`npm ci`) and builds the Angular application (`npm run build`).
- **Output:** Static HTML/JS/CSS files in `dist/`.

### Stage 2: Runtime
- **Base Image:** `nginx:1.25-alpine`
- **Action:** Serves the static files using Nginx.
- **Configuration:**
  - Copies custom Nginx config (`nginx-app.conf`).
  - Installs SSL certificates (`fullchain.pem`, `wildcard.key`) into `/etc/nginx/ssl`.
  - Exposes ports **80** (HTTP) and **443** (HTTPS).

## 🛠️ Build & Run Commands

### 1. Build the Image
Run this from the `brambilla.chamadaqr.angular` directory:

```bash
docker build -t angular-frontend -f Dockerfile.frontend .
```

### 2. Run the Container
This command runs the container and maps the VM's ports 80 and 443 to the container.

```bash
docker run -d \
  -p 80:80 \
  -p 443:443 \
  --name frontend \
  angular-frontend
```

## 🔑 SSL Configuration
The container expects the following certificate files in the build context (root of this folder):
- `fullchain.pem`
- `wildcard.key`

These are copied to `/etc/nginx/ssl/` inside the container.
