# Social media export analyser
Analyse GDPR data portability exports of your data from big social media companies

# `lib`
The `lib` directory contains javascript that can be run in the browser or on a server. 

This is the preferred location for code that doesn't require 
browser or node specific APIs.

This directory contains the logic that transforms data from its file contents to a data structure that can be displayed 
by a component. Unit testing for this logic is in the `lib-testing` directory, to be run in a node environment.

Current status: 
[![Build Status](https://app.travis-ci.com/mrbrianevans/social-media-export-analyser.svg?branch=master)](https://app.travis-ci.com/mrbrianevans/social-media-export-analyser)

# `client`
This is the frontend website, written in [Svelte](https://svelte.dev/). 
It runs completely in the browser, not sending any data to a server.

Run `npm run start` in this directory to run the website locally.

# Typescript
Wherever possible, Typescript is preferred in this project due to the better IDE support.

# Contributing
This project is being done as a final year Computer Science dissertation, and therefore contributions cannot be accepted
until the project is assessed. Thereafter, contributions will be most welcome.

# Licensing
This project does not have a license.