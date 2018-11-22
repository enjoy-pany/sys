<template>
    <div class="muti-audio">
        <div class="title">
            <!-- <div class="reBtn" @click="backList"></div> -->
            <div class="text">{{taskInfo.name}}</div>
        </div>
        <div class="message">
            <div class="tatol">
                <span>总时长:</span>
                <em>{{totalTime || 0}}s</em>
            </div>
            <div class="tatol">
                <span>有效时长:</span>
                <em>{{validTime}}s</em>
            </div>
            <div class="tatol">
                <span>无效时长:</span>
                <em>{{inValidTime}}s</em>
            </div>
            <div class="tatol">
                <span>标注段数:</span>
                <em class="ds">{{validNumber}}</em>
            </div>
            <div class="tatol">
                <span>状态:</span>
                <em class="sta">{{taskInfo.status}}</em>
            </div>
        </div>
        <div class="audioTool">
            <SvgBox
                    :checkedId="checkedId"
                    :deleteBox="deleteBox"
                    :resetAllRect="rectData"
                    :resetAllRectArr="rectDataArr"
                    :noPain="cantPain"
                    :noSacle="false"
                    :noClick="cantPoint"
                    :url="taskInfo.url"
                    :play="play"
                    @reset_val="resetVal"
                    @onPlayEnd='playEndFn'
                    @drawOver="drawOverFn"
            ></SvgBox>
        </div>
        <div class="audioBar">
            <div class="audioLeft">
                <div :class="play?'audioPause':'audioPlay'">
                    <span @click="lineRunFn" :class="{disabled: clickLock}"></span>
                </div>
                <div class="audioClear">
                    <span @click="deleRect" :class="{disabled: clickLock}"></span>
                </div>
                <!-- <div class="audioSave">
                    <span></span>
                </div> -->
            </div>
            <!-- <div class="audioRight">
                <div class="audioSub" :class="{disabled: clickLock}" @click="taskSubmit(1)">提交</div>
                <div class="audioNext" :class="{disabled: clickLock}" @click="taskSubmit(3)">跳过</div>
                <div class="audioInvalid" :class="{disabled: clickLock}" @click="taskSubmit(2)">无效</div>
            </div> -->
        </div>
        <div class="audioForm">
            <div class="formTitle">标注内容</div>
            <el-form id="form" :disabled='!checkedId'>
                <el-form-item v-for="(item, index) in markConfig" :key="index" :label="item.label + ':'">
                    <el-radio-group v-if="item.type == 1" v-model="form[index]">
                        <el-radio v-for="(tItem, index) in item.dynamicTags" :key="index" :label="tItem"></el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-if="item.type == 2" v-model="form[index]">
                        <el-checkbox v-for="(tItem, index) in item.dynamicTags" :key="index"
                                     :label="tItem"></el-checkbox>
                    </el-checkbox-group>
                    <el-col :span='10' v-if="item.type == 3" class="pad">
                        <el-input
                                type="text"
                                width='180'
                                v-model="form[index]">
                        </el-input>
                    </el-col>
                    <el-col :span='10' v-if="item.type == 4" class="pad">
                        <el-input
                                type="text"
                                width='180'
                                v-click:form="{list:item.dynamicTags, index:index, disabled:!checkedId}"
                                v-model="form[index]">
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <div class="audioGroup">
            <div class="btn-group">
                <span
                    v-for='(item,index) in allRectArr'
                    :key="index"
                    @click="btnCheckedRect(item.id)"
                    :class="{'btn-box':true, 'checked-btn-box':checkedId==item.id, 'active':rectActiveObj[item.id]&& rectActiveObj[item.id].active}">{{(index+1) >=10?(index+1):("0"+(index+1)) }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @audio-background: #272727;
    @system-background: #161616;
    @button-background: #F94D26;
    @button-hover-background: #F95726;
    @imgUrl: '../../assets/images';
    .muti-audio {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: @system-background;
        padding-bottom: 30px;
        position: absolute;
        left: 0;
        top: 80px;
        border-top: 4px #161616 solid;
        .title {
            width: 100%;
            height: 50px;
            background-color: @audio-background;
            margin-bottom: 4px;
            padding-left: 30px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .text {
                width: auto;
                height: 40px;
                // background-color: @system-background;
                // border: 1px #666 solid;
                color: #fff;
                border-radius: 2px;
                font-size: 20px;
                text-align: center;
                line-height: 40px;
            }
            .reBtn {
                width: 72px;
                height: 22px;
                background: url("@{imgUrl}/back.png");
                position: absolute;
                left: 30px;
                cursor: pointer;
            }
        }
        .message {
            width: 100%;
            height: 50px;
            background-color: @audio-background;
            color: #fff;
            padding: 10px 30px;
            box-sizing: border-box;
            display: flex;
            .tatol {
                width: 200px;
                height: 30px;
                display: flex;
                font-size: 16px;
                span {
                    line-height: 28px;
                }
                .ds {
                    width: 50px;
                }
                .sta {
                    color: @button-background;
                }
                em {
                    display: block;
                    box-sizing: border-box;
                    width: 110px;
                    height: 28px;
                    line-height: 28px;
                    // border: 1px #333 solid;
                    // background-color: #1d1d1d;
                    font-style: normal;
                    padding-left: 5px;
                    margin-left: 5px;
                }
            }
        }
        .audioBar {
            width: 100%;
            height: 60px;
            background-color: @audio-background;
            margin-bottom: 5px;
            padding: 10px 30px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .audioLeft {
                display: flex;
                .audioPlay {
                    width: 150px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    span {
                        display: block;
                        width: 120px;
                        height: 50px;
                        background: url('@{imgUrl}/yy_bf.png') no-repeat center;
                        &:hover {
                            background: url('@{imgUrl}/yy_bf_h.png') no-repeat center;
                        }
                    }
                    p {
                        color: #fff;
                        font-size: 18px;
                        margin-left: 5px;
                    }
                    .disabled {
                        opacity: .5;
                        cursor: not-allowed;
                    }
                }
                .audioPause {
                    .audioPlay;
                    span {
                        background: url('@{imgUrl}/yy_zt.png') no-repeat center;
                        &:hover {
                            background: url('@{imgUrl}/yy_zt_h.png') no-repeat center;
                        }
                    }
                }
                .audioClear {
                    .audioPlay;
                    span {
                        background: url('@{imgUrl}/yy_qcxz.png') no-repeat center;
                        &:hover {
                            background: url('@{imgUrl}/yy_qcxz_h.png') no-repeat center;
                        }
                    }
                }
                .audioSave {
                    .audioPlay;
                    span {
                        background: url('@{imgUrl}/yy_bc.png') no-repeat center;
                        &:hover {
                            background: url('@{imgUrl}/yy_bc_h.png') no-repeat center;
                        }
                    }
                }
            }
            .audioRight {
                display: flex;
                .audioSub {
                    width: 100px;
                    height: 40px;
                    background-color: @button-background;
                    border: 1px @button-background solid;
                    color: #fff;
                    font-size: 18px;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 4px;
                    margin-left: 30px;
                    cursor: pointer;
                    &:hover {
                        background-color: @button-hover-background;
                    }
                }
                .audioNext {
                    .audioSub;
                    background-color: #272727;
                    border: 1px @button-background solid;
                    color: @button-background;
                    &:hover {
                        background-color: @button-background;
                        color: #fff;
                    }
                }
                .audioInvalid {
                    .audioSub;
                    background-color: #272727;
                    border: 1px #fff solid;
                    color: #fff;
                    &:hover {
                        background-color: #fff;
                        color: #333;
                    }
                }
                .disabled {
                    opacity: .5;
                    cursor: not-allowed;
                }
            }
        }
        .audioForm {
            width: 100%;
            height: auto;
            background-color: @audio-background;
            margin-bottom: 5px;
            padding: 20px 30px;
            box-sizing: border-box;
            .formTitle {
                width: 100%;
                height: 40px;
                background-color: @system-background;
                margin-bottom: 3px;
                color: #fff;
                line-height: 40px;
                font-size: 20px;
                text-indent: 1em;
            }
            #form {
                padding: 15px 12px;
                box-sizing: border-box;
                background-color: @system-background;
            }
        }
        .btn-group {
            width: 100%;
            height: 100px;
            padding: 20px 30px;
            box-sizing: border-box;
            background-color: @audio-background;
            .btn-box {
                width: 80px;
                height: 50px;
                line-height: 50px;
                display: block;
                float: left;
                margin-right: 10px;
                border: 1px solid #979797;
                border-radius: 4px;
                font-size: 20px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                &:hover {
                    background: #fff;
                    color: #333;
                    border: 1px #fff solid;
                }
            }
            .active {
                border: 1px solid #AC8E68;
                color: #AC8E68;
            }
            .checked-btn-box {
                color: #333333;
                background: #fff;
                border: 1px #fff solid;
            }
        }
    }
</style>
<style lang="less">
    @button-background: #F94D26;
    #form {
        .el-form-item {
            margin-bottom: 0;
            .el-form-item__label {
                font-size: 16px;
                color: #fff;
            }
            .el-radio__label {
                font-size: 16px;
                color: #fff;
            }
            .el-textarea {
                width: 500px;
                margin-left: 12px;
            }
            textarea {
                background: #1d1d1d;
                border-color: #333;
                font-size: 16px;
                color: #fff;
            }
            input {
                background: #1d1d1d;
                border-color: #333;
                font-size: 16px;
                color: #fff;
            }
            .el-radio__input.is-checked .el-radio__inner {
                border-color: @button-background;
                background: @button-background;
            }
            .el-checkbox {
                color: #c0c4cc;
            }
        }
        .pad {
            padding: 5px 0;
            box-sizing: border-box;
        }
    }

    .custom-input-drop {
        background: #FFFFFF;
        box-shadow: 0 0 10px 0 rgba(204, 204, 204, 0.50);
        border-radius: 4px;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 9;
        height: 200px;
        overflow: auto;
        & li {
            padding: 10px;
            color: #151515;
        }
    }
</style>


<script>
import SvgBox from '@/template/audioTool/index.vue'
import { mapState, mapMutations, mapActions } from 'vuex';
// const audioUrl = require('@/assets/audio/2.acc')

export default {
    data () {
        return {
            markId: null,//当前标注语音任务id
            dataId: null,
            allRect:{},//组件里传出的用于绘图数据
            allRectArr:[],//组件里传出的用于绘图数据
            rectData: {},//需要传入组件内重绘的用于绘图数据 
            rectDataArr: [],//需要传入组件内重绘的用于绘图数据 
            rectFormData: {},//存储每个画框的表单数据
            rectActiveObj: {},//画框表单数据为空状态
            totalTime: '',//组件里传出的当前音频总时长
            play:false,//播放状态
            deleteBox:false,//删除状态
            checkedId:"",//当前选中的rectId
            cantPain: false,
            cantPoint: false,
            //当前音频的详细信息
            taskInfo: {
                name: '',
                url: '',
                status: '有效'
            },
            //标注的数据表单
            form: {},
            //模板标注配置
            //1: 单选 2: 多选 3:输入 4:带符号输入
            // markConfig: [],
            //模板质检配置
            qcConfig: [],
            //接收上一次的标注结果
            initvalResult: {},
            //提交的标注结果
            markResult: {},
            clickLock: false
        }
    },
    watch: {
        checkedId(newVal, oldVal) {
            //step-1: 保存上一次的表单数据
            if (oldVal) {
                //保存表单数据
                this.saveFormData(oldVal)
            }
            //step-2: 清空表单
            //初始化表单
            this.initFormConfig()
            //step-3: 数据回填
            if (newVal) {
                //如果rectFormData中存在rectid 则执行数据回填操作
                if (this.rectFormData[ newVal ]) {
                    //数据回填
                    this.initFrom(newVal)
                } else { //否则为新画框操作，我们要初始一个新框的数据

                    this.addFormItem(newVal, oldVal)
                }

            }
        }
    },
    components: {
        SvgBox
    },
    methods: {
        //**------业务相关方法-------**//
        //获取标注数据
        getMark() {
            this.taskInfo.url = '@/assets/audio/2.acc'
        },
        initSubmitData() {
            let result = {}
            for(let key in this.rectFormData) {
                result[key] = {};
                result[key].skitch = this.rectFormData[key].skitch
            }
            return result;
        },
        //提交结果
        taskSubmit(type) {
            //重置播放状态
            this.play = false
            const init_mark_result = this.initSubmitData()
            this.$set(this.markResult, 'allRect', this.allRect)
            this.$set(this.markResult, 'allRectArr', this.allRectArr)
            this.$set(this.markResult, 'rectFormData', init_mark_result)
            // 提交时校验 跳过无效不需校验
            if (type == 1) {
                // 提交保存一次标注数据
                this.saveFormData(this.checkedId)

                if (this.allRectArr.length <= 0) {
                    this.$message.error('至少要标注一条才可以提交！')
                    return
                }
                for (let key in this.rectActiveObj) {
                    if (this.rectActiveObj[ key ].active) {
                        this.$message.error('表单不完整，检查后重试！')
                        return
                    }
                }
            }

            if (this.clickLock) return
            this.clickLock = true

            const param = {
                taskId: this.taskId,
                markId: this.markId,
                dataId: this.dataId,
                assignType: this.assignType,
                commitStatus: 1,//1:标注提交 2:修改标注结果提交
                commitType: type,
                markResult: JSON.stringify(this.markResult)
            }

            request.post({
                url: mark.taskSubmit,
                param
            }).then(res => {
                this.clickLock = false
                this.$message.success('提交成功！')
                this.initMark()
                this.getMark()
            }, err => {
                this.clickLock = false
            })
        },
        //初始化任务数据
        initMark() {
            this.allRect = {}
            this.allRectArr = []
            this.rectData = {}
            this.rectDataArr = []
            this.taskInfo.url = ''
            this.rectFormData = {}
            this.rectActiveObj = {}
            this.form = {}
            this.markResult = {}
        },
        //初始化表单配置
        initFormConfig() {
            for (let i in this.markConfig) {
                if (this.markConfig[ i ].type == 2) {
                    this.$set(this.form, i, [])
                } else {
                    this.$set(this.form, i, '')
                }
            }
        },
        //初始化表单
        initFrom(id) {
            if (this.rectFormData[ id ]) {
                for (let i in this.rectFormData[ id ].skitch) {
                    this.form[ i ] = this.rectFormData[ id ].skitch[ i ].value
                }
            }
        },
        //新建一个框的表单数据  ====> 画框即生成数据
        addFormItem(newVal, oldVal) {
            this.rectActiveObj[ newVal ] = { active: true };
            this.$set(this.rectFormData, newVal, { skitch: [] })
        },
        //存储rect表单数据
        saveFormData(id) {
            if (this.allRect[ id ]) { //判断rectid是否被删除 如果被删除就不保存
                let flag = false
                for (let i in this.form) {
                    //如果表单填写不完整，不允许保存和画新框
                    if (!this.form[ i ]) {
                        flag = true;
                        this.$message.warning('表单数据不完整')
                    } else if ((this.form[ i ] instanceof Array) && this.form[ i ].length == 0) {
                        flag = true;
                        this.$message.warning('表单数据不完整')
                    }
                    this.rectActiveObj[ id ].active = flag;
                    //重新赋值
                    this.rectFormData[ id ].skitch.splice(i, 1, {
                        label: this.markConfig[ i ].label,
                        value: this.form[ i ]
                    })
                }
            }
        },
        backList() {
            this.play = false
            this.$nextTick(() => {
                this.$router.push({ path: '/mytask/labeltask' })
            })
        },
        //**------工具相关方法-------**//
        resetVal(key, value) {
            this[ key ] = value
        },
        //播放操作
        lineRunFn() {
            if (this.clickLock) return
            this.play = !this.play;
        },
        //清除操作
        deleRect() {
            delete this.rectFormData[ this.checkedId ]
            //删除rectActiveObj
            delete this.rectActiveObj[ this.checkedId ]

            this.deleteBox = true;
        },
        rePainSvg() {

        },
        btnCheckedRect(id) {
            this.checkedId = id
        },
        //监听播放状态
        playEndFn(value) {
            this.play = value
        },
        //语音加载监听
        drawOverFn(value) {
            this.clickLock = !value
        }
    },
    computed: {
        ...mapState({
            markConfig: state => state.task.markConfig
        }),
        //有效时长
        validTime() {
            const total_time = this.totalTime || 0
            let v_time = 0;
            for (let i in this.allRectArr) {
                v_time += (this.allRect[ this.allRectArr[ i ].id ].end_time - this.allRect[ this.allRectArr[ i ].id ].begin_time)
            }
            v_time = v_time > total_time ? total_time : v_time
            return v_time.toFixed(2)
        },
        //无效时长
        inValidTime() {
            const valid_time = this.validTime || 0
            return (this.totalTime - valid_time).toFixed(2)
        },
        //有效段数
        validNumber() {
            return this.allRectArr.length
        },
        //get taskId
        taskId() {
            if (this.$route.query.taskId) {
                return parseInt(this.$route.query.taskId)
            }
        },
        assignType() {
            if (this.$route.query.assignType) {
                return parseInt(this.$route.query.assignType)
            }
        },
        taskGroupId() {
            if (this.$route.query.taskGroupId) {
                return parseInt(this.$route.query.taskGroupId)
            }
        }
    },
    directives: {
        click: {
            // 指令的定义
            inserted: function (el, binding, vnode) {
                const { value, arg } = binding;
                const { list, index, disabled } = value || {};
                const ul = document.createElement('ul');
                const { _uid } = vnode.componentInstance || {};
                const id = `custom-input-${_uid}`;
                ul.setAttribute('id', id);
                ul.setAttribute('class', 'custom-input-drop')
                ul.style.display = "none";
                // ul 添加点击事件
                // 点击事件
                ul.onclick = function (event) {
                    let text = '';
                    const str = event.target.textContent || event.target.innerText;
                    if (str.split(/[:|：]/g)) {
                        text = str.split(/[:|：]/g)[ 0 ];
                    }
                    vnode.context[ arg ][ index ] += text;
                    const $dom = document.getElementById(id);
                    $dom.style.display = 'none';
                }
                let lis = '';
                if (Object.prototype.toString.call(list) === '[object Array]') {
                    // value为数组
                    for (let i = 0, len = list.length; i < len; i++) {
                        lis += "<li>" + list[ i ] + "</li>"
                    }
                }
                ul.innerHTML = lis;
                document.body.appendChild(ul);
                // 屏蔽右键菜单
                el.oncontextmenu = function (event) {
                    if (disabled) return
                    event.preventDefault();
                    const height = document.body.clientHeight;
                    const { clientX, clientY } = event || {};
                    const $dom = document.getElementById(id);
                    $dom.style.display = 'block';
                    $dom.style.position = "fixed";
                    $dom.style.left = clientX + 'px';
                    if (clientY + 200 > height) {
                        $dom.style.top = height - 200 + 'px';
                    } else {
                        $dom.style.top = clientY + 'px';
                    }

                };
                document.body.addEventListener('click', event => {
                    const $uls = document.getElementsByClassName('custom-input-drop');
                    for (let i = 0, len = $uls.length; i < len; i++) {
                        $uls[ i ].style.display = "none";
                    }
                }, { passive: true });
            },
            update: function (el, binding, vnode) {
                const { value } = binding;
                const { list, index, disabled } = value || {};
                const { _uid } = vnode.componentInstance || {};
                const id = `custom-input-${_uid}`;
                const ul = document.getElementById(id);
                let lis = '';
                if (Object.prototype.toString.call(list) === '[object Array]') {
                    // value为数组
                    for (let i = 0, len = list.length; i < len; i++) {
                        lis += "<li>" + list[ i ] + "</li>"
                    }
                }
                ul.innerHTML = lis;
                el.oncontextmenu = function (event) {
                    if (disabled) return
                    event.preventDefault();
                    const height = document.body.clientHeight;
                    const { clientX, clientY } = event || {};
                    const $dom = document.getElementById(id);
                    $dom.style.display = 'block';
                    $dom.style.position = "fixed";
                    $dom.style.left = clientX + 'px';
                    if (clientY + 200 > height) {
                        $dom.style.top = height - 200 + 'px';
                    } else {
                        $dom.style.top = clientY + 'px';
                    }

                };
            }
        },

    },
    mounted() {
        // this.getMark()
    },
    created() {
        
    },
    //离开组件的时候触发
    beforeRouteLeave(to, from, next) {
        // this.$store.commit("SET_SIDEBAR", true)
        // this.$store.commit("setBreadcrumb", true)
        next()
    }
}
</script>