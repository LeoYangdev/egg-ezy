<?php
namespace app\controller;

use app\BaseController;
use think\facade\Config;
use think\facade\Request;
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

class Car extends BaseController
{
    /*
     * 获取七牛云上传凭证Token
     * 官网：https://www.qiniu.com/
     */
    public function getUptoken()
    {
        $accessKey = Config::get('qiniu.access_key');
        $secretKey = Config::get('qiniu.secret_key');
        $bucket = Config::get('qiniu.bucket');

        // 生成上传Token
        $auth = new Auth($accessKey, $secretKey);
        $upToken['uptoken'] = $auth->uploadToken($bucket);

        return json($upToken);
    }
}
