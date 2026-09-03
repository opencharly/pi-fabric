// src/agents/transports/process-utils.ts
import { execFile, spawn } from "node:child_process";
import path from "node:path";
var executeFile = (command, args, options = {}) => new Promise((resolve, reject) => {
  execFile(
    command,
    args,
    {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      ...options.cwd ? { cwd: options.cwd } : {},
      ...options.timeoutMs ? { timeout: options.timeoutMs } : {}
    },
    (error, stdout, stderr) => {
      if (error) {
        Object.assign(error, { stdout, stderr });
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    }
  );
});
var commandAvailable = async (command) => {
  try {
    await executeFile("sh", ["-lc", `command -v ${shellQuote(command)}`], { timeoutMs: 2e3 });
    return true;
  } catch {
    return false;
  }
};
var shellQuote = (value) => `'${value.replaceAll("'", `'"'"'`)}'`;
var processIsAlive = (pid) => {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};
var GENERIC_RUNTIME = /^(node|bun)(\.exe)?$/;
var runtimeOverride = (env) => {
  const value = env.PI_FABRIC_NODE_BINARY;
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
};
var isGenericRuntime = (execPath, requireNode) => {
  const name = path.basename(execPath).toLowerCase();
  return GENERIC_RUNTIME.test(name) && (!requireNode || name.startsWith("node"));
};
var missingRuntimeError = (execPath) => new Error(
  `Fabric requires a Node.js or Bun runtime to launch a JavaScript worker, but process.execPath is ${execPath} (not node/bun) and PI_FABRIC_NODE_BINARY is unset. Install Node.js or Bun, or set PI_FABRIC_NODE_BINARY to the runtime binary.`
);
var resolveScriptRuntimeUncached = async (options = {}) => {
  const execPath = options.execPath ?? process.execPath;
  const env = options.env ?? process.env;
  const requireNode = options.requireNode === true;
  if (isGenericRuntime(execPath, requireNode)) return execPath;
  const override = runtimeOverride(env);
  if (override) return override;
  for (const candidate of requireNode ? ["node"] : ["node", "bun"]) {
    if (await commandAvailable(candidate)) return candidate;
  }
  throw missingRuntimeError(execPath);
};
var cachedDefaultRuntime;
var resolveScriptRuntime = async (options) => {
  if (options && (options.execPath !== void 0 || options.env !== void 0 || options.requireNode !== void 0)) {
    return resolveScriptRuntimeUncached(options);
  }
  if (cachedDefaultRuntime) return cachedDefaultRuntime;
  cachedDefaultRuntime = await resolveScriptRuntimeUncached();
  return cachedDefaultRuntime;
};
var resolveScriptRuntimeSync = (options = {}) => {
  const execPath = options.execPath ?? process.execPath;
  const env = options.env ?? process.env;
  const requireNode = options.requireNode === true;
  if (isGenericRuntime(execPath, requireNode)) return execPath;
  const override = runtimeOverride(env);
  if (override) return override;
  throw missingRuntimeError(execPath);
};
var scriptSpawnArgs = async (workerPath, workerArguments, options) => {
  const runtime = await resolveScriptRuntime(options);
  return [runtime, workerPath, ...workerArguments];
};
var workerCommand = async (workerPath, workerArguments) => (await scriptSpawnArgs(workerPath, workerArguments)).map(shellQuote).join(" ");
var spawnDetached = async (workerPath, workerArguments, cwd) => {
  const runtime = await resolveScriptRuntime();
  const child = spawn(runtime, [workerPath, ...workerArguments], {
    cwd,
    detached: process.platform !== "win32",
    stdio: "ignore"
  });
  if (!child.pid) throw new Error("Failed to launch Fabric worker process");
  const pid = child.pid;
  child.unref();
  return {
    pid,
    async stop() {
      try {
        process.kill(process.platform === "win32" ? pid : -pid, "SIGTERM");
      } catch {
      }
    },
    async isAlive() {
      return processIsAlive(pid);
    }
  };
};

export {
  executeFile,
  commandAvailable,
  processIsAlive,
  resolveScriptRuntimeSync,
  scriptSpawnArgs,
  workerCommand,
  spawnDetached
};
//# sourceMappingURL=chunk-TRCPWFCJ.js.map
