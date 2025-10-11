# Changelog

Формирование изменений в проекте FlyProx. Сюда бдуешь добавлять изменения в проекте 

## [Unreleased]
### Planned
- API эндпоинты
- Аутентификация и авторизация через supabase


## [1.0.0] - 2024-10-09
### Added
- Initial project setup
- Express.js server configuration
- PostgreSQL database integration
- Docker and Docker Compose configuration
- Environment variables setup (.env)
Supabase mcp

 MCP (Model Context Protocol) integration with:
  - Playwright
  - Figma
  - Supabase
  - PostgreSQL
  - HTTP requests
  - Sequential thinking
  - Serena 
- Firecrawl 
- Browserbase 
- Web to mcp 
- Chrome dev tools 
- Nodemon for development
- Basic project structure
- context7 
- file system 
- sentry

### Technical Details
- Node.js version: >=22
- Express version: ^5.1.0
- PostgreSQL version: ^8.16.3
- Redis version: ^5.8.2
- Package type: ES Modules

### Files Added
- `index.js` - Main application file
- `package.json` - Dependencies and scripts
- `.env` - Environment variables
- `docker-compose.yml` - Docker Compose configuration
- `Dockerfile` - Docker image configuration
- `mcp.json` - MCP server configuration
- `.gitignore` - Git ignore rules

---

## Правила версионирования
- **Major** - обратно несовместимые изменения
- **Minor** - новая функциональность, обратно совместимая
- **Patch** - исправления ошибок, обратно совместимые