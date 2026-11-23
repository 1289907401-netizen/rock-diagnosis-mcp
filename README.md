# rock-diagnosis-mcp

岩诊 · 岩石力学认知诊断 MCP（stdio）。

- 17 个工具：单轴六步、错因诊断、批量诊断、三轴拟合、Hoek-Brown、RQD、RMR89、GSI、地应力、Kirsch、边坡、应力变换
- 3 个知识资源：考点、错因、公式
- 4 个提示模板
- 零依赖、单文件、无需联网

## 用法

```bash
npx -y rock-diagnosis-mcp
```

在 MCP 客户端里配置：

```json
{
  "mcpServers": {
    "rock-diagnosis": {
      "command": "npx",
      "args": ["-y", "rock-diagnosis-mcp"]
    }
  }
}
```

## 自测

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize"}' | npx -y rock-diagnosis-mcp
```

## 许可

MIT
