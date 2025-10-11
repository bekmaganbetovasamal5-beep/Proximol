#!/bin/bash

# Скрипт для проверки всех MCP серверов из mcp.json
# Проверяет работоспособность каждого сервера и выводит статус

set -e

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Файл конфигурации
MCP_CONFIG="mcp.json"

# Временные файлы для логов
LOG_DIR="./mcp_logs"
mkdir -p "$LOG_DIR"

# Функция для вывода статуса
print_status() {
    local status=$1
    local server=$2
    local message=$3

    case $status in
        "OK")
            echo -e "${GREEN}✓${NC} $server: $message"
            ;;
        "FAIL")
            echo -e "${RED}✗${NC} $server: $message"
            ;;
        "WARN")
            echo -e "${YELLOW}⚠${NC} $server: $message"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ${NC} $server: $message"
            ;;
    esac
}

# Функция проверки зависимостей
check_dependencies() {
    echo -e "${BLUE}Checking dependencies...${NC}"

    # Проверка Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "OK" "Node.js" "installed ($NODE_VERSION)"
    else
        print_status "FAIL" "Node.js" "not installed"
        exit 1
    fi

    # Проверка npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_status "OK" "npm" "installed ($NPM_VERSION)"
    else
        print_status "FAIL" "npm" "not installed"
        exit 1
    fi

    # Проверка npx
    if command -v npx &> /dev/null; then
        print_status "OK" "npx" "available"
    else
        print_status "FAIL" "npx" "not available"
        exit 1
    fi

    # Проверка uvx
    if command -v uvx &> /dev/null; then
        print_status "OK" "uvx" "available"
    else
        print_status "WARN" "uvx" "not available - needed for Serena MCP"
        echo "   Install with: pip install uvx"
    fi

    # Проверка uv
    if command -v uv &> /dev/null; then
        UV_VERSION=$(uv --version)
        print_status "OK" "uv" "installed ($UV_VERSION)"
    else
        print_status "WARN" "uv" "not installed - needed for Serena MCP local installation"
        echo "   Install with: pip install uv"
    fi

    # Проверка jq
    if command -v jq &> /dev/null; then
        print_status "OK" "jq" "installed"
    else
        print_status "FAIL" "jq" "not installed - required for JSON parsing"
        echo "   Install with: brew install jq"
        exit 1
    fi

    echo ""
}

# Функция проверки MCP сервера
check_mcp_server() {
    local server_name=$1

    echo -e "${BLUE}Checking server: $server_name${NC}"

    # Извлекаем команду из JSON
    local command=$(jq -r ".mcpServers[\"$server_name\"].command" "$MCP_CONFIG" 2>/dev/null)

    if [ "$command" = "null" ] || [ -z "$command" ]; then
        print_status "FAIL" "$server_name" "command not found"
        return 1
    fi

    # Извлекаем аргументы
    local args=$(jq -r ".mcpServers[\"$server_name\"].args[]?" "$MCP_CONFIG" 2>/dev/null | tr '\n' ' ')

    # Проверяем переменные окружения
    local env_vars=$(jq -r ".mcpServers[\"$server_name\"].env | to_entries[] | \"\(.key)=\(.value)\"" "$MCP_CONFIG" 2>/dev/null)

    # Создаем временный файл для теста
    local test_file="$LOG_DIR/${server_name}_test.json"
    local timeout=15
    local start_time=$(date +%s)

    # Запускаем сервер с таймаутом
    if [ -n "$env_vars" ]; then
        # С переменными окружения
        if [ "$command" = "uvx" ] || [ "$command" = "uv" ]; then
            timeout ${timeout}s env $(echo "$env_vars") $command $args --help > "$test_file" 2>&1 || true
        else
            timeout ${timeout}s env $(echo "$env_vars") npx $command $args --help > "$test_file" 2>&1 || true
        fi
    else
        # Без переменных окружения
        if [ "$command" = "uvx" ] || [ "$command" = "uv" ]; then
            timeout ${timeout}s $command $args --help > "$test_file" 2>&1 || true
        else
            timeout ${timeout}s npx $command $args --help > "$test_file" 2>&1 || true
        fi
    fi

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    # Проверяем результат
    if [ -f "$test_file" ] && [ -s "$test_file" ]; then
        # Проверяем на наличие ошибок
        if grep -qi "error\|not found\|failed\|command not found" "$test_file"; then
            print_status "WARN" "$server_name" "started with warnings (startup: ${duration}s)"
            echo -e "${YELLOW}   Log:${NC} $(head -n 1 "$test_file")"
        else
            print_status "OK" "$server_name" "working correctly (startup: ${duration}s)"
        fi
    else
        print_status "FAIL" "$server_name" "failed to start"
    fi

    # Очистка
    rm -f "$test_file"
    echo ""
}

# Функция проверки серверов с базой данных
check_db_servers() {
    echo -e "${BLUE}Checking database servers...${NC}"

    # PostgreSQL
    if command -v pg_isready &> /dev/null; then
        if pg_isready -h localhost -p 5432 -U postgres &> /dev/null; then
            print_status "OK" "PostgreSQL" "available at localhost:5432"
        else
            print_status "WARN" "PostgreSQL" "not available at localhost:5432"
        fi
    else
        print_status "WARN" "PostgreSQL" "pg_isready not found"
    fi

    # Redis (если используется)
    if command -v redis-cli &> /dev/null; then
        if redis-cli ping &> /dev/null; then
            print_status "OK" "Redis" "available"
        else
            print_status "WARN" "Redis" "not available"
        fi
    else
        print_status "INFO" "Redis" "not used"
    fi

    echo ""
}

# Основная функция
main() {
    echo -e "${BLUE}=== MCP Server Checker ===${NC}"
    echo "Checking all MCP servers from $MCP_CONFIG"
    echo ""

    # Устанавливаем английскую локаль для корректной работы
    export LC_ALL=C

    # Проверка зависимостей
    check_dependencies

    # Проверка наличия mcp.json
    if [ ! -f "$MCP_CONFIG" ]; then
        print_status "FAIL" "Configuration" "$MCP_CONFIG not found"
        exit 1
    fi

    print_status "OK" "Configuration" "$MCP_CONFIG found"
    echo ""

    # Проверка баз данных
    check_db_servers

    # Подсчет серверов
    local total_servers=0
    local working_servers=0
    local failed_servers=0

    # Чтение и проверка каждого сервера
    echo -e "${BLUE}=== Checking MCP Servers ===${NC}"

    # Извлекаем имена серверов с помощью jq
    local servers=$(jq -r '.mcpServers | keys[]' "$MCP_CONFIG" 2>/dev/null)

    if [ -z "$servers" ]; then
        print_status "FAIL" "Parser" "could not find MCP servers in configuration"
        exit 1
    fi

    for server in $servers; do
        total_servers=$((total_servers + 1))

        # Проверяем сервер
        if check_mcp_server "$server"; then
            working_servers=$((working_servers + 1))
        else
            failed_servers=$((failed_servers + 1))
        fi
    done

    # Итоговый отчет
    echo -e "${BLUE}=== Summary Report ===${NC}"
    echo "Total servers: $total_servers"
    echo -e "Working: ${GREEN}$working_servers${NC}"
    echo -e "Failed: ${RED}$failed_servers${NC}"

    if [ $failed_servers -eq 0 ]; then
        echo ""
        print_status "OK" "Result" "all MCP servers are working correctly!"
        exit 0
    else
        echo ""
        print_status "WARN" "Result" "some servers need attention"
        exit 1
    fi
}

# Запуск
main "$@"