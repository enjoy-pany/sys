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
     *@param {rectArr} 矩形框信息数组
     * @param {x} 位置信息x
     * @param {y} 位置信息y
     * @param {width} 矩形框宽度
     * @param {height} 矩形框高度
     */
    drawRect(rectArr){
    	this.clearAllRect()
    	rectArr.map((rect)=> {
    		this.context.beginPath();
	        this.context.rect(rect.x,rect.y,rect.width,rect.height);
	        this.context.stroke();
    	})  
    }

    /**
     * 命中判定
     */

    hitJudge(rectArr,pos,fn){
    	rectArr.map((rect, index)=> {
    		this.drawRect([rect]);
    		if(this.context.isPointInPath(pos.x, pos.y)) {
    			fn(index)
    		}
    	})
    }

    /**
     * 清理画布
     */
    clearAllRect() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export { Canvas };