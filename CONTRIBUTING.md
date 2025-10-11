## 🤖 AI Coding Rules (for LLMs)

When creating or updating API endpoints in this project:
- After adding new API routes, update `openapi.yaml` accordingly.
- Keep endpoint paths and response schemas consistent with Express handlers.
- Always document each new endpoint in the root file `openapi.yaml`.
- Each endpoint must include:
  - path (e.g., `/users/{id}`)
  - method (`GET`, `POST`, `DELETE`, etc.)
  - description
  - request schema
  - response schema and examples
- The `openapi.yaml` file is located in the root directory.
- Keep the OpenAPI file in sync with the actual API code.

Example snippet to add:
```yaml
  /tasks:
    post:
      summary: Create a new task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskInput'
      responses:
        "201":
          description: Task created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
