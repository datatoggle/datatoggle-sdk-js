import {DatatoggleDestination} from '@datatoggle/destination-interface'
import {buildDestination} from './index'

test('Datatoggle__Destination__.identify', () => {
  const datatoggleDestination:DatatoggleDestination = buildDestination()
  datatoggleDestination.identify("userId", {})
  // @ts-ignore
  const userId: string = datatoggleDestination['userId']
  expect(userId).toBe("userId")
});
