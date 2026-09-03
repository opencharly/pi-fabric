import type { FabricMcpConfig } from "../config.js";
import type { FabricActionDescriptor } from "../protocol.js";
export interface McpAdvisoryCacheOptions {
    cwd: string;
    projectRoot: string;
    config: FabricMcpConfig;
}
export declare const loadCachedMcpDescriptors: (options: McpAdvisoryCacheOptions) => Promise<FabricActionDescriptor[]>;
export declare const toMcpAdvisoryDescriptor: (descriptor: FabricActionDescriptor) => FabricActionDescriptor;
//# sourceMappingURL=mcp-advisory.d.ts.map