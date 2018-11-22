<template>
<div>
    <el-row>
        <el-button type="primary" @click="seleBtn=!seleBtn">选择</el-button>
        <el-button>矩形</el-button>
        <el-button>圆形</el-button>
        <el-button>多边形</el-button>
        <el-button>线</el-button>
    </el-row>
    <canvas width="1000" height="500" id="canvas" 
    	@mousedown="handleMouseDown" 
    	@mouseup="handleMouseUp"
    	@mousewheel="handleMouseWheel">
        canvas not supported
    </canvas>
</div>
</template>
<script>
import { Canvas } from './index.js';
export default {
    data() {
        return {
            seleBtn: false,
            seleIndex: null,
        	canvas: null, //自定义canvas类
        	rectArr: [], //矩形框数据集
        }
    },
    methods: {
    	handleMouseWheel(event) {
    		
    	},
    	handleMouseDown(event) {
            event.preventDefault();
            var loc = this.canvas.windowToCanvas(event.x, event.y);
            if(this.seleBtn) {
                this.canvas.hitJudge(this.rectArr, {x: loc.x, y: loc.y},(value)=> {
                    this.seleIndex = value
                })
                var diffX = loc.x - this.rectArr[this.seleIndex].x
                var diffY = loc.y - this.rectArr[this.seleIndex].y
                console.log(this.seleIndex)
                this.canvas.drawRect(this.rectArr)
                if (event.buttons == 1) {
                    this.canvas.canvas.onmousemove = (evt) => {
                        var posl = this.canvas.windowToCanvas(evt.clientX, evt.clientY);
                        var x = posl.x - this.rectArr[this.seleIndex].x;
                        var y = posl.y - this.rectArr[this.seleIndex].y;
                        this.rectArr[this.seleIndex].x += (x-diffX);
                        this.rectArr[this.seleIndex].y += (y-diffY);
                        this.canvas.drawRect(this.rectArr)
                    }
                }
                return
            }

            var rectObj = {x: loc.x, y: loc.y, width: 1, height: 1}
    		this.rectArr.push(rectObj)
            this.canvas.drawRect(this.rectArr)

            if (event.buttons == 1) {
                this.canvas.canvas.onmousemove = (evt) => {
                    var posl = this.canvas.windowToCanvas(evt.clientX, evt.clientY);
                    var w = posl.x - loc.x;
                    var h = posl.y - loc.y;
                    rectObj.width = w;
                    rectObj.height = h;
                    this.canvas.drawRect(this.rectArr)
                }
            }
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
	#canvas{
        background: #fff;
        cursor: pointer;
        margin-left: 10px;
        margin-top: 10px;
        box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
    }
</style>
