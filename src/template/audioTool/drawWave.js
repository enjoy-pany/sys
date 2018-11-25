import * as d3 from 'd3';
// 直线生成
let lineGenerator = d3.line()
    .x(function(d) {
        return d[0];
    })
    //   获取每个节点的y坐标
    .y(function(d) {
        return d[1];
    });
let height = 300; // 绘制波谱的长度
let maxMultiple = 10; // 最大放大倍数
let showTime = 10; // 每屏显示的时间，秒
let trueWidth = 0;
// 横坐标时间格式
function changeForm(num) {
    let minutes = Math.floor(num/60);
    minutes = minutes<10? '0' + minutes : minutes;
    let seconds = Math.floor(num%60);
    seconds = seconds<10? '0' + seconds : seconds;
    return minutes + ':' + seconds
}
const drawWaveSpace = {
    /**
     * 设置默认值
     * @param n_height 绘制波谱的长度
     * @param n_maxMultiple 最大放大倍数
     * @param n_showTime 每屏显示的时间，秒
     */
    setValue: function(n_height = 300, n_maxMultiple = 10, n_showTime = 10) {
        height = n_height;
        maxMultiple = n_maxMultiple;
        showTime = n_showTime;
    },
    /**
     * 根据url获取音频buffer
     * return buffer
     * @param url 音频地址
     * @param fn 回调函数
     */
    getAudio: function(url, fn) {
        var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
            var context = new AudioContext();
        } catch (e) {
            console.log('!Your browser does not support AudioContext');
        }
        var request = new XMLHttpRequest(); //建立一个请求
        request.open('GET', url, true); //配置好请求类型，文件路径等
        request.responseType = 'arraybuffer'; //配置数据返回类型
        // 一旦获取完成，对音频进行进一步操作，比如解码
        request.onload = function () {
            let copydata = request.response.slice(0);
            context.decodeAudioData(copydata, function(buffer) { // 解码音频文件，获得文件信息
                fn(buffer);
                return buffer
            }, function(e) {
                fn([]);
                //这个是解码失败会调用的函数
                console.log("!哎玛，文件解码失败:(");
                return false
            });

        }
        request.send();
    },
    /**
     * 根据buffer抽取要绘制的数据
     * return array
     * @param originWidth 一屏显示的宽度
     * @param buffer 原音频buffer数
     */
    getAudioData: function (originWidth, buffer) {
        let radioSeconds = buffer.duration*1000;
        let width = originWidth * radioSeconds / (showTime * 1000);
        trueWidth = width;
        let maxWidth = width * maxMultiple;
        let copyMaxwidth = maxWidth;

        let minStep = buffer.getChannelData(0).length/maxWidth;
        if(width < originWidth){
            width = originWidth;
            maxWidth = originWidth*maxMultiple;
        }
        let originalData = new Float32Array(maxWidth);
        for(let i = 0; i < maxWidth; i++ ) {
            if(typeof originalData[parseInt(i * minStep)] && i < copyMaxwidth){
                let sum = 0;
                for(let j = 0; j < buffer.numberOfChannels; j++) {
                    sum += parseFloat(buffer.getChannelData(j)[parseInt(i * minStep)]);
                }
                originalData[i] = sum;
            } else {
                originalData[i] = height/2;
            }
        }
        let dataarr = [];
        // *************** 获取显示峰值并比例处理 ****************** //
        let min = d3.min(originalData);
        let max = d3.max(originalData);
        var linear = d3.scaleLinear()
            .domain([min, 0, max])
            .range([0, height/2, height]);
        // *************** 获取显示峰值并比例处理 ****************** //

        for(let i = 0; i < parseInt(maxWidth); i++ ) {
            if(typeof originalData[i] && i < copyMaxwidth){
                if (isNaN(linear(originalData[i]))) {
                    dataarr.push(height/2);
                } else {
                    dataarr.push(linear(originalData[i]));
                }
            } else {
                dataarr.push(height/2);
            }
        }
        return dataarr
    },
    /**
     * 清空波形图
     */
    clearAudioWave: function(){
        d3.selectAll('#audioWave').remove(); //移除之前画的波形
    },
    /**
     * 根据放大倍数抽取要绘制的数据并绘制图形
     * return int SVG实际宽度
     * @param audioData 整体抽取的数据
     * @param multiple 当前放大倍数
     * @param outerBox 在该id内绘制svg
     * @param color 波形图颜色
     * @param seconds SVG实际秒数
     * @param begin 开始绘制的区域，px
     */
    drawAudioWave: function (audioData, multiple = 1, outerBox, color, seconds, begin, fn) {
        if(Object.prototype.toString.call(audioData)  !== '[object Array]'){
            console.log('传入audioData数组格式错误！');
            return 0
        }
        let drawArr = []; // 当前绘制的数组集合
        let width = audioData.length * multiple / maxMultiple;
        let length = width*10/(seconds*multiple); // 此处10为一屏显示10s,此参数为显示波形的宽度，px
        let start = begin - length >=0 ? parseInt(begin - length) : 0;
        let end = (start + 3 * length) * maxMultiple/multiple < audioData.length ? parseInt((start + 3 * length) * maxMultiple/multiple) : audioData.length;
        start = start*maxMultiple/multiple > end ? (end - 2 * length)*multiple/maxMultiple : start;
        for(let i = parseInt(start * maxMultiple/multiple); i < end; i++) {
            if(typeof audioData[i]) {
                drawArr.push([i*multiple/maxMultiple, audioData[i]]);
            } else {
                console.log('audioData[i]不存在', i);
            }
        }
        drawArr.unshift([drawArr[0][0], height/2]);
        drawArr.push([drawArr[drawArr.length-1][0], height/2]);
        let audioWaveSVG = d3.select(outerBox);
        d3.selectAll('#audioWave').remove(); //移除之前画的波形
        audioWaveSVG.append("svg")    //添加一个svg元素
            .attr("width", width)  //设定宽度
            .attr("height",height) //设定高度
            .attr('id', 'audioWave')
            .append('path')
            .attr('stroke', color)
            .attr('stroke-width', '0.5')
            .attr('fill', color)
            .attr('d', lineGenerator(drawArr));
        let feedback = this.drawAudioAxis(width, seconds, 1, 1, '#fff', 0, end*multiple/maxMultiple, multiple);
        if(feedback){
            console.log('画完了')
            fn();
        }
        return trueWidth * multiple;
    },
    /**
     * 绘制坐标轴
     * return int SVG实际宽度
     * @param width SVG实际宽度
     * @param seconds SVG实际秒数
     * @param ticks 显示刻度的精度
     * @param childticks 两刻度之间分段
     * @param color 坐标轴颜色
     * @param end 坐标轴结束位置
     * @param multiple 放大倍数
     */
    drawAudioAxis: function (width, seconds, ticks, childticks, color, start, end, multiple) {
        let svg = d3.select('#audioWave');
        d3.selectAll('#axisBackGround').remove();
        d3.selectAll('#axisBox').attr('style',`width: ${width}px`); //更改坐标轴处触发滚动div的宽度
        let axisHeight = 30;
        svg.attr('height', height + axisHeight);
        svg.append("rect")
            .attr('fill','#424242')
            .attr("x",0)
            .attr("width",width)
            .attr("y",height)
            .attr('height',axisHeight)
            .attr('id', 'axisBackGround');
        let axisarr = [];
        let perSecondPx = trueWidth * multiple/seconds*ticks;
        // let beginAxis = Math.floor(start*10/perSecondPx)*perSecondPx/10;
        let j = 0;

        for(let i = 0; i<end; ){
            if(j % 10 === 0) {
                j = 1;
                axisarr.push([i, height]);
                axisarr.push([i, height - 20]);
                axisarr.push([i, height]);
                if(i === 0) {
                    svg.append('text').text('s').attr('x', i+5).attr('y', height + axisHeight/2).attr('text-anchor', 'middle').attr('class','axisText').attr('fill', color)
                } else {
                    if (end-i > 0.2*perSecondPx) { // 末尾至少能够多显示0.2s，才显示刻度值
                        svg.append('text').text(changeForm(Math.round(i/perSecondPx))).attr('x', i).attr('y', height + axisHeight/2).attr('text-anchor', 'middle').attr('class','axisText').attr('fill', color)
                    }
                }
            } else {
                axisarr.push([i, height]);
                axisarr.push([i, height - 10]);
                axisarr.push([i, height]);
                j++;
            }
            i += perSecondPx/10;
        }
        axisarr.push([width, height]);
        svg.append('path').attr('stroke', color).attr('stroke-width', '0.5').attr('fill', color).attr('d', lineGenerator(axisarr));
        return true
    },

};

export default  drawWaveSpace;
