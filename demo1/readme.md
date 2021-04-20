# node.js 服务端爬虫

## 安装

```
npm i
```


## 详情

1. 项目的目的是爬取[武大计院官网教师信息](http://cs.whu.edu.cn/teacher.aspx?showtype=jobtitle&typename=%e6%95%99%e6%8e%88)，如下：

   ![image-20210420223207391](C:\Users\RKK\AppData\Roaming\Typora\typora-user-images\image-20210420223207391.png)

2. 爬虫原理与实现：

   爬虫，即爬取网页信息的工具，写一个简单的爬虫需要满足条件：

   * 网络请求目标网页，项目使用的是request，见代码`get.js`
   * 处理返回的数据，项目使用的是cheerio，见`get.js`
   * 数据存储，见`exportCsv.js`

3. 项目依赖:

   * [cheerio](https://www.jianshu.com/p/629a81b4e013): cheerio是jquery核心功能的一个快速灵活而又简洁的实现，用在服务器端对DOM进行操作，用法与jQuery类似
   * [urlencode](): 因为爬取内容的目标网站url含有中文，所以需要将中文转为url编码，利用urlencode可实现
   * request: 发送请求

4. 其他说明：

   * `/tmp`文件夹存储爬取导出的数据
   * `/test`文件夹存放的是测试代码，其中`1.js`测试导出txt文件，`2.js`和`3.js`测试导出csv文件
