# Basic Math MCP Server

A simple Model Context Protocol (MCP) server that provides basic mathematical operations. This server demonstrates how to create and expose tools via the MCP protocol.

## Features

This MCP server provides four basic mathematical operations:

- **add**: Add two numbers
- **subtract**: Subtract two numbers
- **multiply**: Multiply two numbers
- **divide**: Divide two numbers

## Prerequisites

- Node.js
- npm

## Installation

```bash
npm install
```

## Usage

The server communicates via stdin/stdout using JSON-RPC 2.0 protocol. Below are examples of how to interact with the server using command-line tools.

### Initialize the Server

Before using the server, you should initialize it to establish the protocol version and capabilities:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test-client", "version": "1.0.0"}}}' | node mcp.js | jq
```

**Example Response:**

```json
{
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": {
        "listChanged": true
      }
    },
    "serverInfo": {
      "name": "basic-math-mcp",
      "version": "1.0.0",
      "description": "A basic math MCP server"
    }
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### List Available Tools

To see all available tools and their schemas:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node mcp.js | jq
```

**Example Response:**

```json
{
  "result": {
    "tools": [
      {
        "name": "add",
        "title": "Addition tool",
        "description": "Add two numbers",
        "inputSchema": {
          "type": "object",
          "properties": {
            "a": {
              "type": "number"
            },
            "b": {
              "type": "number"
            }
          },
          "required": ["a", "b"],
          "additionalProperties": false,
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      },
      {
        "name": "subtract",
        "title": "Subtraction tool",
        "description": "Subtract two numbers",
        "inputSchema": {
          "type": "object",
          "properties": {
            "a": {
              "type": "number"
            },
            "b": {
              "type": "number"
            }
          },
          "required": ["a", "b"],
          "additionalProperties": false,
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      },
      {
        "name": "multiply",
        "title": "Multiplication tool",
        "description": "Multiply two numbers",
        "inputSchema": {
          "type": "object",
          "properties": {
            "a": {
              "type": "number"
            },
            "b": {
              "type": "number"
            }
          },
          "required": ["a", "b"],
          "additionalProperties": false,
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      },
      {
        "name": "divide",
        "title": "Division tool",
        "description": "Divide two numbers",
        "inputSchema": {
          "type": "object",
          "properties": {
            "a": {
              "type": "number"
            },
            "b": {
              "type": "number"
            }
          },
          "required": ["a", "b"],
          "additionalProperties": false,
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      }
    ]
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### Call a Tool

To execute a specific tool, use the `tools/call` method with the tool name and arguments:

#### Addition Example

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "add", "arguments": {"a": 10, "b": 2}}}' | node mcp.js | jq
```

**Example Response:**

```json
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "12"
      }
    ]
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

#### Subtraction Example

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "subtract", "arguments": {"a": 10, "b": 2}}}' | node mcp.js | jq
```

#### Multiplication Example

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "multiply", "arguments": {"a": 10, "b": 2}}}' | node mcp.js | jq
```

#### Division Example

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "divide", "arguments": {"a": 10, "b": 2}}}' | node mcp.js | jq
```

## Technical Details

### Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for building MCP servers
- `zod`: Schema validation library

### Protocol

This server implements the Model Context Protocol (MCP) using:

- **Transport**: stdio (stdin/stdout)
- **Protocol**: JSON-RPC 2.0
- **Protocol Version**: 2024-11-05

### Input Schema

All mathematical operations accept two parameters:

- `a` (number, required): The first operand
- `b` (number, required): The second operand

### Output Format

All tools return results in the following format:

```json
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "<result>"
      }
    ]
  },
  "jsonrpc": "2.0",
  "id": <request-id>
}
```

## License

MIT
