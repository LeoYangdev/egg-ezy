<?php
declare (strict_types=1);

namespace app\controller;


use app\model\User as UserModel;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use think\Request;
use app\service\AuthService;

class Login
{
    /**
     * 登录触发入口
     * @param Request $request
     * @return \think\Response|\think\response\Json
     */
    public function index(Request $request){
        $code = $request->get('code');
        if (!isset($code)){
            return fail(1003,'code missing');
        }
        $res = $this->wechatVerify($code);
        // todo: 更新数据
        // $res['code'] = 200;
        // $res['openid'] = 'orce068VKfT0bpqH_WIXK1WvWDY8';
        if ($res['code'] == 200){
            $data['token'] = $this->getToken($res['openid']);
            return egg_response($data);
        } else {
            return json($res);
        }
    }

    /**
     * 微信后端请求验证
     * @param string $code
     * @return array|mixed
     */
    public function wechatVerify(string $code)
    {
        $request_url = "https://api.weixin.qq.com/sns/jscode2session?appid=xx&secret=xxx&js_code=" . $code . "&grant_type=authorization_code";
        try {
            $client = new  Client ();
            $res = $client->request('GET', $request_url, [
                'verify' => root_path() . '/cacert.pem',
                'headers' => [
                    'Accept' => 'application/json',
                ]
            ]);
            $res_body = (string)$res->getBody();
            $res_json = json_decode($res_body, true);

            if (isset($res_json['errcode'])){
                return ['code' => 1001, 'msg' => '微信服务返回错误码'.$res_json['errcode']];
            }

            $res_json['code'] = 200;

            return $res_json;
        } catch (GuzzleException $e) {
            return ['code' => 1002, 'msg' => '请求微信服务器错误..'];
        }
    }

    function getToken($oid): string
    {
        $user = new UserModel();
        $userinfo = $user->getUserIdByWxid($oid);
        $auth = new AuthService();
        return $auth->createToken($userinfo);
    }



}
