import {DestProperties, DatatoggleDestination, DestTraits} from '@datatoggle/destination-interface'

interface WaitingEvent {
  send(destination: DatatoggleDestination): void
}

class IdentifyEvent implements WaitingEvent {
  userId: string
  traits: DestTraits

  constructor(userId: string, traits: DestTraits) {
    this.userId = userId
    this.traits = traits
  }

  send(destination: DatatoggleDestination): void {
    destination.identify(this.userId, this.traits)
  }
}

class PageEvent implements WaitingEvent {
  name: string
  category: string | null
  properties: DestProperties

  constructor(name: string, category: string | null, properties: DestProperties) {
    this.category = category
    this.name = name
    this.properties = properties
  }

  send(destination: DatatoggleDestination): void {
    destination.page(this.name, this.category, this.properties)
  }
}

class TrackEvent implements WaitingEvent {
  event: string
  properties: DestProperties

  constructor(event: string, properties: DestProperties) {
    this.event = event
    this.properties = properties
  }

  send(destination: DatatoggleDestination): void {
    destination.track(this.event, this.properties)
  }

}

export class WaitingDestination implements DatatoggleDestination {

  waitingEvents: WaitingEvent[] = []

  init(config: object): Promise<void> {
    return Promise.resolve()
  }

  identify(userId: string, traits: DestTraits): void {
    this.waitingEvents.push(new IdentifyEvent(userId, traits))
  }

  page(name: string, category: string | null, properties: DestProperties): void {
    this.waitingEvents.push(new PageEvent(name, category, properties))
  }

  track(event: string, properties: DestProperties): void {
    this.waitingEvents.push(new TrackEvent(event, properties))
  }

  flushEvents(destination: DatatoggleDestination) {
    this.waitingEvents.forEach((e: WaitingEvent) => {
      e.send(destination)
    })
  }

}
