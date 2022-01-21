import {toMixpanelPeople} from './identify_mapping'
import {DestTraits} from '@datatoggle/destination-interface'

test('toMixpanelPeople', () => {

  const avatar = 'avatar'
  const email = 'email'
  const phone = 'phone'
  const firstName = 'firstName'
  const lastName = 'lastname'
  const name = 'name'
  const createdAt = new Date(2021, 2, 28, 2, 10, 50, 20)
  const newCustomProperties = 15.15

  const traits: DestTraits = {
    avatar: avatar,
    email: email,
    phone: phone,
    firstName: firstName,
    lastName: lastName,
    name: name,
    createdAt: createdAt,
    newCustomProperties: newCustomProperties,
  }

  const mixpanelPeople = toMixpanelPeople(traits)

  expect(mixpanelPeople.$avatar).toBe(avatar)
  expect(mixpanelPeople.$email).toBe(email)
  expect(mixpanelPeople.$phone).toBe(phone)
  expect(mixpanelPeople.$first_name).toBe(firstName)
  expect(mixpanelPeople.$last_name).toBe(lastName)
  expect(mixpanelPeople.$name).toBe(name)
  expect(mixpanelPeople.$created).toBe(createdAt)
  expect(mixpanelPeople.newCustomProperties).toBe(newCustomProperties)

  expect(mixpanelPeople.avatar).toBe(undefined)
  expect(mixpanelPeople.email).toBe(undefined)
  expect(mixpanelPeople.firstName).toBe(undefined)
  expect(mixpanelPeople.lastName).toBe(undefined)
  expect(mixpanelPeople.name).toBe(undefined)
  expect(mixpanelPeople.createdAt).toBe(undefined)
});
