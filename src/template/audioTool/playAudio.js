const playAudioSpace = {
    /**
     * 按时间播放选中的数据信息
     * return func
     * @param c 开始播放时间
     * @param d 播放时间,不是播放截止时间
     * @param buffer 原音频buffer数
     */
    cPlayAudio: function() {
        let cAudioCtx = null,
            csource = null;
        return function(buffer, c, d, flag) {
            if (!flag) {
                // 暂停状态
                if (cAudioCtx) {
                    // 如果有音频上下文字段   清空
                    csource.disconnect(cAudioCtx.destination);
                    cAudioCtx = null;
                    csource = null;
                }
                return;
            }
            cAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            csource = cAudioCtx.createBufferSource();
            csource.buffer = buffer;
            csource.connect(cAudioCtx.destination);
            csource.start(0, c, d);
            csource.onended = function() {
                if (csource) {
                    csource.disconnect(cAudioCtx.destination);
                    cAudioCtx = null;
                    csource = null;
                }
            };
        };
    }
};

export default playAudioSpace;
