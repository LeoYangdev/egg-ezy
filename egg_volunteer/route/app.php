<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

Route::get('think', function () {
    return 'hello,ThinkPHP6!';
});

Route::get('hello/:name', 'index/hello');

// 公共接口验证token
Route::get('index', 'index')->middleware('ApiAuth');
Route::get('activity', 'Activity/index')->middleware('ApiAuth');



Route::get('api/active/search', 'Activity/searchKey');
Route::get('api/work/search', 'Work/searchKey');
// 用户活动相关接口
Route::get("api/activity/check", 'UserSign/canSign')->middleware('ApiAuth');
Route::get("api/work/check", 'UserWorkSign/canSign')->middleware('ApiAuth');
Route::post("api/activity/sign", 'UserSign/sign')->middleware('ApiAuth');
Route::post("api/work/sign", 'UserWorkSign/sign')->middleware('ApiAuth');
Route::get("api/activity/sign/cancel", 'UserSign/cancelSign')->middleware('ApiAuth');
Route::get("api/work/sign/cancel", 'UserWorkSign/cancelSign')->middleware('ApiAuth');
// 活动统计
Route::get('api/total/activity/index', 'TotalActivity/index')->middleware('ApiAuth');
Route::get('api/total/work/index', 'TotalWork/index')->middleware('ApiAuth');
Route::get('api/total/activity/search', 'TotalActivity/searchKey')->middleware('ApiAuth');
Route::get('api/total/work/search', 'TotalWork/searchKey')->middleware('ApiAuth');

// 我的活动列表
Route::get("api/user/activity/myactivity", 'UserActivity/index')->middleware('ApiAuth');
Route::get("api/user/work/myactivity", 'UserWork/index')->middleware('ApiAuth');
Route::get("api/user/activity/search", 'UserActivity/searchKey')->middleware('ApiAuth');
Route::get("api/user/work/search", 'UserWork/searchKey')->middleware('ApiAuth');

// 扫码签到
Route::get('api/user/activity/codesign', 'UserSign/codeDecode')->middleware('ApiAuth');

// 七牛服务
Route::get('qiniu/getuptoken', 'Car/getUptoken')->middleware('ApiAuth');

// 用户中心路由
Route::get('api/user/getuserinfo', 'UserInfo/detail')->middleware('ApiAuth');
Route::get('api/user/depart', 'UserInfo/departInfo');
Route::post('api/user/update', 'UserInfo/updateUserInfo')->middleware('ApiAuth');
Route::post('api/user/dgut/auth', 'DgutAuth/updateDguter')->middleware('ApiAuth');


// 用户反馈相关路由
Route::group('api/user/feedback', function () {
    // 添加用户反馈
    Route::post('add', 'Feedback/addFeedback');
    // 删除用户反馈
    Route::delete('delete', 'Feedback/deleteFeedback');
    // 修改用户反馈
    Route::post('handle', 'Feedback/updateFeedback');
    // 查询用户反馈
    Route::get('list', 'Feedback/getFeedback');
    Route::get('detail', 'Feedback/getFeedbackDetail');
    Route::get('adminlist', 'Feedback/getAdminFeedbackList');
})->middleware('ApiAuth');


// 后台管理组接口
Route::post('api/admin/activity/post', 'admin.ActivityManage/postActivity')->middleware('ApiAuth');
Route::post('api/admin/work/post', 'admin.WorkManage/postWork')->middleware('ApiAuth');
Route::post('api/admin/activity/update', 'admin.ActivityManage/updateActivity')->middleware('ApiAuth');
Route::post('api/admin/work/update', 'admin.WorkManage/updateWork')->middleware('ApiAuth');
Route::delete('api/admin/activity/delete', 'admin.ActivityManage/deleteActivity')->middleware('ApiAuth');
Route::delete('api/admin/work/delete', 'admin.WorkManage/deleteWork')->middleware('ApiAuth');
Route::get('api/admin/activity/search', 'admin.ActivityManage/getActivityInfo')->middleware('ApiAuth');
Route::get('api/admin/work/search', 'admin.WorkManage/getWorkInfo')->middleware('ApiAuth');
Route::get('api/admin/activity/qrcode', 'admin.ActivityManage/codeGenerate')->middleware('ApiAuth');
Route::get('api/user/activity/checkin', 'admin.ActivityManage/signIn')->middleware('ApiAuth');
Route::get('api/user/activity/checkout', 'admin.ActivityManage/signOut')->middleware('ApiAuth');
Route::get('api/user/activity/signlist', 'admin.ActivityManage/signUserList')->middleware('ApiAuth');
Route::get('api/user/work/signlist', 'admin.WorkManage/signUserList')->middleware('ApiAuth');

// 文章管理
Route::post('api/admin/article/post', 'admin.ArticleManage/post')->middleware('ApiAuth');
Route::post('api/admin/article/update', 'admin.ArticleManage/update')->middleware('ApiAuth');
Route::delete('api/admin/article/delete', 'admin.ArticleManage/delete')->middleware('ApiAuth');
// 用户端，文章接口
Route::get('api/user/article/list', 'Article/getArticleList')->middleware('ApiAuth');
Route::get('api/user/article/detail', 'Article/getArticleInfo')->middleware('ApiAuth');
Route::get('api/user/article/like', 'Article/like')->middleware('ApiAuth');

// 通知管理
Route::post('api/admin/annouce/post', 'admin.AnnouceManage/post')->middleware('ApiAuth');
Route::post('api/admin/annouce/update', 'admin.AnnouceManage/update')->middleware('ApiAuth');
Route::delete('api/admin/annouce/delete', 'admin.AnnouceManage/delete')->middleware('ApiAuth');
// 用户端，通知接口
Route::get('api/user/annouce/list', 'Annouce/getAnnouceList')->middleware('ApiAuth');
Route::get('api/user/annouce/detail', 'Annouce/getAnnouceInfo')->middleware('ApiAuth');
Route::get('api/user/annouce/read', 'Annouce/read')->middleware('ApiAuth');
Route::get('api/user/approval/message', 'ApprovalMessage/getApproval')->middleware('ApiAuth');


// 部门管理接口
Route::get('api/admin/department/list', 'admin.DepartmentManage/departmentInfo')->middleware('ApiAuth');
Route::post('api/admin/department/add', 'admin.DepartmentManage/addDepartment')->middleware('ApiAuth');
Route::delete('api/admin/department/delete', 'admin.DepartmentManage/deleteDepartment')->middleware('ApiAuth');
Route::post('api/admin/department/update', 'admin.DepartmentManage/updateDepartment')->middleware('ApiAuth');
Route::get('api/admin/department/user', 'admin.DepartmentManage/getDepartmentUser')->middleware('ApiAuth');

// 用户管理接口
Route::get('api/admin/user/list', 'admin.Usermanage/getUserList')->middleware('ApiAuth');
Route::get('api/admin/user/search', 'admin.Usermanage/searchUser')->middleware('ApiAuth');
Route::post('api/admin/user/update', 'admin.Usermanage/updateUserInfo')->middleware('ApiAuth');
Route::get('api/admin/user/getuserinfo', 'admin.Usermanage/detail')->middleware('ApiAuth');
Route::get('api/admin/user/status', 'admin.Usermanage/toggleUserStatus')->middleware('ApiAuth');

// 部门管理接口
Route::get('api/admin/admin/list', 'admin.AdminManage/getAdminList')->middleware('ApiAuth');
Route::get('api/admin/admin/search', 'admin.AdminManage/searchAdmin')->middleware('ApiAuth');
Route::post('api/admin/admin/add', 'admin.AdminManage/addAdmin')->middleware('ApiAuth');
Route::post('api/admin/admin/delete', 'admin.AdminManage/deleteAdmin')->middleware('ApiAuth');

// 消息列表接口
Route::post('api/admin/message/add', 'admin.MessageManage/addMessage')->middleware('ApiAuth');
Route::get('api/user/message/list', 'admin.MessageManage/getMessage')->middleware('ApiAuth');
Route::get('api/user/message/detail', 'admin.MessageManage/getMessageDetail')->middleware('ApiAuth');
Route::get('api/user/message/read', 'admin.MessageManage/readMessage')->middleware('ApiAuth');


// 审核列表接口
Route::get('api/admin/activity/signlist', 'admin.ActivityApproval/getUserSignUser')->middleware('ApiAuth');
Route::get('api/admin/work/signlist', 'admin.WorkApproval/getUserSignUser')->middleware('ApiAuth');
Route::post('api/admin/activity/approval', 'admin.ActivityApproval/approval')->middleware('ApiAuth');
Route::post('api/admin/work/approval', 'admin.WorkApproval/approval')->middleware('ApiAuth');

// 下载接口
Route::get('generate-user-profile-excel', 'admin.CreditConvert/generateUserProfileExcel');
Route::get('download-excel/:filename', 'admin.CreditConvert/downloadAndDelete');

// 日志接口
Route::get('api/admin/syslog/get', 'admin.LogManage/getSysLog')->middleware('ApiAuth');
Route::get('api/admin/syslog/search', 'admin.LogManage/searchSysLog')->middleware('ApiAuth');
Route::get('api/admin/actlog/get', 'admin.LogManage/getActivityLog')->middleware('ApiAuth');
Route::get('api/admin/actlog/search', 'admin.LogManage/searchActivityLog')->middleware('ApiAuth');
