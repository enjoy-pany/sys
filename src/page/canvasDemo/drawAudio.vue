<template>
<div>
    <el-row>
        <!-- <el-input type="file" @change="handleFileChange">本地上传方式</el-input> -->
        <input type="file" name="" @change="handleFileChange">
        <el-button>http请求方式</el-button>
        <el-button type="primary" @click="seleBtn=!seleBtn">绘制完整波谱</el-button>
        <el-button>边播放边绘制波谱</el-button>
    </el-row>
    <div class="audioWrap">
        <canvas width="1000" height="500" id="canvas" 
            @mousedown="handleMouseDown" 
            @mouseup="handleMouseUp"
            @mousewheel="handleMouseWheel">
            canvas not supported
        </canvas>
    </div>
</div>
</template>
<script>
import { Canvas } from './tool/canvasTool.js';
import WebAudio from './tool/audioTool.js';

export default {
    data() {
        return {
        	canvas: null, //自定义canvas类
        	rectArr: [], //矩形框数据集
        }
    },
    methods: {
        handleFileChange(event) {
            WebAudio.loadFileBuffer(event.target.files[0],(bufferArr)=> {
                let f32Arr = new Float32Array(bufferArr.length/500)
                for( let i in f32Arr) {
                    f32Arr[i] = bufferArr[i*500]
                }
                this.canvas.drawPath(f32Arr,1,'green',1)
            })
        },
    	handleMouseWheel(event) {

    	},
    	handleMouseDown(event) {
            event.preventDefault();
            var loc = this.canvas.windowToCanvas(event.x, event.y);
            
    	},
    	handleMouseUp(event) {
    		this.canvas.canvas.onmousemove = null;
            this.canvas.canvas.onmouseup = null;
    	}
    },
    components: {
    },
    mounted() {
    	const canvas = document.getElementById('canvas');
        const that = this;
        this.canvas = new Canvas(canvas);
    }
}
</script>
<style lang="less" scoped>
    .audioWrap {
        width: 100%;
        height: 100%;
        overflow: auto;
        #canvas{
            background: #fff;
            cursor: pointer;
            margin-left: 10px;
            margin-top: 10px;
            box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
        }   
    }
	
</style>
