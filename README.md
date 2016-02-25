### gogo-garage-opener

gogo-garage-opener-ui is the UI implementation of [gogo-garage-opener](https://github.com/benjefferies/gogo-garage-opener])


### Todo
##### Document build process
##### Some testing!
##### Background service
It would be ideal as a user to be able to configure certain times you
would normally return home. If you are within 1 minute (drive time) of
your garage location and you are between the configured time the garage
door should open.

The service implementation already has a rest API which supports this (WIP).
The REST api is ${url}:${port}/geo/{latitude}/{longitude}/arrival/{arrival}.
{latitude} and {longitude} is the location of the person
{arrival} is the time in seconds you want to be within then the garage will open
The API implementation uses the latitude and longitude to find out the travel time
to the configured garage location using [Google Maps API](https://developers.google.com/maps/).
