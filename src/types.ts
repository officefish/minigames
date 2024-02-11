export interface IItem {
    index?: number
    pair: number
}

export interface IGame {
    username: string
}

export const LampMode = {
  wait: "WAIT",
  on: "ON",
  success: "SUCCESS",
  error: "ERROR"
} as const