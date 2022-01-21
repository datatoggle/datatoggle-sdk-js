import {DestTraits} from '@datatoggle/destination-interface'


export function toMixpanelPeople(traits: DestTraits): MixpanelIdentifyTraits {

  let mixpanelTraits: MixpanelIdentifyTraits = Object.assign({}, traits)

  mixpanelTraits.$avatar = traits.avatar
  mixpanelTraits.$email = traits.email
  mixpanelTraits.$phone = traits.phone
  mixpanelTraits.$first_name = traits.firstName
  mixpanelTraits.$last_name = traits.lastName
  mixpanelTraits.$name = traits.name
  mixpanelTraits.$created = traits.createdAt

  delete mixpanelTraits.avatar
  delete mixpanelTraits.email
  delete mixpanelTraits.phone
  delete mixpanelTraits.firstName
  delete mixpanelTraits.lastName
  delete mixpanelTraits.name
  delete mixpanelTraits.createdAt

  return  mixpanelTraits
}

//https://github.com/segmentio/analytics.js-integrations/blob/master/integrations/mixpanel/lib/index.js
// https://help.mixpanel.com/hc/en-us/articles/115004708186-Profile-Properties
export class MixpanelIdentifyTraits {
  $avatar?: string
  $email?: string
  $phone?: string
  $first_name?: string
  $last_name?: string
  $name?: string
  $created?: Date
  [key: string]: unknown
}

/*
    Avatar ($avatar) - Set this property to a url resource of a gif, jpg, jpeg, or png to update the profile picture in a profile. This property will override a profile picture pulled from Gravatar.
    Email ($email) - The user's email address. You must set this property if you want to send users email from Mixpanel.
    Phone ($phone) - The user's phone number. You must set this property if you want to send users SMS from Mixpanel. Note that a '+' needs to precede phone numbers. This is especially useful for international numbers. If the user does not import a phone number with the '+' sign in front of the number, the country code will be prefixed to the front of the number based on the $country_code property, resulting in a phone number with two country codes.
    $distinct_id - The user's distinct_id. This property value should be identical to the distinct_id property attached to events so that you can connect events to user profiles.
    $ios_devices - List of user's Apple Push Notification service device tokens for iOS push. Our iOS client library has methods to manage this property for you.
    $android_devices - List of user's Google Cloud Messaging registration IDs for Android push. Our Android client library has methods to manage this property for you.
    $first_name, $last_name, $name - User's first and last names, as well as a general name. These are primarily useful because we will use them, if available, in a few spots in our reports.
    $transactions - A list with specially formatted JSON objects, one for each purchase or transaction associated with a specific profile. For more information about $transactions, see Tracking revenue in Mixpanel HTTP Tracking API.
    Created ($created) - The time that the profile was created.
    City ($city) - The city of the event sender, parsed from IP.
    Region ($region) - The region (state or province) of the event sender, parsed from IP.
    Country ($country_code) - The country of the event sender, parsed from IP.
    Timezone - ($timezone) - The timezone of the event sender, parsed from IP. If set, messages can be scheduled to be sent based on a user's timezone.
    Unsubscribed - ($unsubscribed) - If this property is set to any value, a user will be unsubscribed from Mixpanel email messages.
    Bucket ($bucket and bucket) - A reserved property that is hidden from the Mixpanel interface, and will cause other events to not appear in the interface. Do not name any property bucket or $bucket.
 */
