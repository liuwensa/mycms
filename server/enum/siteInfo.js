/**
 * Created by admin on 2017/3/13.
 */

'use strict';

// 站点基础信息配置
module.exports = {
  SITETITLE        : '前端开发俱乐部', // 站点名称
  SITEDOMAIN       : 'http://www.html-js.cn', // 站点域名
  SITEICP          : '粤ICP备15038960号-2', // 站点备案号
  SITEVERSION      : 'v1.1.1', // 静态资源版本戳
  SYSTEMMAIL       : 'doramart@qq.com', // 管理员个人邮箱
  UPDATEFOLDER     : process.cwd() + '/public/upload', // 默认上传文件夹本地路径
  TEMPSTATICFOLDER : process.cwd() + '/public/themes/', // 模板静态文件路径
  DATAOPERATION    : process.cwd() + '/models/db/bat', //数据库操作脚本目录
  DATABACKFORDER   : 'C:/softbak/mongodbConfig/mongodata/', // 服务端数据备份目录
  MONGODBEVNPATH   : '/usr/local/mongodb/bin', // LINUXmongodb环境变量(win server下不用管)
  SYSTEMTEMPFORDER : process.cwd() + '/views/web/temp/', // 系统模板安装目录
  DORACMSAPI       : 'http://api.html-js.cn', // 系统服务提供商
  CMSDISCRIPTION   : '前端开发俱乐部,分享前端知识,丰富前端技能。汇集国内专业的前端开发文档,为推动业内前端开发水平共同奋斗。html,js,css,nodejs,前端开发,jquery,web前端, web前端开发, 前端开发工程师',
  SITEKEYWORDS     : '前端开发俱乐部,前端俱乐部,DoraCMS,Nodejs内容管理系统, 前端开发, web前端, 前端开发工程师,前端资源, angularjs, 前端开发工具, nodejs ,boostrap',
  SITEBASICKEYWORDS: '前端开发俱乐部,前端开发,前端俱乐部,DoraCMS', // 基础关键词


  SYSTEMMANAGE  : ['sysTemManage', 'DoraCMS后台管理'],  // 后台模块(系统管理)
  adminUsersList: ['sysTemManage_user', '系统用户管理'],
  adminGroupList: ['sysTemManage_uGroup', '系统用户组管理'],
  adsList       : ['sysTemManage_ads', '广告管理'],
  filesList     : ['sysTemManage_files', '文件管理'],
  DATAMANAGE    : ['sysTemManage_data', '数据管理'], // 数据管理
  backUpData    : ['sysTemManage_data_1', '数据备份'], // 数据备份
  systemLogs    : ['sysTemManage_logs', '操作日志'], // 系统操作日志


  CONTENTMANAGE        : ['contentManage', '内容管理'], // 后台模块(内容管理)
  contentList          : ['contentManage_content', '文档管理'],
  contentCategorys     : ['contentManage_cateGory', '文档类别管理'],
  contentTags          : ['contentManage_tag', '文档标签管理'], //标签管理
  CONTENTTEMPSMANAGE   : ['contentManage_temp', '文档模板管理'], //模板管理
  contentTemps         : ['contentManage_temp_1', '模板配置'], //模板管理
  contentTempsEdit     : ['contentManage_temp_2', '模板编辑'], //模板管理
  CONTENTTEMPITEMS     : ['contentManage_tpItem', '文档模板单元管理'], //模板单元管理
  messageList          : ['contentManage_msg', '留言管理'], // 留言管理
  NOTICEMANAGE         : ['contentManage_notice', '消息管理'], // 消息管理
  systemNotice         : ['contentManage_notice_1', '公告管理'], // 公告管理
  userNotice           : ['contentManage_notice_2', '用户消息'], // 用户消息
  sysTemBackStageNotice: ['contentManage_notice_3', '系统消息'], // 系统消息


  USERMANAGE  : ['userManage', '会员管理'], // 后台模块(会员管理)
  regUsersList: ['userManage_user', '注册用户管理'],
};