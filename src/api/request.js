/**
 * @功能：
 * request封装，所有请求都走这里
 * option = {
 *      url:请求地址
 *      isLoading: 是否启用请求loading 不传此参数默认为启用(true)
 *      method: 'post' // 请求方式，post\get
 *      data: {}, // 参数
 * }
 * request(option)
 .then(data => {
                console.log('then', data);
            })
 .catch(data => {
                console.log('catch', data);
            });
 */

import axios from 'axios';
import config from './config';
import { MessageBox } from 'element-ui';
import { Loading } from 'element-ui';

const request = {
    get: option => {
        const url = option.url;
        const originalData = option.param || {};

        let isLoading = true;
        if (option.isLoading != undefined) {
            isLoading = option.isLoading;
        }

        let params = {};
        for (const key in originalData) {
            if (
                originalData[ key ] !== null &&
                originalData[ key ] !== undefined &&
                originalData[ key ] !== ''
            ) {
                params[ key ] = originalData[ key ];
            }
        }

        //调用loading
        let loadingInstance = null;
        if (isLoading) {
            loadingInstance = Loading.service({ fullscreen: true });
        }

        return axios({ url, params: { ...params }, method: 'get', withCredentials: true })
            .then(res => {
                if (isLoading && loadingInstance != null) {
                    //请求成功之后关闭loading
                    loadingInstance.close()
                }
                const resData = res.data;
                if (resData === '') {
                    // 未登录
                    // location.href = 'https://passport.ksyun.com/?callback=' + encodeURIComponent(location.href);
                } else if (resData.header && resData.header.errNo === 200) {
                    return resData.body || {};
                } else {
                    throw resData;
                }
            })
            .catch(res => {
                if (isLoading && loadingInstance != null) {
                    //请求成功之后关闭loading
                    loadingInstance.close()
                }
                throw res;
            });
    },
    post: option => {
        const url = option.url;
        const originalData = option.param || {};

        let isLoading = true;
        if (option.isLoading != undefined) {
            isLoading = option.isLoading;
        }

        let data = {};
        for (const key in originalData) {
            if (
                originalData[ key ] !== null &&
                originalData[ key ] !== undefined &&
                originalData[ key ] !== ''
            ) {
                data[ key ] = originalData[ key ];
            }
        }

        //调用loading
        let loadingInstance = null;
        if (isLoading) {
            loadingInstance = Loading.service({ fullscreen: true });
        }

        return axios({ url, data: { ...data }, method: 'post', withCredentials: true })
            .then(res => {

                if (isLoading && loadingInstance != null) {
                    //请求成功之后关闭loading
                    loadingInstance.close()
                }

                const resData = res.data || {};
                const header = resData.header;
                if (header) {
                    if (header.errNo === 200) {
                        return resData.body || {};
                    } else if (header.errNo === 402 || header.errNo === 405) {
                        // 402无效token，405token为空，请重新登录
                        const href = encodeURIComponent(location.href);
                        location.href = `${config.passportUrl}?refer=${href}`;
                    } else {
                        throw resData;
                    }
                } else {
                    console.log('request status:', res.status);
                    throw resData;
                }
            })
            .catch(res => {
                const { header = {} } = res;
                const { errMsg, errNo } = header;
                MessageBox.alert(errMsg || "服务端异常", '提示', {
                    type: 'warning',
                    showClose: false,
                    confirmButtonText: '知道了',
                    callback: action => {
                        if (errNo == 4051) {
                            location.href = "/logout";
                        }
                    }
                });
                if (isLoading && loadingInstance != null) {
                    //请求成功之后关闭loading
                    loadingInstance.close()
                }
                throw res;
            });
    }
};
export default request;
