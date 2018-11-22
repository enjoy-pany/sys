<template>
<div>
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
        	canvas: null, //自定义canvas类
        	nowImg: null, //当前图片
        	imgX: 0, //图片位置x
        	imgY: 0, //图片位置y
        	zoom: 1, //放大倍数
        }
    },
    methods: {
    	handleMouseWheel(event) {
    		var scaleNum = 1.8
    		// event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40));  //获取当前鼠标的滚动情况
    		var pos = this.canvas.windowToCanvas(event.clientX, event.clientY);
            if (event.wheelDelta < 0) {
                this.zoom *= scaleNum;
                this.imgX = pos.x - scaleNum * (pos.x - this.imgX)
                this.imgY = pos.y - scaleNum * (pos.y - this.imgY)
            } else {
                this.zoom /= scaleNum;
                this.imgX = this.imgX + (pos.x - this.imgX) * ((scaleNum-1)/scaleNum)
                this.imgY = this.imgY + (pos.y - this.imgY) * ((scaleNum-1)/scaleNum)
            }
            console.log('scale =========>',this.zoom);
            this.canvas.drawImage(this.nowImg, this.imgX, this.imgY, this.zoom);   //重新绘制图片
            this.$message.success(`缩放至${(this.zoom*100).toFixed(0)}%`)
    	},
    	handleMouseDown(event) {
    		var loc = this.canvas.windowToCanvas(event.x, event.y);
            event.preventDefault();
            if (event.buttons == 1) { //左键判定
                this.canvas.canvas.onmousemove = (evt) => {
                    this.canvas.canvas.style.cursor = 'move';
                    var posl = this.canvas.windowToCanvas(evt.clientX, evt.clientY);
                    var x = posl.x - loc.x;
                    var y = posl.y - loc.y;
                    loc = posl;
                    this.imgX += x;
                    this.imgY += y;
                    this.canvas.drawImage(this.nowImg, this.imgX, this.imgY, this.zoom)
                }
            }
    	},
    	handleMouseUp(event) {
    		this.canvas.canvas.onmousemove = null;
            this.canvas.canvas.onmouseup = null;
            this.canvas.canvas.style.cursor = 'default';
    	},
    	loadImg (imgUrl) {
            //重新加载图片重置放大倍数
            this.zoom = 1;
            const img = new Image();
            img.onload = ()=> {
                let imgWidth = img.width, imgHeight=img.height;
                let canvasWidth = this.canvas.canvas.width, canvasHeight = this.canvas.canvas.height;

                if(imgWidth>canvasWidth) {
                    this.zoom = canvasWidth/imgWidth
                    imgWidth = canvasWidth
                    imgHeight *=this.zoom
                }
                if(imgHeight>canvasHeight) {
                    this.zoom = canvasHeight/imgHeight
                    imgHeight = canvasHeight
                    imgWidth *=this.zoom
                }
                this.imgX = (canvasWidth - imgWidth)/2
                this.imgY = (canvasHeight - imgHeight)/2
                this.canvas.drawImage(img,this.imgX,this.imgY,this.zoom)
            }
            img.src = imgUrl
            this.nowImg = img
        }
    },
    components: {
    },
    mounted() {
    	const canvas = document.getElementById('canvas');
        const that = this;
        this.canvas = new Canvas(canvas);

        this.loadImg('./static/images/timg.jpeg')
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
