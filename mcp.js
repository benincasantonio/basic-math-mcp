import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const server = new McpServer({
  name: "basic-math-mcp",
  version: "1.0.0",
  description: "A basic math MCP server",
});

server.registerTool(
  "add",
  {
    title: "Addition tool",
    description: "Add two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a + b) }],
    };
  }
);

server.registerTool(
  "subtract",
  {
    title: "Subtraction tool",
    description: "Subtract two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a - b) }],
    };
  }
);

server.registerTool(
  "multiply",
  {
    title: "Multiplication tool",
    description: "Multiply two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a * b) }],
    };
  }
);

server.registerTool(
  "divide",
  {
    title: "Division tool",
    description: "Divide two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a / b) }],
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);
