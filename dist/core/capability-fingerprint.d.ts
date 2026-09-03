import type { FabricActionDescriptor } from "../protocol.js";
export interface CapabilitySourceFingerprint {
    namespace: string;
    label: string;
    toolCount: number;
    names: string[];
    descriptions: string[];
    toolTerms: ReadonlySet<string>[];
    tf: Map<string, number>;
}
export interface CapabilityIndex {
    sourceCount: number;
    sources: CapabilitySourceFingerprint[];
    idf(term: string): number;
    docFrequency(term: string): number;
}
export declare const tokenizeCapabilityText: (text: string) => string[];
export declare const capabilityWordCandidates: (word: string) => string[];
export declare const capabilityPathOnlyTerms: (text: string) => ReadonlySet<string>;
export declare const splitCapabilityWords: (text: string) => string[];
export declare const isMostlyNonLatinPrompt: (text: string) => boolean;
export declare const capabilitySourceLabel: (namespace: string | undefined) => string;
export declare const buildCapabilityIndex: (descriptors: FabricActionDescriptor[]) => CapabilityIndex;
export declare const capabilityFirstSentence: (description: string) => string;
export declare const truncateAdvisoryDescription: (description: string, maxChars?: number) => string;
//# sourceMappingURL=capability-fingerprint.d.ts.map