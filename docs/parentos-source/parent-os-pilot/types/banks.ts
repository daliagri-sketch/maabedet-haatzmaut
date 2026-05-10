export type {
  GoldScenario,
  GoldRoutineBody,
  ResistanceHoldEntry,
  AnchorEntry,
} from "../contracts/composition_contract_v2";

export type GoldScenariosBank = Record<string, import("../contracts/composition_contract_v2").GoldScenario>;
export type ResistanceHoldBank = Record<string, import("../contracts/composition_contract_v2").ResistanceHoldEntry>;
export type AnchorBank = Record<string, import("../contracts/composition_contract_v2").AnchorEntry>;
