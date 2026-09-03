import type { AgentToolResult, SourceInfo } from "@earendil-works/pi-coding-agent";
import { CapturedToolCatalog, type CapturedToolEntry } from "../capture/catalog.js";
import type { FabricActionDescriptor, FabricInvocationContext, FabricProvider, FabricProviderListRequest } from "../protocol.js";
export interface CapturedToolInvocationResult {
    content: AgentToolResult<unknown>["content"];
    text: string;
    details?: unknown;
    isError: boolean;
    terminate?: boolean;
    source: SourceInfo;
}
export declare const capturedToolNamespace: (entry: CapturedToolEntry) => string;
export declare const listCapturedToolDescriptors: (entries: CapturedToolEntry[]) => FabricActionDescriptor[];
export declare class CapturedToolsProvider implements FabricProvider {
    #private;
    readonly catalog: CapturedToolCatalog;
    readonly name = "extensions";
    readonly description = "Tools captured from other Pi extensions and invoked lazily through Fabric";
    constructor(catalog: CapturedToolCatalog, onToolUse?: (entry: CapturedToolEntry) => void);
    list(request: FabricProviderListRequest, _context: FabricInvocationContext): Promise<FabricActionDescriptor[]>;
    describe(actionName: string, _context: FabricInvocationContext): Promise<FabricActionDescriptor | undefined>;
    prepareArguments(actionName: string, args: Record<string, unknown>): Record<string, unknown>;
    invoke(actionName: string, args: Record<string, unknown>, context: FabricInvocationContext): Promise<CapturedToolInvocationResult>;
}
//# sourceMappingURL=captured-tools-provider.d.ts.map