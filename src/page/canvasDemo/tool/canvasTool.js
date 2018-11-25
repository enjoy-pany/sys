// Float32Array.prototype.max = function(){ 
//     return Math.max.apply({},this) 
// } 
// Float32Array.prototype.min = function(){ 
//     return Math.min.apply({},this) 
// } 
Float32Array.max = function( Float32Array ){ 
    return Math.max.apply( Math, Float32Array );
};
class Canvas {
	constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    windowToCanvas(x, y) {
        var bbox = this.canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    /**
     * 画图片
     * @param {img} img
     * @param {imgX} 图片所在x信息
     * @param {imgY} 图片所在y信息
     * @param {imgScale} 放大倍数
     */
    drawImage(img,imgX,imgY,imgScale) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (img) {
            this.context.globalAlpha = 1;
            this.context.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                imgX,
                imgY,
                img.width * imgScale,
                img.height * imgScale
            );
        }
    }

    /**
     * 画矩形框
     * @param {rectArr} 矩形框信息数组
     * @param {x} 位置信息x
     * @param {y} 位置信息y
     * @param {width} 矩形框宽度
     * @param {height} 矩形框高度
     */
    drawRect(rectArr){
    	this.clearAllRect()
    	rectArr.forEach((rect)=> {
    		this.context.beginPath();
	        this.context.rect(rect.x,rect.y,rect.width,rect.height);
	        this.context.stroke();
    	})  
    }

    /**
     * 画路径
     * @param {lineWidht} 线宽
     * @param {color} 颜色
     * @param {arr} 数据集
     * @param {rate} 间距
     */
    drawPath(arr=[], lineWidth=1, color='black', rate=1){
        this.clearAllRect()
        this.canvas.width = rate*(arr.length)
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = color;
        this.context.fillStyle=color;
        const x = this.canvas.height/2;
        const max = Math.max.apply(null, arr);
        const min = Math.min.apply(null, arr);
        const padding = 20;
        let base = 1;
        if(Math.abs(max) > Math.abs(min)) {
             base = x/Math.abs(max);
        }else {
            base = x/Math.abs(min)
        }
        var newArr = arr.map((p) => p*base+x-padding)
        for(let i in newArr) {
            if(i == 0) {
                this.context.moveTo(0, newArr[i])
            }else {
                if(i == newArr.length-1) {
                    this.context.closePath();
                    this.context.stroke();
                    this.context.fill();
                }else {
                    this.context.lineTo(i*rate, newArr[i])
                }
            }
        }
    }

    /**
     * 命中判定
     * 核心思想： 由于isPointInPath只能判断最后一次path，
     * 故，遍历所有矩形数组 单独画每一个矩形 进行命中检测.
     * 注意：检测之后 要还原之前的矩形 即重画一次原始矩形数组
     */

    hitJudge(rectArr,pos){
    	for(let i in rectArr) {
    		this.drawRect([rectArr[i]])
    		if(this.context.isPointInPath(pos.x, pos.y)) {
    			this.drawRect(rectArr)
    			return i
    		}
    	}
    	this.drawRect(rectArr)
    	return (-1)
    }

    /**
     * 清理画布
     */
    clearAllRect() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export { Canvas };