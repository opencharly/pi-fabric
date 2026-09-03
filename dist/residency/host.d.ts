#!/usr/bin/env node
import { ActorManager } from "../actors/manager.js";
import { AgentManager } from "../agents/manager.js";
import { LifecycleBroker } from "../lifecycle/broker.js";
import { MeshStore, type MeshIdentity } from "../mesh/store.js";
import { FabricControlPlane } from "../topology/control-plane.js";
import { ParticipantDirectory } from "../topology/participant-directory.js";
import { type ResidentHostConfig } from "./protocol.js";
export declare class ResidentHost {
    #private;
    readonly config: ResidentHostConfig;
    readonly onIdle: () => void;
    readonly hostId: string;
    readonly identity: MeshIdentity;
    readonly mesh: MeshStore;
    readonly participants: ParticipantDirectory;
    readonly control: FabricControlPlane;
    readonly agents: AgentManager;
    readonly actors: ActorManager;
    readonly lifecycle: LifecycleBroker;
    constructor(config: ResidentHostConfig, onIdle?: () => void);
    start(): Promise<void>;
    close(): Promise<void>;
}
export declare const runResidentHost: (config: ResidentHostConfig, signal?: AbortSignal) => Promise<void>;
//# sourceMappingURL=host.d.ts.map