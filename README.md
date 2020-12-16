# Classy API donation tracker
This Node.js application polls the Classy API and injects the total donation amount
for a given Classy fundraising page into a tiny HTML 5 document, suitable to be used as
a browser source in OBS. With this you can have an auto-updating widget with your donation total.

This is a quick and dirty script with no tests or error-handling, hopefully I
will come back to that later.
## Setup
You must have Node and npm installed. [Download Node here](https://nodejs.org/).

You will also need to have your API credentials for [Classy](https://www.classy.org/), and
the ID of the fundraising page you want to track. Your fundraiser ID is in the URL of the
fundraising page you want to track.

Clone this repo and run `npm install` to install dependencies.

### Set environment variables
To avoid storing secrets in the repository, this script pulls your Classy API
credentials from environment variables on your system. In a terminal window set the 
following, subbing in your correct credentials.
#### Linux/Mac
```$bash
export CLASSY_CLIENT_ID=<client id>
export CLASSY_CLIENT_SECRET=<client secret>
export CLASSY_FUNDRAISER_ID=<fundraiser id>
```
#### Windows
```$bash
SET CLASSY_CLIENT_ID=<client id>
SET CLASSY_CLIENT_SECRET=<client secret>
SET CLASSY_FUNDRAISER_ID=<fundraiser id>
```
### Creating an OBS widget
1. In OBS, create a new source. Select the _Browser Source_ type.
1. Check the _Local file_ checkbox, and enter or browse for the file location of `total.html`.
1. Set the width and height as appropriate. I use 250x55.
1. Enter any custom CSS as desired.
## Start syncing
In the project directory, run `node .` to start the syncing script. In 30 seconds or so the file
should be updated to your current donation total. From then on the script will poll endlessly every
11 seconds until you press Ctrl-C to quit. 
