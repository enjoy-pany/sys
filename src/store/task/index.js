const state = {
	markConfig: [
        //模板标注配置
        {
            label: '录音人',
            type: '1',
            dynamicTags: ['主播','观众'],
            inputVisible: false,
            inputValue: ''
        }
    ]
};
const getters = {};
const mutations = {
	setMarkConfig(state, list) {
	    if (list.length > 0) {
	        state.markConfig = list;
	        return;
	    }
	    state.markConfig = [
	        //模板标注配置
	        {
	            label: '',
	            type: '1',
	            dynamicTags: [],
	            inputVisible: false,
	            inputValue: ''
	        }
	    ];
	},
};
const actions = {};
const modules = {};
export default {
    namespaced: true,
    actions,
    modules,
    state,
    mutations
};