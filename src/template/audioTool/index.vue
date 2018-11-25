<template>
    <div>
        <input type="file" name="" @change="getBuffer">
        <div class='m-container' id='m-container' v-loading='loading' :element-loading-text='loadingMessage' element-loading-background='rgba(0, 0, 0, 0.8)'>
            <div id = 'svgBox' class='svgBox' :style="[svgStyle]">
                <div id='axisBox'></div>
                <div class="disloag" id="dialog">
                    <p id="dialog_text1">开始时间</p>
                    <p id="dialog_text2">结束时间</p>
                    <p id="dialog_text3">截取时间</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='less' >
    .disloag{
        width: 160px;
        height: 80px;
        background: #fff;
        position: absolute;
        left:0;
        top:0;
        z-index:1000;
        display: none;
        padding-top: 10px;
        box-sizing: border-box;
        p{
            color: #333;
            font-size: 14px;
            line-height: 10px;
            margin-left: 10px
        }
    }
    #m-container{
        background: #424242;
        padding: 20px 20px 0 20px;
    }
    .svgBox{
        width: 100%;
        height: 330px;
        position: relative;
        background: #000;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
            width: 3px;
            height: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: #424242;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #6e6e6e;
            border-radius: 5px;
        }
        #audioWave {
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
        }
        #svg {
            position: absolute;
            z-index: 9;
            left: 0;
            top: 0;
        }
        #axisBox {
            position: absolute;
            top: 300px;
            left: 0;
            width: 100%;
            height: 30px;
            z-index: 1000;
            cursor: pointer;
        }
        .MyText{
            fill: #333;
            z-index:100;
        }
    }
</style>

<script>
import * as d3 from 'd3';
import svgOperBZ from './index.js'
import cPlayAudio from './playAudio.js';
import drawAudio from './drawWave.js';
import { MessageBox } from 'element-ui';

const perMultiple = 1; // 每次缩放的倍数
const minMultiple = 1; //最小放大倍数
const maxMultiple = 10; //最大放大倍数
const playAudio = cPlayAudio.cPlayAudio();
export default {
    data () {
        return {
            loading: true, // loading图标显示
            loadingMessage: '音频获取中',
            newUrl: false, // 是否为新的音频
            svg:null, // svg绘制框
            line: null, // 播放起始标志线
            line_run:null,// 播放滚动线
            rectIdIndex:0,// 用于生成每个rect的id
            nowRectEndX:0, // 播放的结束位置
            nowRectStartX:0, // 播放的开始位置

            checkedNowId:[],// 记录当前选中的矩形框，用于删除
            allRect:{}, // 对象，存储所有的rectDom对象
            allRectArr:[],// 数组 存储所有的rectDom对象（用于遍历）

            totalTime:0, // 整段音频的时常
            totalWidth:0, // 是svg的总长度
            clientWidth: 0, //屏幕显示波形的宽度
            buffer: {}, // 音频buffer
            multiple: 1, // 当前放大倍数
            mouseScrollState: true, // 是否允许放大或缩小
            currentPosition: 0, // 当前屏幕中心点位置
            currentScroll: 0, // 当前滚动条位置
            svgStyle: {} // svgbox的宽度样式，因出现与子div不一致创建
        }
    },
    props:{
        //当前播放状态
        play:{
            default:false,
            type:Boolean
        },
        deleteBox:{
            default:false,
            type:Boolean
        },
        checkedId:{
            default:"",
            type:String
        },
        type:{
            default:'skitch',
            type:String
        },
        resetAllRect:{
            default:function(){
                return {}
            },
            type:Object
        },
        resetAllRectArr:{
            default:function(){
                return []
            },
            type:Array,
        },
        url:{
            default:"",
            type:String
        },
        noPain:{
            default:false,
            type:Boolean
        },
        noClick:{
            default:false,
            type:Boolean
        },
        noSacle:{
            default:false,
            type:Boolean
        }
    },
    watch:{
        // 屏幕宽度变化
        clientWidth(val) {
            if(val > 0) {
                this.svgStyle = {width: val + 'px'}
            } else {
                this.svgStyle = {}
            }
        },
        buffer() {
            // 获取展示的全部数据
            console.log('buffer change')
            this.loadingMessage = '频谱绘制中';
            this.totalData = drawAudio.getAudioData(this.clientWidth, this.buffer);
            // 获取波谱总长度，并绘制波谱
            this.totalWidth = parseInt(drawAudio.drawAudioWave(this.totalData, this.multiple, '#svgBox', '#56dda2', this.buffer.duration, 0, this.closeLoading));
            this.totalTime = Number(this.buffer.duration.toFixed(2));
            this.newUrl = false;
            //重新设置这些值
            this.nowRectEndX = this.totalWidth;
            this.nowRectStartX = 0;
            this.rectIdIndex = 0;
            this.resetCheckedNowArr("");
            this.init();

        },
        play:{//播放监听
            handler: function(newVal, oldVal){
                if(newVal) {
                    this.lineRunFn()
                }else {
                    this.stopLineRunFn()
                }
            },
            deep: true
        },
        deleteBox:{ //删除监听
            handler: function(newVal, oldVal){
                if(newVal === true){
                    this.deleRect()
                }
            },
            deep: true
        },
        checkedId:{ //选中按钮监听
            handler: function(newVal, oldVal){
                if(newVal == ''){
                    //清空所有圆点和选中背景
                    this.svg.selectAll('circle').attr('fill','none');
                    this.svg.selectAll('g').selectAll('rect').attr('fill','rgba(250,250,250,.3)');
                    return;
                }
                this.btnCheckedRect(newVal)
            },
            deep: true
        },

        currentScroll(){
            if(!this.newUrl) {
                drawAudio.drawAudioWave(this.totalData, this.multiple, '#svgBox', '#56dda2', this.buffer.duration, this.currentScroll*this.clientWidth, this.closeLoading);
            } else {
                // console.log('新音频')
            }
        },

        resetAllRectArr:{
            handler: function(newVal, oldVal){
                this.allRectArr = JSON.parse(JSON.stringify(this.resetAllRectArr));
                // if(this.allRectArr.length != 0){
                //     let id_index = this.allRectArr[this.allRectArr.length-1].id.replace('rect','');
                //     this.rectIdIndex = Number(id_index)+1;
                // }
                // else{
                //     this.rectIdIndex = 0;
                // }
            },
            deep: true
        },

        resetAllRect:{
            handler: function(newVal, oldVal){
               this.allRect = JSON.parse(JSON.stringify(this.resetAllRect));
            },
            deep: true
        },
        url:function(newVal,oldVal){
            console.log(newVal)
            if(newVal != ""){
                this.newUrl = true;
                console.log('得到url', this.url)
                this.changeLoadingText('音频获取中');
                drawAudio.clearAudioWave();
                this.loading = true; // 打开loading，重置svg宽度，以便当svg发生更改时，关闭loading
                this.totalWidth = 0;
                this.currentPosition = 0;
                this.currentScroll = 0;
                this.moveSvg()
                this.mouseScrollState = true;
                this.multiple=1;
                this.urlInit()
            } else {
                drawAudio.clearAudioWave();
                this.totalWidth = 0;
                this.totalTime = 0;
                this.loading = false; // 全部语音标注完成后，传入的url为空，关闭loading
                this.allRect = {};
                this.allRectArr = [];
                this.init();
            }
        },
        noPain:function(newVal,oldVal){
            this.reInit()
        },
        noClick:function(newVal,oldVal){
            this.reInit()
        },
        noSacle:function(newVal,oldVal){
            this.reInit()
        }
    },

    mounted(){

    },
    methods:{
        // 关闭loading方法
        closeLoading() {
            this.loading = false;
            this.$emit('drawOver', true);
        },
        // 更改loading文案
        changeLoadingText(val) {
            this.loadingMessage = val;
        },
        urlInit(){
            this.$emit('drawOver', false);
            // 获取音频信息
            this.getAudioBuffer(this.url);
            // 监听滚动状态，分屏加载数据
            document.getElementById("svgBox").addEventListener("scroll", this.handleScroll);
            document.getElementById("svgBox").addEventListener("touchmove", function(e) {
                e.preventDefault();
            });
            // 获取屏幕宽度
            let w = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
            this.clientWidth = w - 40;

            //定位当前屏幕中心点
            this.currentPosition = this.clientWidth/2;
            let that = this;
            //监听滚轮事件，放大缩小
            document.getElementById('svgBox').onmousewheel = function (e) {
                e = e || window.event;
                e.preventDefault();
                let wheel = e.wheelDelta;
                //滚轮滚动一定距离、允许缩放功能打开、非播放状态时可缩放
                if(wheel <  -100 && that.mouseScrollState && !that.play) {
                    that.mouseScrollState = false;
                    that.currentPosition = e.offsetX * (that.multiple - perMultiple) /that.multiple;
                    that.reDuceAudioWave();
                    setTimeout(function () {
                        that.mouseScrollState = true;
                    },500)
                    return false
                }
                if(wheel > 100 && that.mouseScrollState && !that.play) {
                    that.mouseScrollState = false;
                    that.currentPosition = e.offsetX * (that.multiple + perMultiple) /that.multiple;
                    that.enLargeAudioWave();
                    setTimeout(function () {
                        that.mouseScrollState = true;
                    },500)
                    return false
                }
            };
        },
        init(){
            svgOperBZ.totalTime = this.totalTime;
            svgOperBZ.totalWidth = this.totalWidth;
            this.$emit('reset_val','totalTime',svgOperBZ.totalTime);
            if(this.svg!=null){
                this.svg.remove();
            }

            this.svg = svgOperBZ.drawSvgBox(this.totalWidth,300,d3,'#svgBox');
            this.line = svgOperBZ.drawLine(0,0,0,300,this.svg,'line','dashed')
            this.line_run = svgOperBZ.drawLine(0, 0, 0, 300, this.svg,'line_run');
            this.resetSvg();
            this.reInit();
            this.resetCheckedNowArr("");
        },

        //为浮层的显示绑定事件
        showDialog(){
            let id = ""
            let that = this;

            this.svg.selectAll('g').select('rect')
            .on('mousemove',function(d, i){      

                id = this.getAttribute('id');
                that.resetDislog(id,true)
            }).on('mouseleave',function(d,i){

                that.resetDislog(id,false);
                that.svg.selectAll('g').select('rect').on('mousemove',null);
                that.svg.selectAll('g').select('rect').on('mouseleave',null);
                that.showDialog();
            })
        },

        //重新设置浮层的位置
        resetDislog(id,show){
            if(id=="")return
            if(!this.allRect[id])return;
            let begin_time = this.allRect[id].begin_time;
            let end_time = this.allRect[id].end_time;
            let width_time = this.allRect[id].width_time;
            let result_x = this.allRect[id].beginX;
            if(this.totalWidth<160){
                result_x = this.allRect[id].beginX;
            }
            else if((this.totalWidth-this.allRect[id].beginX)<=160){
                result_x = this.allRect[id].beginX-150
            }


            let dislog = d3.selectAll('#dialog');
            dislog
            .style('display',show?'block':'none')
            .style('left',(result_x+20)+'px')
            if(show){
                document.getElementById('dialog_text1').innerHTML = '开始时间:'+begin_time+'s';
                document.getElementById('dialog_text2').innerHTML = '结束时间:'+end_time+'s';
                document.getElementById('dialog_text3').innerHTML = '截取时间:'+width_time+'s';
            }
            
        },

        //初始化（绘制矩形）
        svgInit(){
            let rect = null;
            let beginX = 0;
            let endX = 0;
            let num = 0;
        
            this.svg.on("mousedown",(d,i)=>{
                this.svg.selectAll('circle').attr('fill','none');
                this.svg.selectAll('g').selectAll('rect').attr('fill','rgba(250,250,250,.3)');
                beginX = d3.event.offsetX;
                this.rectIdIndex++;

                this.svg
                .on("mousemove",(d,i)=>{
                    //生成一次矩形
                    if(num==0){
                        //检测鼠标移动时，该点是否在矩形框里面，如果是，就不生成矩形，
                        if(!this.positonCheck(d3.event.offsetX)){
                            this.svg.on("mousemove",null); 
                            rect = null;
                            return;
                        }
                        rect = svgOperBZ.drawRectBox(beginX, this.svg, d3, this.rectIdIndex);
                        num=1;
                    }

                    //矩形开始绘制  如果往左边绘制，该矩形就直接不要了
                    let width = d3.event.offsetX - beginX;
                    if(width<0){
                        rect.remove();
                        rect = null;
                        this.svg.on("mousemove",null); 
                    }
                    else{
                        rect.attr("width",width);
                    }  

                    //检测鼠标移动时，该点是否在矩形框里面，如果是，就停止绘制矩形
                    if(rect && !this.checkPointPositon(rect,'right')){
                        this.svg.on("mousemove",null); 
                        return;
                    }
                    
                    
                })
                .on("mouseup", (d,i) => {

                    endX = d3.event.offsetX;

                    //鼠标抬起是，检测是否是点击功能，如果是就进行线条的操作
                    if(beginX-endX==0) {
                        //检测鼠标是否点击再某个矩形里面
                        if(this.noClick==false){
                            this.mouseClick()  
                        }
                                            
                    }
                    this.drawRectEnd(beginX,endX,rect);

                })
                .on('mouseleave',(d,i)=>{
                    endX = d3.event.offsetX;
                    this.drawRectEnd(beginX, endX, rect);
                })
            })
           
        },

        svgClick(){
            this.svg.on('click',(d,i)=>{
                this.svg.selectAll('circle').attr('fill','none');
                this.svg.selectAll('g').selectAll('rect').attr('fill','rgba(250,250,250,.3)');
                this.mouseClick();
            })
        },

        //点击鼠标时候判断点击位置
        mouseClick(){
            let hitObj = svgOperBZ.lineCheck(d3.event.offsetX, this.allRect);
     

            //点击在空白处
            if (hitObj == null) {

                //点击空白处，表示没有选中任何矩形框
                this.resetCheckedNowArr("");

                //更新当前run_line位置
                this.resetLinePos(d3.event.offsetX, this.totalWidth);        
            } 

            //点击再矩形框里面
            else {

                //重置选中矩形数组
                this.resetCheckedNowArr(hitObj.id);

                //更新当前run_line位置
                this.resetLinePos(hitObj.beginX, hitObj.endX);
            }
        },

        //绘制矩形的收尾工作
        drawRectEnd(beginX, endX, rect){
            if(rect && svgOperBZ.getTime(Math.abs(endX-beginX))<0.01){
                rect.remove();
                rect = null;
                this.resetCheckedNowArr(this.checkedNowId.length>0?this.checkedNowId[0]:"");
            }
            else if(rect){  
                //重置数据，重新绘制圆
                svgOperBZ.getRectDom(rect,this.allRect,this.allRectArr);
                this.moveRect(this.allRect[rect.attr('id')]);

                this.resetCheckedNowArr(rect.attr('id'))
                this.emitData()              
            }
            else if(rect == null){
                this.resetCheckedNowArr(this.checkedNowId.length>0?this.checkedNowId[0]:"");
            }
            this.reInit();

        
        },

        //重制当前选中项
        resetCheckedNowArr(id){
            this.checkedNowId = [];
            if(id !== ""){
                this.checkedNowId = [id]
            }
            
            if(this.checkedNowId.length==0){
                this.$emit('reset_val','checkedId',"") 
            }
            else{
                if(this.checkedId !== id){
                    this.$emit('reset_val','checkedId',id);
                }
                //清空所有圆点和选中背景
                this.svg.selectAll('circle').attr('fill','none');
                this.svg.selectAll('g').selectAll('rect').attr('fill','rgba(250,250,250,.3)');

                let obj = this.allRect[id];
                this.resetLinePos(obj.beginX, obj.endX)


                //设置圆点和选中背景
                this.svg
                    .selectAll("#g" + obj.id_index)
                    .selectAll("circle")
                    .attr("fill", "#fff");
                this.svg
                    .selectAll("#g" + obj.id_index)
                    .selectAll("rect")
                    .attr("fill", "rgba(67,219,150,0.3)");
            }
            
        },

        //绘制缩放矩形后挪动矩形到对应的位置。
        moveRect(obj){
            let begin_time = 0;
            let end_time = 0;
            let beginX = 0;
            let endX = 0;
            let flag = false;
            let flag1 = false;
            let rect = obj.rectDom;
            if((obj.begin_time * 1000) % 10 == 0){
                begin_time = obj.begin_time.toFixed(2);
            }
            else{
                begin_time = parseInt((obj.begin_time *1000) / 10);
                begin_time = ((begin_time*10)/1000).toFixed(2);
            }

            if((obj.end_time * 1000) % 10 == 0){
                end_time = obj.end_time.toFixed(2);
            }
            else{
                end_time = parseInt((obj.end_time *1000) / 10);
                end_time = ((end_time+1)*10/1000).toFixed(2);
            }
            //容错， 预防绘制的开始时间小于0，结束时间大于最长时间
            if(begin_time<0){begin_time=0;}
            if(end_time>this.totalTime){end_time = this.totalTime;}

            //预防和其他的图形重叠
            for(let key in this.allRect){      
            
                if(rect.attr('id') !== this.allRect[key].rectDom.attr('id')){
                    if(begin_time <= this.allRect[key].end_time && begin_time >= this.allRect[key].begin_time){
                        begin_time = this.allRect[key].end_time;
                        beginX = this.allRect[key].endX;
                        flag = true;
                    }

                    if(end_time >= this.allRect[key].begin_time && end_time <= this.allRect[key].end_time){
                       end_time = this.allRect[key].begin_time;
                       endX = this.allRect[key].beginX;
                       flag1 = true
                    }
                   
                }
            }
                    
 
            if(!flag){
                beginX =  Number((svgOperBZ.getWidth(begin_time)));  
            }

            if(!flag1){
                endX = Number((svgOperBZ.getWidth(end_time)));
            }

            obj.rectDom
            .attr('x',beginX)
            .attr('width',endX-beginX);

            obj.beginX = Number(beginX);
            obj.endX = Number(endX);
            obj.begin_time = Number(begin_time);
            obj.end_time = Number(end_time);
            obj.width_time = Number((end_time-begin_time).toFixed(2));

            this.allRect[obj.id] = obj;
            if(this.type == "skitch"){
                svgOperBZ.painCircle(this.svg, obj.id_index);
            }
            
        },

        //缩放矩形
        scaleRect(){
            let that = this;     
            let rect = null;
            let i =null;
            let now_g = null;

            this.svg.selectAll('g').selectAll('circle').on('mousedown',function(){
                svgOperBZ.clearSvgEvent(that.svg);
                

                //this表示当前选中circle
                let i = this.getAttribute('i');

                rect = that.svg.selectAll('#rect'+this.getAttribute('parent_i'));
                now_g = that.svg.selectAll('#g'+this.getAttribute('parent_i'))
            
                let old_width = Number(rect.attr('width'));
                let old_x = Number(rect.attr('x'));
                let left = d3.event.offsetX;

                that.svg.on('mousemove',()=>{
                    that.svg.selectAll('g').select('rect').on('mousemove',null);
                    that.line.attr('stroke','none');
                    that.line_run.attr('stroke','none');
                    now_g.selectAll('circle').attr('fill','none')

                    //检测是否缩放到最小精度，如果是，就停止缩放
                    if((svgOperBZ.getTime(Number(rect.attr('width'))))<0.01){
                        that.svg.on("mousemove",null); 
                        return;
                    }
                
                    //左边放大
                    if(i ==0 ){  
                        let x = Number(d3.event.offsetX);
                        let width = old_width + old_x - x;
                        if(width<=0 ){
                            rect.attr('width',2);
                        }else{
                            rect.attr('x',x)
                            .attr('width',width);
                        }

                        //检测鼠标移动时，该点是否在矩形框里面，如果是，就不继续缩放啦；
                        if(!that.checkPointPositon(rect,'left')){
                            that.svg.on("mousemove",null); 
                            return;
                        }       

                    }

                    //右边放大
                    else if(i==1){
                        let width = d3.event.offsetX - left;
                        if(old_width+width<=0){
                            rect.attr('width',2)
                        }
                        else{
                            rect.attr('width',old_width+width)
                        }
                        //检测鼠标移动时，该点是否在矩形框里面，如果是，就不继续缩放啦；
                        if(!that.checkPointPositon(rect, 'right')){ 
                            that.svg.on("mousemove",null); 
                            return;
                        } 
                    }       
                 
                })
                .on('mouseup',()=>{
                    that.scaleRectEnd.call(that, rect);
                })
                .on('mouseleave',(g)=>{
                    that.scaleRectEnd.call(that, rect)
                })
            })
        },

        //缩放矩形后的收尾工作
        scaleRectEnd(rect){
            svgOperBZ.resetRectDom(rect, this.allRect);
            this.moveRect(this.allRect[rect.attr('id')]);
            this.resetLinePos(Number(rect.attr('x')), Number(rect.attr('width')) + Number(rect.attr('x')))
            this.reInit()
            this.emitData()
           
        },
 
        //检测当前矩形的位置有没有和之前绘制的重合
        checkPointPositon(rect,dir){
            let beginX = Number(rect.attr('x'));
            let endX = Number(rect.attr('width'))+beginX;

            if(dir == 'right'){        
                for(let key in this.allRect){      
                        
                    if(rect.attr('id') !== this.allRect[key].rectDom.attr('id')){
                        if(beginX >= this.allRect[key].endX){
                            continue
                        }
                        else {
                           
                            if(endX >= this.allRect[key].beginX){
                                rect.attr('width',this.allRect[key].beginX-beginX)
                                return false;
                            }
                        }
                
                    }       
                    
                }
                return true
            }else{
           
                 for(let key in this.allRect){      
            
                    if(rect.attr('id') !== this.allRect[key].rectDom.attr('id')){
                        if(endX <= this.allRect[key].beginX){
                            continue
                        }
                        else {
                           
                            if(beginX <= this.allRect[key].endX){        
                                let endX = this.allRect[rect.attr('id')].endX
                                rect.attr('x',this.allRect[key].endX)
                                .attr('width',endX-this.allRect[key].endX)
                                return false;
                            }
                        }
                
                    }       
                    
                }
                return true
            }
        },


        //检测当前矩形的位置有没有和之前绘制的重合
        positonCheck(x){  
            for(let key in this.allRect){     
                if(x >= this.allRect[key].beginX && x <= this.allRect[key].endX){
                    return false;
                }  
            }
            return true
        },
        //按钮选中一个
        btnCheckedRect(id){
            this.rectScroll(id)
            this.resetCheckedNowArr(id)
        },
        //选中矩形框后滚动
        rectScroll(id) {
            let position = this.allRect[id].beginX;
            let nowScrollPosition = document.getElementById('svgBox').scrollLeft;
            if(position > nowScrollPosition + this.clientWidth || position < nowScrollPosition) {
                this.currentPosition = position;
                this.moveSvg()
            }
        },
        //删除一个
        deleRect(){
            if(this.checkedNowId.length==0){
                alert('请选择一个删除')
            }
            else{
                this.nowRectEndX = this.totalWidth;
                let id_index = this.checkedNowId[0].replace('rect','');
            
                d3.selectAll('#g'+id_index).remove();
                delete this.allRect[this.checkedNowId[0]];
                for(let i = 0; i<this.allRectArr.length; i++){
                    if(this.allRectArr[i].id == this.checkedNowId[0]){
                        this.allRectArr.splice(i,1);
                        break;
                    }
                }
                this.emitData() 
                this.resetCheckedNowArr("")
                this.reInit()   
                        
            }
        
            this.$emit('reset_val','deleteBox',false);
        },

        //放大缩小时重新绘制画布
        rePainSvg(){
           
            svgOperBZ.totalWidth = this.totalWidth;

            let old_svg_width = Number(this.svg.attr('width'));
            this.rePainLine(old_svg_width);
            this.svg.attr('width', this.totalWidth);

            for(let key in this.allRect){
                let item = this.allRect[key];
                item.rectDom
                .attr('x',svgOperBZ.getWidth(item.begin_time))
                .attr('width',svgOperBZ.getWidth(item.width_time))
                svgOperBZ.resetRectDom(item.rectDom, this.allRect,true);
                item = null;
            }


            for(let key in this.allRect){
                let item = this.allRect[key];
                this.moveRect(item)   
                if(this.checkedNowId.length != 0 && this.checkedNowId[0] == item.id){
                    this.svg
                    .selectAll("#g" + item.id_index)
                    .selectAll("circle")
                    .attr("fill", "#fff");
                }
                else{
                    this.svg.selectAll('#g'+item.id_index).selectAll('circle').attr('fill','none');
                }    

                item = null;
            }


            this.reInit();
            this.emitData();

        },

        //放大缩小时重新绘制线条的位置
        rePainLine(old_svg_width){
            let multiple = this.totalWidth/old_svg_width;
            let x_line = this.line.attr("x1")*multiple;
            let x_line_run = this.line_run.attr("x1")*multiple;

            this.nowRectEndX = this.nowRectEndX * multiple;
            this.nowRectStartX = this.nowRectStartX * multiple;

            //点击移动线的位置
            this.line.attr("x1", x_line).attr("x2", x_line);
            this.line_run.attr("x1", x_line_run).attr("x2", x_line_run);
         
        },

        //线条跑动（根据当前线条的开始时间和结束时间）
        lineRunFn() {
            let time = svgOperBZ.getTime(this.nowRectEndX-this.nowRectStartX)*1000;
            this.line_run
            .attr('x1',this.nowRectStartX)
            .attr('x2',this.nowRectStartX)
            .transition()
            .ease(d3.easeLinear)
            .duration(time)
            .on('end', ()=> {
                this.$emit('onPlayEnd', false)
            })
            .attr('x1',this.nowRectEndX)
            .attr('x2',this.nowRectEndX)
            //开始试音播放
            this.audioPlay(true)
        },

        //线条停止跑动
        stopLineRunFn() {
            this.line_run.interrupt() //取消过渡动画
            //暂停试音播放
            this.audioPlay(false)
        },

        audioPlay(bool) {
            let startTime = svgOperBZ.getTime(this.nowRectStartX)
            let endTime = svgOperBZ.getTime(this.nowRectEndX)
            if (this.buffer != null) {
                playAudio(this.buffer, startTime, endTime - startTime, bool)
            }
        },

        //重新绘制线条位置
        resetLinePos(beginX, endX){
            this.nowRectStartX = beginX;
            this.nowRectEndX = endX;
            this.line
                .attr("x1", beginX)
                .attr("x2", beginX)
                .attr('stroke','#fff');
            this.line_run
                .attr("x1", beginX)
                .attr("x2", beginX)
                .attr('stroke','#EF353E');
        },

        //重置
        reInit(){
            svgOperBZ.clearSvgEvent(this.svg);
            this.svg.selectAll('g').selectAll('circle').on('mousedown', null);
            if(this.type == "skitch"){
               
                if(this.noPain==false && this.noClick==false && this.noSacle==false){
                    this.svgInit();
                    this.scaleRect();      
                }
                else if(this.noPain==true && this.noClick==false && this.noSacle==false){
                    this.scaleRect();     
                    this.svgClick(); 
                }
                else if(this.noPain==false && this.noClick==true && this.noSacle==false){
                    this.svgInit();
                    this.scaleRect();     
                }
                else if(this.noPain==false && this.noClick==false && this.noSacle==true){
                    this.svgInit();  
                }
                else if(this.noPain==false && this.noClick==true && this.noSacle==true){
                    this.svgInit();     
                }
                else if(this.noPain==true && this.noClick==false && this.noSacle==true){
                    this.svgClick();     
                }
                else if(this.noPain==true && this.noClick==true && this.noSacle==false){
                    this.scaleRect();     
                }
                else if(this.noPain==true && this.noClick==true && this.noSacle==true){
                 
                }
            }
            else if(this.type == "quality"){
                this.svgClick();
            }
            this.showDialog();
        },
        //获取buffer
        getBuffer (e) {
            svgOperBZ.loadFileBuffer(e.target.files[0], (buffer) => {
                this.buffer = buffer
            })
        },

        //发布数据
        emitData(){
            this.$emit('reset_val','allRect',JSON.parse(JSON.stringify(this.allRect)));
            this.$emit('reset_val','allRectArr',JSON.parse(JSON.stringify(this.allRectArr)))
        },

        // 获取url buffer,并更改loading状态
        getAudioBuffer (url) {
            this.loading = true
            drawAudio.getAudio(url, (buffer) => {
                if(buffer.length){
                    this.buffer = buffer;
                    this.changeLoadingText('数据读取中');
                } else { // 处理buffer返回错误格式
                    this.changeLoadingText('音频加载出错');
                    console.log('buffer has error');
                    this.closeLoading();
                    MessageBox.alert('音频处理出错', '提示', {
                        type: 'warning',
                        showClose: false,
                        confirmButtonText: '知道了'
                    });
                }
            })
        },

        // 放大频谱
        enLargeAudioWave(){
            if(this.multiple < minMultiple || this.multiple >= maxMultiple) {
                console.log('已放至最大')
                return;
            } // 缩放倍数超出范围
            this.loading = true;
            this.multiple += perMultiple;
            this.totalWidth = parseInt(drawAudio.drawAudioWave(this.totalData, this.multiple, '#svgBox', '#56dda2', this.buffer.duration, this.currentScroll*this.clientWidth, this.closeLoading));
            this.rePainSvg();
            this.moveSvg();
        },
        // 缩小频谱
        reDuceAudioWave(){
            if(this.multiple <= minMultiple || this.multiple > maxMultiple) {
                console.log('已缩至最小')
                return;
            } // 缩放倍数超出范围
            this.loading = true;
            this.multiple -= perMultiple;
            this.totalWidth = parseInt(drawAudio.drawAudioWave(this.totalData, this.multiple, '#svgBox', '#56dda2', this.buffer.duration, this.currentScroll*this.clientWidth, this.closeLoading));
            this.rePainSvg();
            this.moveSvg();
        },
        // 移动svg，将放大缩小时鼠标所在地移到屏幕中间
        moveSvg() {
            let audio = document.getElementById('svgBox');
            audio.scrollLeft = this.currentPosition - this.clientWidth/2;
        },
        // 滚动条滚动处理
        handleScroll(){
            let x = document.getElementById('svgBox');
            // 滚动条滚过一屏再进行重绘
            if(parseInt(x.scrollLeft/this.clientWidth) !== this.currentScroll) {
                this.currentScroll = parseInt(x.scrollLeft/this.clientWidth);
            }
        },

        //初始化画布
        resetSvg(){
            this.allRectArr = JSON.parse(JSON.stringify(this.resetAllRectArr));
            if(this.allRectArr.length != 0){
                let id_index = this.allRectArr[this.allRectArr.length-1].id.replace('rect','');
                this.rectIdIndex = Number(id_index)+1;
            }else{
                this.rectIdIndex = 0;
            }
            this.allRect = JSON.parse(JSON.stringify(this.resetAllRect));

            for(let key in this.allRect){
                let item = this.allRect[key];
                item.rectDom = svgOperBZ.drawRectBox(item.beginX, this.svg, d3, item.id_index)
                item.rectDom
                .attr('x',svgOperBZ.getWidth(item.begin_time))
                .attr('width',svgOperBZ.getWidth(item.width_time))
                
                svgOperBZ.resetRectDom(item.rectDom, this.allRect,true);
                if(this.type == "skitch"){
                   svgOperBZ.painCircle(this.svg, item.id_index); 
                }
                
                this.svg.selectAll('#g'+item.id_index).selectAll('circle').attr('fill','none');
                this.svg.selectAll('g').selectAll('rect').attr('fill','rgba(250,250,250,.3)');
                item = null;
            }
            this.reInit();
            this.emitData();
        }

    }
}
</script>


<style scoped>

</style>