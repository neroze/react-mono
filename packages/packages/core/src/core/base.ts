// import QS from 'query-string'
// import React from 'react'
// import isFunction from 'lodash-es/isFunction'
import bind from 'lodash-es/bind'
import set from 'lodash-es/set'
import get from 'lodash-es/get'
import each from 'lodash-es/each'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import RouteMaker from "./templates/routes";
// import defaults from "lodash/defaults";
import last from 'lodash-es/last'

export const init = () => {
  // App.setNamespaceBySubDomain();
  return Promise.all([Promise.resolve({})]).then(async ([theme, i18n]) => {
    return {}
  })
}

/**
 * Base App
 *
 * @module App
 * @namespace App
 *
 * Order of events on startup:
 * ---------------------------
 *
 * App: before:start
 * App: start (implementation)
 * App: start (base app)
 *
 */
let App = {
  modules: [],
  beforeLogin: () => {
    console.log('--- before login ----')
  },
  processes: {
    // you should override this if you want, in your implementing app
    preAuth: async () => {
      // App.log("load_event", { message: "App.processes.preAuth" }, 3);

      try {
        // const result = await init();
        App?.processes?.beforeLogin && App.processes.beforeLogin()
      } catch (error) {
        return error
      }
    },

    postAuth: function (depn = [new Promise((resolve) => resolve({ name: 'niraj' }))]) {
      return Promise.all([depn])
    },

    afterSetup: () => Promise.resolve(),

    /**
     * When the user log's in
     *
     * Note, this is before the app modules load
     */
    afterLoginInternal: (depn = [new Promise((resolve) => resolve({ name: 'niraj' }))], data) => {
      App.processes.afterLogin && App.processes.afterLogin()
    },

    beforeStart: (depn = [new Promise((resolve) => resolve({ name: 'niraj' }))]) => {
      return Promise.all([depn])
    },

    start: () => {},

    // this should be updated by the implementing app:
    afterStart: () => console.warn('Error: calling default after start'),

    beforeLogout: () => Promise.resolve(),

    postLogout: function () {
    //   App.log('load_event', { message: 'App.processes.postLogout' }, 3)
      App.processes.beforeLogout && App.processes.beforeLogout()

    
      App?.processes?.afterLogout && App.processes.afterLogout()
    },

    afterLogout: () => Promise.resolve(),
    beforeLogin: () => Promise.resolve(),
    afterLogin: () => Promise.resolve()
  },

  actions: {},

  /**
   * This is run after start
   *
   */
  setup(options = {}) {
    App.processes.afterSetup()
  },
  /**
   * App.Start
   *
   * @param {object} options - generic options
   * @param {object} processes -
   */
  async start(options = {}, app:any, routes:any[] = []) {
    const config = await App.processes.beforeStart()
    console.log('config', config)
    this.setup(options)
    let allRoutes:any[] = []
    console.log('------->>', routes)
    Promise.all(routes).then((appRoutes) => {
      console.log('appRoutes ++++', appRoutes)
      appRoutes.forEach((moduleRoute:any) => {
        console.log('module Routes :::', moduleRoute.default)
        allRoutes = allRoutes.concat(moduleRoute.default)
        console.log('--- routes', allRoutes)
      })
    //   App.Menus = []
      console.log('App.routes all ==>', allRoutes)
      const baseComponent = RouteMaker(allRoutes)
      app && app({ config, baseComponent })

      return App.processes.start()
    })
  }
}

export default App
