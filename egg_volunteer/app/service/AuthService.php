<?php
declare (strict_types=1);

namespace app\service;

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT as JWTUtil;
use Firebase\JWT\Key;

class AuthService
{
    protected $jwt_secret_key = 'S0002gZrn4uMg0Y';


    /**
     * 创建JWTtoken
     * @param array $user 用户数组
     * @param string $exptime 有效时间
     * @return string
     */
    function createToken($user = [], $exptime = 60 * 60 * 24): string
    {
        $key = md5($this->jwt_secret_key);
        $time = time();
        $expire = $time + $exptime;
        $token = array(
            'userInfo' => $user,
            'iss' => 'egg',
            'aud' => 'harder',
            'iat' => $time, // 签发时间
            'nbf' => $time,
            'exp' => $expire
        );
        $jwt = JWTUtil::encode($token, $key, 'HS256');
        return $jwt;
    }

    /**
     * 验证JWTtoken
     * @param $user
     * @return array
     */
    function verifyToken($token): array
    {
        $key = md5($this->jwt_secret_key);
        try {
            $jwtAuth = json_encode(JWTUtil::decode($token, new Key($key, 'HS256')));
            $authInfo = json_decode($jwtAuth, true);
            return ['code' => 200, 'msg' => 'token正常', 'data' => [$authInfo]];
        } catch (ExpiredException $e) {
            return ['code' => 401, 'msg' => 'token已过期', 'data' => []];
        } catch (\Exception $e) {
            return ['code' => 400, 'msg' => 'token错误', 'data' => []];
        }
    }

    function validateToken($token): bool
    {
        $key = md5($this->jwt_secret_key);
        try {
            $jwtAuth = json_encode(JWTUtil::decode($token, new Key($key, 'HS256')));
            $authInfo = json_decode($jwtAuth, true);
            return true;
        } catch (ExpiredException $e) {
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }
}
