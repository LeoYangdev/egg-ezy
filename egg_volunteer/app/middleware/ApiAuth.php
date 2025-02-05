<?php
declare (strict_types = 1);

namespace app\middleware;

use app\service\AuthService;
use think\Response;

class ApiAuth
{
    /**
     * 处理请求
     *
     * @param \think\Request $request
     * @param \Closure       $next
     * @return Response
     */
    public function handle($request, \Closure $next)
    {
        // 获取 token
        $token = $request->header('Authorization');
        if (empty($token)) {
            return fail(401,'未提供有效token');
        }
        // 验证token
        $authService = new AuthService();
        $res = $authService->verifyToken($token);
        // 公共接口，只需要token有效就可以
        if ($res['code']!=200){
            return fail(401,'无效token或过期token');
        }
        // 解码token 并把 id放到request里面去
        $request->auth  = $res['data'][0]['userInfo'];
        if ($request->auth['status'] == -1){
            return fail(402,"用户已被禁用");
        }
        // todo::校验权限


        return $next($request);
    }
}
