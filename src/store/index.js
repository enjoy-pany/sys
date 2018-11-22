import Vue from 'vue';
import Vuex from 'vuex';
import menus from './menu';
import task from './task';

Vue.use(Vuex);

const state = {}
const mutations = {}
const actions = {}
const getters = {}

const modules = {
    menus,
    task
};

export default new Vuex.Store({
    strict: true,
    actions,
    getters,
    modules,
    state,
    mutations
});