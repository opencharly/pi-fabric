import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { FabricActivityStore } from "./activity/store.js";
import { CapturedToolCatalog, type CapturedToolEntry } from "./capture/catalog.js";
import type { FabricOwnedModelGuidance } from "./components/model-guidance.js";
import type { FabricComponentGraph } from "./components/types.js";
import { type FabricConfig, type FabricResultFormat } from "./config.js";
import { FabricSessionApprovals } from "./core/approval-controller.js";
import { PrewalkController } from "./prewalk/controller.js";
import { PrewalkDriftTracker } from "./prewalk/fs-drift.js";
import type { PendingFabricHandoff } from "./prewalk/handoff.js";
import type { AgentToolResultMessage } from "./agents/types.js";
import type { FabricExecutionResult } from "./execution-service.js";
import { type McpAdvisoryCacheOptions } from "./providers/mcp-advisory.js";
import type { McpProviderHooks } from "./providers/mcp-provider.js";
import type { FabricParticipantInfo, FabricParticipantListOptions, FabricPeerInfo } from "./topology/types.js";
import { type FabricAgentMessageDelivery, type FabricAgentMessageResult, type FabricMainAgentInfo } from "./main-agent.js";
import type { FabricActorHostEvent } from "./actors/types.js";
import type { FabricLifecycleEventType } from "./lifecycle/types.js";
import type { FabricActionDescriptor, FabricComponentDefinition, FabricProvider } from "./protocol.js";
import type { FabricRuntimeState } from "./fabric-runtime-state.js";
import type { FabricRuntimePaths } from "./runtime-paths.js";
export interface FabricStateOptions {
    paths?: FabricRuntimePaths;
    runtimeLoader?: () => Promise<typeof import("./fabric-runtime-state.js")>;
    mcpAdvisoryLoader?: (options: McpAdvisoryCacheOptions) => Promise<FabricActionDescriptor[]>;
}
type ActivationHook = (context: ExtensionContext) => void | Promise<void>;
type ActivationFailureHook = () => void | Promise<void>;
export declare class FabricState {
    #private;
    readonly pi: ExtensionAPI;
    readonly capturedTools: CapturedToolCatalog;
    readonly activity: FabricActivityStore;
    readonly prewalk: PrewalkController;
    readonly prewalkDrift: PrewalkDriftTracker;
    readonly sessionApprovals: FabricSessionApprovals;
    constructor(pi: ExtensionAPI, capturedTools: CapturedToolCatalog, onCapturedToolUse?: (entry: CapturedToolEntry) => void, mcpHooks?: McpProviderHooks, options?: FabricStateOptions);
    get initialized(): boolean;
    get bootstrapped(): boolean;
    get activated(): boolean;
    get config(): FabricConfig;
    get cwd(): string | undefined;
    get widgetDismissedAt(): number;
    set widgetDismissedAt(value: number);
    get registry(): FabricRuntimeState["registry"];
    get execution(): FabricRuntimeState["execution"];
    /** Speculative-PTC stream tap; undefined pre-init or when speculation is disabled. */
    get speculationTap(): FabricRuntimeState["speculationTap"];
    /** Turn-boundary backstop for the speculation store; safe before initialization. */
    resetSpeculation(): void;
    get agents(): FabricRuntimeState["agents"];
    get actors(): FabricRuntimeState["actors"];
    get globalActors(): FabricRuntimeState["globalActors"];
    get mesh(): FabricRuntimeState["mesh"];
    get compact(): FabricRuntimeState["compact"];
    get components(): FabricRuntimeState["components"];
    setActivationHook(hook: ActivationHook, onFailure?: ActivationFailureHook): void;
    bootstrap(context: ExtensionContext): Promise<void>;
    initialize(context: ExtensionContext): Promise<void>;
    ensure(context: ExtensionContext): Promise<void>;
    shouldEagerlyActivate(context: ExtensionContext): boolean;
    mcpSlice(): FabricActionDescriptor[];
    mainAgentInfo(context?: ExtensionContext): FabricMainAgentInfo;
    peerInfos(): FabricPeerInfo[];
    componentGraph(): FabricComponentGraph;
    modelGuidance(): FabricOwnedModelGuidance[];
    participantInfos(options?: FabricParticipantListOptions): FabricParticipantInfo[];
    queueUserMessage(targetId: string, message: string, delivery: FabricAgentMessageDelivery): Promise<FabricAgentMessageResult>;
    stopParticipant(targetId: string): Promise<unknown>;
    claimHandoff(execution: FabricExecutionResult, sessionId: string, resultFormat: FabricResultFormat, outerToolCallId: string): Promise<PendingFabricHandoff | undefined>;
    runHandoffAtBoundary(pending: PendingFabricHandoff, result: AgentToolResultMessage, context: ExtensionContext): Promise<Record<string, unknown>>;
    noteMainActivity(context: ExtensionContext): void;
    dispatchHostEvent(event: FabricActorHostEvent, payload: unknown, context: ExtensionContext): number;
    publishHostLifecycle(event: FabricLifecycleEventType, payload: unknown): Promise<void>;
    registerExternal(provider: FabricProvider, options?: {
        overwrite?: boolean;
    }): void;
    registerExternalComponent(component: FabricComponentDefinition, options?: {
        overwrite?: boolean;
    }): void;
    reloadConfig(context: ExtensionContext): void;
    shutdown(): Promise<void>;
}
export {};
//# sourceMappingURL=fabric-state.d.ts.map