import {Properties, Traits} from './api_data'
import {DatatoggleDestination} from '../../interface'

interface WaitingEvent {
  send(destination: DatatoggleDestination): void
}

class IdentifyEvent implements WaitingEvent {
  userId: string
  traits: Traits

  constructor(userId: string, traits: Traits) {
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
  properties: Properties

  constructor(name: string, category: string | null, properties: Properties) {
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
  properties: Properties

  constructor(event: string, properties: Properties) {
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

  identify(userId: string, traits: Traits): void {
    this.waitingEvents.push(new IdentifyEvent(userId, traits))
  }

  page(name: string, category: string | null, properties: Properties): void {
    this.waitingEvents.push(new PageEvent(name, category, properties))
  }

  track(event: string, properties: Properties): void {
    this.waitingEvents.push(new TrackEvent(event, properties))
  }

  flushEvents(destination: DatatoggleDestination) {
    this.waitingEvents.forEach((e: WaitingEvent) => {
      e.send(destination)
    })
  }

}
