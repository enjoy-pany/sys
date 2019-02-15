// 引入mockjs
const Mock = require('mockjs');
import {order} from '@/api/api.js'
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
      contactPhone: '18330298065',
      createTime: 1535940167000,
      groupStatus: 4,
      groupStatusString: '待审核'
    }
  })

Mock.mock(/order.verify/, 'post', {
  errCode: 1,
  errMess: '成功'
})
