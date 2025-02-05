<?php
namespace app\controller;

use app\BaseController;
use app\model\Approval;
use app\service\AuthService;
use think\facade\App;
use think\facade\Db;
use think\Response;
use app\model\User AS UserModel;

class Index extends BaseController
{
    public function index()
    {
        $model = new Approval();
        return egg_response($model->getUserApprovalMessage(104));
        // $user = new UserModel();
        // return json($user->getUserIdByWxid("ceshi1111023"));
        // $user = new AuthService();
        // return json($user->verifyToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX2lkIjoxLCJyb2xlIjoxLCJzdGF0dXMiOm51bGx9LCJpc3MiOiJlZ2ciLCJhdWQiOiJoYXJkZXIiLCJpYXQiOjE3MTU2NzU0MTgsIm5iZiI6MTcxNTY3NTQxOCwiZXhwIjoxNzE1NzYxODE4fQ.eSVgSVsZGUBvgL31WBxANI9--9eN6MOCvUdy1AiEX0c"));
        // return fail('4222','123123');
        // return '<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:) </h1><p> ThinkPHP V' . \think\facade\App::version() . '<br/><span style="font-size:30px;">16载初心不改 - 你值得信赖的PHP框架</span></p><span style="font-size:25px;">[ V6.0 版本由 <a href="https://www.yisu.com/" target="yisu">亿速云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="ee9b1aa918103c4fc"></think>';
    }

    public function hello($name = 'ThinkPHP6')
    {
        return 'hello,' . $name;
    }

    public function verify(){
        return json(Db::name('user')->select());
    }
}
