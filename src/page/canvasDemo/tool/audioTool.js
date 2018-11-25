const WebAudio = {
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
                	var bufferArr = buffer.getChannelData(0)
                    fn(bufferArr)
                }, function(e) { 
                    //这个是解码失败会调用的函数
                    console.log("!哎玛，文件解码失败:(");
                });
            }
            fr.readAsArrayBuffer(file);
        };
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
}
export default WebAudio