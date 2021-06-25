export type DestinationConfig = {
  scriptUrl: string
  scriptName: string
  name: string
  destinationSpecificConfig: any
}
export type GlobalConfig = {
  lastModification: string
  destinations: DestinationConfig[]
}
export type ConfigReply = {
  modified: boolean
  config: GlobalConfig | null
}
