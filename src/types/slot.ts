import { GetSlotDataFunctions, SetSlotDataFunctions, SlotConfirmationFunctions } from './function';
import { MessageData, ValidateResult } from './state';
import { Promiseable } from './generic';

/**
 * Wolf primitive representing data points that should be collected. Any piece of information
 * in a conversation that is of interest/required to aid in the conversation flow or user
 * experience.
 * 
 * See `example/` directory for ability examples for how to use.
 */
export interface Slot<G, S = any> {
  name: string,
  defaultIsEnabled?: boolean,
  query: (convoStorageLayer: G, getSlotDataFunctions: GetSlotDataFunctions) => Promiseable<string>,
  validate?: (submittedValue: S, convoStorageLayer: G, messageData: MessageData) => Promiseable<ValidateResult>,
  retry?: (submittedValue: S, convoStorageLayer: G, turnCount: number) => Promiseable<string>,
  onFill?: (
    submittedValue: S,
    convoStorageLayer: G,
    setOtherSlotFunctions: SetSlotDataFunctions,
    confirmationFunctions: SlotConfirmationFunctions
  ) => Promiseable<string | void>
}

export interface ShouldRunCompleteResult {
  shouldComplete: boolean,
  reason?: string,
  nextAbility?: string
}

export interface IncomingSlotData {
  slotName: string,
  abilityName: string,
  value: string
}

export interface SlotRecord<S = any> {
  value: S,
  abilityName: string | null,
  slotName: string
}
