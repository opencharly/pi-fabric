import type { FabricCapabilityAdvisoryConfig } from "../config.js";
import type { FabricActionDescriptor } from "../protocol.js";
export declare const CAPABILITY_ADVISORY_CUSTOM_TYPE = "pi-fabric-capability";
export interface CapabilityAdvisoryMatch {
    namespace: string;
    label: string;
    score: number;
    matchedTerms: string[];
    names: string[];
    descriptions: string[];
    omitted: number;
}
export interface CapabilityAdvisoryResult {
    content: string;
    display: boolean;
    details: {
        matches: CapabilityAdvisoryMatch[];
    };
}
type CapabilityBurnOrigin = "fired" | "organic";
export interface CapabilityBurn {
    namespace: string;
    origin: CapabilityBurnOrigin;
    at?: string;
}
export declare class CapabilityAdvisor {
    #private;
    setSource(source: string, descriptors: FabricActionDescriptor[]): void;
    refresh(descriptors: FabricActionDescriptor[]): void;
    hasSources(): boolean;
    reset(): void;
    restoreAshFromEntries(entries: Iterable<unknown>, nameToNamespace: (toolName: string, input?: Record<string, unknown>) => string | string[] | undefined): void;
    ashRecords(): CapabilityBurn[];
    observeToolUse(namespace: string): boolean;
    endTurn(): void;
    evaluate(prompt: string, config: FabricCapabilityAdvisoryConfig): CapabilityAdvisoryResult | undefined;
}
export {};
//# sourceMappingURL=capability-advisory.d.ts.map