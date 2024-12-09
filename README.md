# entain-vue3-pinia

## Overview

This is my technical task implementation as per [Charles's page here](https://confluence.production.corporate.ladbrokes.cloud/pages/viewpage.action?spaceKey=~charles.hilditch&title=Entain+Technical+Test+-+Frontend).

Since I had more time as an exercise I went through this while learning Vue, so it morphed through different stages to finally end up where it is at today:

- Initially I created it in Vue 2 (options API) with data stored locally in the App component.
- Vuex was added and app refactored to store business logic there
- App migrated to Vue 3 (composition API) and refactored
- App migrated from Vuex to Pinia

These steps gave me a very good understanding of the different Vue technologies used in Entain's front end.

Then I added some CSS and more business logic, such as 
- automatically load races from the API when needed to ensure the list never gets stale
- disable filter buttons automatically for the categories that we have no races loaded for

I added unit tests for components and for the store as well.

Also migrated from vue-cli (which I used originally to create this project) to using vite. Lots of eslint gotchas doing it this way, much better to use vite from the beginning.

Finally converted the project to Typescript.

Also note it will remove a race beyond its advertised time after 10 seconds, not 60 as per task description, to make it easier to test.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
