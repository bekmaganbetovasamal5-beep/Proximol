#!/bin/bash

# Улучшенный скрипт для тестирования MCP серверов
# Проверяет каждый сервер индивидуально

set -e

# Цвета
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Файл конфигурации
MCP_CONFIG="mcp.json"

# Тестовая директория
TEST_DIR="./mcp_test"
mkdir -p "$TEST_DIR"

echo -e "${CYAN}=== MCP Server Individual Test ===${NC}"
echo ""

# Получаем список серверов
servers=$(jq -r '.mcpServers | keys[]' "$MCP_CONFIG")

echo -e "${BLUE}Found $(echo "$servers" | wc -l) MCP servers to test:${NC}"
echo ""

# Тестируем каждый сервер
for server in $servers; do
    echo -e "${BLUE}Testing: $server${NC}"

    # Получаем конфигурацию
    command=$(jq -r ".mcpServers[\"$server\"].command" "$MCP_CONFIG")
    args=$(jq -r ".mcpServers[\"$server\"].args[]?" "$MCP_CONFIG" | tr '\n' ' ')

    # Проверяем, что команда не пустая
    if [ "$command" = "null" ] || [ -z "$command" ]; then
        echo -e "  ${RED}✗ No command found${NC}"
        continue
    fi

    # Формируем полную команду
    full_cmd="npx $command $args"

    # Проверяем, установлен ли пакет
    echo -e "  ${YELLOW}→ Checking package...${NC}"

    # Пробуем получить информацию о пакете
    if npx $command --version &> "$TEST_DIR/${server}_version.txt" 2>&1; then
        version=$(cat "$TEST_DIR/${server}_version.txt" | head -n 1)
        echo -e "  ${GREEN}✓ Package available: $version${NC}"
    else
        # Пробуем установить пакет
        echo -e "  ${YELLOW}→ Installing package...${NC}"
        if npx $command --help &> "$TEST_DIR/${server}_help.txt" 2>&1; then
            echo -e "  ${GREEN}✓ Package installed successfully${NC}"
        else
            echo -e "  ${RED}✗ Failed to install package${NC}"
            echo -e "  ${YELLOW}  Error: $(head -n 1 "$TEST_DIR/${server}_help.txt")${NC}"
        fi
    fi

    # Проверяем переменные окружения
    env_count=$(jq -r ".mcpServers[\"$server\"].env | length" "$MCP_CONFIG" 2>/dev/null || echo "0")
    if [ "$env_count" -gt 0 ]; then
        echo -e "  ${YELLOW}→ Environment variables: $env_count configured${NC}"
    fi

    echo ""
done

# Очистка
rm -rf "$TEST_DIR"

echo -e "${GREEN}=== Test Complete ===${NC}"