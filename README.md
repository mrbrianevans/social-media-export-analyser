# Social media export analyser
Analyse GDPR data portability exports of your data from big social media companies

Website URL: https://social-media-export-analyser-mrybc.ondigitalocean.app/

# Directories
## `lib`
The `lib` directory contains javascript that can be run in the browser or on a server. 

This is the preferred location for code that doesn't require 
browser or node specific APIs.

This directory contains the logic that transforms data from its file contents to a data structure that can be displayed 
by a component. It is split into two parts: preprocessing and postprocessing. Preprocessing parses the text contents
of a file into a javascript object. Postprocessing transforms that object and/or discovers metadata about it.

## `lib-testing`
Unit testing for the `lib` logic is in this directory, to be run in a node environment. 
Tests can be run with the `npm test` command, and are run on every git commit by a CI system.

Current status: 
[![Build Status](https://app.travis-ci.com/mrbrianevans/social-media-export-analyser.svg?branch=master)](https://app.travis-ci.com/mrbrianevans/social-media-export-analyser)

## `client`
This is the frontend website, written in [Svelte](https://svelte.dev/). 
It runs completely in the browser, not sending any data to a server.

Run `npm run start` in this directory to run the website locally.

## `demo-files`
This directory contains some example files that can be used to demonstrate the app without using real personal data.
The contents of this directory is generated from a script located at `lib-testing/generateDemoFiles.ts` and can be run
in that directory with `npm run generate`.

# Typescript
Wherever possible, Typescript is preferred in this project due to the better IDE support.

# Contributing
This project is being done as a final year Computer Science dissertation, and therefore contributions cannot be accepted
until the project is assessed. Thereafter, contributions will be most welcome.

# Licensing
This project does not have a license.