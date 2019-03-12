// 引入mockjs
const Mock = require('mockjs');
import {order,user} from '@/api/api.js'
import {setCookie} from '@/lib/index.js'
import md5 from 'js-md5' 
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }

    return {
        articles: articles
    }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);

Mock.mock(/order.list/, 'post', {
  errCode: 1,
  count: 20,
  resultList: [{
    id: 1,
    groupName: '工会一',
    groupCode: 'XH20081205',
    truename: 'pany',
    contactPhone: '18330293029',
    createTime: 1535940167000,
    groupStatus: 4,
    groupStatusString: '待审核'
  }]
})
Mock.mock(/order.list/, 'get', {
    errCode: 1,
    count: 20,
    result: {
      id: 1,
      groupName: '工会一',
      groupCode: 'XH20081205',
      truename: 'pany',
      contactPhone: '18330293029',
      createTime: 1535940167000,
      groupStatus: 4,
      groupStatusString: '待审核'
    }
  })

Mock.mock(/order.verify/, 'post', {
  errCode: 1,
  errMess: '成功'
})

//用户登陆数据操作中心
// 白名单
const whiterUsers = [
  {
    name: 'panyang',
    pass: 'p123'
  }
]
// 有效的token集合
const tokenList = {};

// 判定用户信息方法
function isUserPass(obj) {
  for(let i in whiterUsers) {
    if(whiterUsers[i].name == obj.name && whiterUsers[i].pass == obj.pass) {
      return true
    }
    return false
  }
}
Mock.mock(/user.login/, 'post', (options)=> {
  const reg = JSON.parse(options.body || {})
  const isPass = isUserPass(reg)
  if(isPass) {
    const token = md5(reg.name+reg.pass)
    tokenList[reg.name] = token
    setCookie('token',token, 3)
    return {
      errCode: 1,
      errMess: '成功'
    }
  }else {
    return {
      errCode: 0,
      errMess: '用户名或者密码错误'
    }
  }
  
})

function getQueryString(name,url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = url.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

Mock.mock(/user.info/, 'get', (options)=> {
  let index = options.url.indexOf("?");
  let optStr = options.url.substring(index+1,options.url.length);
  let isToken = getQueryString('token',optStr)
  if(isToken == null) {
    return {
      errCode: 2,
      errMess: '登陆失效，请重新登陆'
    }
  }else {
    return {
      errCode: 1,
      errMess: '成功',
      result: {
        userName: 'panyang'
      }
    }
  } 
})