let svgOper_biaozhu_v3={

     /** 
    * drawTextBox 绘制浮动层
    * svg  svg对象
    */
    drawTextBox(svg){

        svg.append("rect")
        .attr('id','dislog_bg')
        .attr('fill','white')
        .attr("x",0)
        .attr("width",160)
        .attr("y",0)
        .attr('height',80)
        .attr('style','display:none');

        let arr = [20, 45, 65];
        svg.selectAll("text")
        .data(arr)
        .enter()
        .append("text")
        .attr("x",10)
        .attr("y",function(d,i){
            return d
        })
        .attr('id',function(d,i){
            return 'dislog_text'+(i+1)
        })
        .attr('style','display:none')
        .text('开始时间:0.1s');

    },
    /** 
    * drawSvgBox 绘制一个svg,根据需求，outerBox里面只有一个svg。用于绘制矩形框和播放线条
    * width: svg的宽度
    * height svg的高度
    * d3 d3对象
    * outerBox  要把改svg放在哪个box里面
    */
    drawSvgBox(width, height, d3, outerBox){
        let old_svg = document.getElementById('svg');
        if(old_svg!==null){
            d3.select('#svg').remove();
        }

        d3.select(outerBox)    //选择文档中的body元素
            .append("svg")    //添加一个svg元素
            .attr("width", width)  //设定宽度
            .attr("height",height) //设定高度
            .attr('id','svg')
        
        return d3.select('#svg');
    },
    
    /** drawRectBox 功能：绘制一个矩形 
     * 需求：高度和svg高度一致，宽度随着鼠标变化，从左到右画，不允许右到左画
     * beginX：x起始点
     * beginY: y起始点
     * svg:再哪个svg里面绘制
     * d3: d3对象
    */
    drawRectBox(beginX, svg, d3,id_index){
      
        d3.select("#svg")
            .append('g')
            .attr('id','g'+id_index);    

        let rect = svg.select("#g"+id_index)
        .append("rect")
        .attr('id','rect'+id_index) 
        .attr('fill','rgba(67,219,150,0.3)')
        .attr("x",beginX)
        .attr("width",2)
        .attr("y",0)
        .attr('height',300)
        .attr('transform','rotate(0)')
        .attr('transform-origin',`${beginX} ${0}`)
        .attr("i",id_index)

        return rect;
        
    },

    /** drawLine 功能：绘制一条线 
     * 需求：高度和svg高度一致，宽度随着鼠标变化，从左到右画，不允许右到左画
     * beginX：x起始点
     * beginY: y起始点
     * svg:再哪个svg里面绘制
     * d3: d3对象
    */
    drawLine(x1,y1,x2,y2,svg,id,type=""){
        let line = svg
            .append("line")
            .attr('id', id)
            .attr('x1',x1)
            .attr('y1',y1)
            .attr('x2',x2)
            .attr('y2',y2)
            .attr('stroke', '#EF353E')
            .attr('stroke-width', 1)
        if(type=='dashed'){
            line.attr('stroke-dasharray','5,5')
            .attr('stroke','#fff')
        }
        
        return line;
        
    },
    /*
    * painCircle 功能：绘制一个圆 
    * svg:svg元素
    * index id
    */
    painCircle(svg, index){
        let g = svg.selectAll('#g'+index);
            
        g.selectAll('circle').remove();
        let rect = g.selectAll("#rect"+index);
        let x = Number(rect.attr('x'));
        let width = Number(rect.attr('width'));
        let height = Number(rect.attr('height'));
        let circles = [7,7];
    
        g.selectAll('.circle')
            .data(circles)
            .enter()
            .append("circle")
            .attr('class','circle')
            .attr('id',function(d,i){ 
                return 'rect'+index+'-'+i
            })
            .attr("cx",(d,i)=>{ 
                return x+(i*width)
            })
            .attr("cy",(d,i)=>{ 
                return height/2
            })
            .attr("i",(d,i)=>{ 
                return i
            })
            .attr('parent_i',index)
            .attr("r",function(d){ return d })
            .attr("fill","white")
    },

    
    /*
    * getRectDom 功能：生成一个rectDom
    * rect:当前生成的rect元素
    * rectObj：存储所有的rectDom的对象
    * rectArr：存储所有的rectDom的数组
    */
    getRectDom(rect, rectObj, rectArr){
       
        let obj = {};
        obj.rectDom = rect;
        obj.id_index = rect.attr('i');
        obj.id = rect.attr('id');
        obj.beginX = Number(rect.attr('x'));
        obj.endX = obj.beginX + Number(rect.attr('width'));
        obj.begin_time = svgOper_biaozhu_v3.getTime(obj.beginX);
        obj.end_time = svgOper_biaozhu_v3.getTime( obj.beginX + Number(rect.attr('width')));
        obj.width_time = svgOper_biaozhu_v3.getTime( Number(rect.attr('width')));
        obj.status = true;

        let obj1={id:rect.attr('id')}
        if(!rect[obj.id]){
            rectArr.push(obj1)
            rectObj[obj.id] = obj;
        }
     
    },
    
    /*
    * resetRectDom 功能：修改rectDom 后要重制修改的元素
    * rect:当前修改的rect元素
    * rectObj：存储所有的rectDom的对象
    */
    resetRectDom(rect, rectObj, noChange=false){

        let obj = {};
        obj.rectDom = rect;
        obj.id_index = rect.attr('i');
        obj.id = rect.attr('id');
        obj.beginX = Number(rect.attr('x'));
        obj.endX = obj.beginX + Number(rect.attr('width'));
       
        if(noChange){

            obj.begin_time =rectObj[obj.id].begin_time
            obj.end_time = rectObj[obj.id].end_time
            obj.width_time = rectObj[obj.id].width_time
        }
        else{
            obj.begin_time = svgOper_biaozhu_v3.getTime(obj.beginX);
            obj.end_time = svgOper_biaozhu_v3.getTime(obj.beginX + Number(rect.attr('width')));
            obj.width_time = svgOper_biaozhu_v3.getTime( Number(rect.attr('width')) );    
        }
        obj.status = true;

        if(rectObj[obj.id]){
            rectObj[obj.id] = obj;
        }

    },

    /**
     * getTime：通过宽度获取时间
     * x:宽度
     */
    getTime(x){
        let totalTime = svgOper_biaozhu_v3.totalTime;
        let totalWidth = svgOper_biaozhu_v3.totalWidth;
        totalTime = Number(Number(totalTime).toFixed(2))*1000;
        let unitWidth = (totalWidth/totalTime);
        let time = (x / unitWidth/1000).toFixed(3);
        return time-0;

    },

    /**
     * getWidth：通过时间获取宽度
     * time:时间
     */
    getWidth(time){
        let totalTime = svgOper_biaozhu_v3.totalTime;
        let totalWidth = svgOper_biaozhu_v3.totalWidth;

        totalTime = Number(totalTime).toFixed(2)*1000;
        let unitWidth = (totalWidth/totalTime);
        let width = time * 1000 * unitWidth
        return width-0;
    },

    /*
    * clearSvgEvent 功能：清空svg里面绑定的事件
    * svg:svg元素
    */
    clearSvgEvent(svg){
        svg.on("mouseup",null);
        svg.on("mousedown",null);
        svg.on("mousemove",null);
        svg.on("mouseleave",null);
    },

    /*
    * lineCheck 功能：检测再切换线条位置时，点击位置是在空白处还是再矩形框里。
    * rectObj:存放全部rectDom的对象
    */
    lineCheck(x, rectObj){
        let result = null
        for(let key in rectObj){
   
            if(x >= rectObj[key].beginX && x <= rectObj[key].endX){
                result = {
                    id:rectObj[key].id,
                    beginX:rectObj[key].beginX, 
                    endX:rectObj[key].endX, 
                    index: rectObj[key].id_index
                };
                break;
            }
        }
        return result;
    },
    /*
    * 读取buffer方法
    * file: file文件
    */
    loadFileBuffer(file, fn) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        var audioContext=new window.AudioContext();
        try {
            var audioContext = new window.AudioContext();
        } catch (e) {
            Console.log('!Your browser does not support AudioContext');
        }

        if (file.length !== 0) {
            var fr = new FileReader();
            fr.onload = function(er) {
                var fileResult = er.target.result;
                //解码成功则调用此函数，参数buffer为解码后得到的结果
                audioContext.decodeAudioData(fileResult, function(buffer) {
                    fn(buffer)
                }, function(e) { 
                    //这个是解码失败会调用的函数
                    console.log("!哎玛，文件解码失败:(");
                });
            }
            fr.readAsArrayBuffer(file);
        };
    }
   
    
}
export default svgOper_biaozhu_v3