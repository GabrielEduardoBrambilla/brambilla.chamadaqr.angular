#!/bin/sh
# ==============================================================================
# Docker Entrypoint Script - Frontend Container
# Projeto: ChamadaQR - Sistema de Chamadas Automatizadas
# ==============================================================================

set -e  # Exit on error

echo "======================================"
echo "  ChamadaQR Frontend Container"
echo "  Inicializando..."
echo "======================================"
echo ""

# ==============================================================================
# 1. Validar Certificados SSL
# ==============================================================================
echo "1. Validando certificados SSL..."

if [ ! -f "/etc/nginx/ssl/fullchain.pem" ]; then
    echo "❌ ERRO: fullchain.pem não encontrado!"
    exit 1
fi

if [ ! -f "/etc/nginx/ssl/wildcard.key" ]; then
    echo "❌ ERRO: wildcard.key não encontrado!"
    exit 1
fi

# Verificar se certificado é válido
if openssl x509 -in /etc/nginx/ssl/fullchain.pem -noout -text > /dev/null 2>&1; then
    echo "✅ Certificado SSL válido"
    
    # Mostrar informações do certificado
    echo "   Subject: $(openssl x509 -in /etc/nginx/ssl/fullchain.pem -noout -subject | sed 's/subject=//')"
    echo "   Issuer:  $(openssl x509 -in /etc/nginx/ssl/fullchain.pem -noout -issuer | sed 's/issuer=//')"
    echo "   Expira:  $(openssl x509 -in /etc/nginx/ssl/fullchain.pem -noout -enddate | sed 's/notAfter=//')"
else
    echo "❌ ERRO: Certificado SSL inválido!"
    exit 1
fi

# Verificar chave privada
if openssl rsa -in /etc/nginx/ssl/wildcard.key -check -noout > /dev/null 2>&1; then
    echo "✅ Chave privada válida"
else
    echo "❌ ERRO: Chave privada inválida!"
    exit 1
fi

echo ""

# ==============================================================================
# 2. Validar Arquivos do Angular
# ==============================================================================
echo "2. Validando arquivos do Angular..."

if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    echo "❌ ERRO: index.html não encontrado!"
    echo "   Pasta: /usr/share/nginx/html/"
    ls -la /usr/share/nginx/html/ || true
    exit 1
fi

echo "✅ index.html encontrado"

# Contar arquivos
FILE_COUNT=$(ls -1 /usr/share/nginx/html/ | wc -l)
echo "   Total de arquivos/pastas: $FILE_COUNT"

echo ""

# ==============================================================================
# 3. Testar Configuração do Nginx
# ==============================================================================
echo "3. Testando configuração do Nginx..."

if nginx -t 2>&1; then
    echo "✅ Configuração do Nginx válida"
else
    echo "❌ ERRO: Configuração do Nginx inválida!"
    nginx -t
    exit 1
fi

echo ""

# ==============================================================================
# 4. Exibir Informações do Container
# ==============================================================================
echo "======================================"
echo "  Informações do Container"
echo "======================================"
echo ""
echo "Hostname:    $(hostname)"
echo "IP Address:  $(hostname -i 2>/dev/null || echo 'N/A')"
echo "User:        $(whoami)"
echo ""
echo "Portas expostas:"
echo "  - 443 (HTTPS)"
echo "  - 80  (HTTP → redirect para HTTPS)"
echo ""
echo "Health check:"
echo "  - Endpoint: https://localhost:443/health"
echo "  - Intervalo: 30s"
echo ""
echo "Logs:"
echo "  - Access: /var/log/nginx/access.log"
echo "  - Error:  /var/log/nginx/error.log"
echo ""

# ==============================================================================
# 5. Exibir URLs de Teste
# ==============================================================================
echo "======================================"
echo "  URLs de Teste"
echo "======================================"
echo ""
echo "Testar diretamente no container:"
echo "  curl -k https://localhost:443/"
echo ""
echo "Testar via VM host:"
echo "  curl -k https://192.168.56.102:443/"
echo ""
echo "Testar via HAProxy:"
echo "  curl -k https://192.168.56.104/"
echo ""

# ==============================================================================
# 6. Iniciar Nginx
# ==============================================================================
echo "======================================"
echo "  Iniciando Nginx..."
echo "======================================"
echo ""

# Executar comando passado como argumento (geralmente "nginx -g daemon off;")
exec "$@"