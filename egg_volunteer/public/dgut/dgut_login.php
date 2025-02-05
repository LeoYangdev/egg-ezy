<?php

class dgutuser{
    public $username;
    public $password;
    public $aes_key;
    public $aes_password;
    // 构造函数获取登录用户
    function __construct($username,$password){
        $this->username = $username;
        $this->password = $password;
    }
    function login_session(){
        $login_url = "https://auth.dgut.edu.cn/authserver/login";  //登录页面地址
        $cookie_file = dirname(__FILE__) . "/pic.cookie";  //cookie文件存放位置（自定义）
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $login_url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,60);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35';
        curl_setopt($ch, CURLOPT_USERAGENT, $UserAgent);
        $data = curl_exec($ch);
        curl_close($ch);
        // 1. 获取pwdEncryptSalt(AES key)和execution
        
        preg_match_all('~id="_eventId".*?value="(.*?)".*?~',$data,$_eventId);
        preg_match_all('~id="cllt".*?value="(.*?)".*?~',$data,$cllt);
        preg_match_all('~id="dllt".*?value="(.*?)".*?~',$data,$dllt);
        preg_match_all('~id="lt".*?value="(.*?)".*?~',$data,$lt);
        preg_match_all('~id="pwdEncryptSalt".*?value="(.*?)".*?~',$data,$pwdEncryptSalt);
        preg_match_all('~id="execution".*?value="(.*?)"~',$data,$execution);

        $_eventId = $_eventId[1][0];
        $cllt = $cllt[1][2];
        $dllt = $dllt[1][0];
        $lt = $lt[1][0];
        $execution = $execution[1][0];

        $this->aes_key = utf8_encode($pwdEncryptSalt[1][0]);

        # 2. 生成加密密码
        // var_dump(openssl_get_cipher_methods());

        $pwdstr = utf8_encode($this->randStr(64)).$this->password;
        $encrypted = openssl_encrypt($pwdstr,"aes-128-cbc",$this->aes_key, 1, utf8_encode($this->randStr(16)));
        $this->aes_password = base64_encode($encrypted);


        # 3、发送登录请求
        //post表单
        $post = array(
            "username"=>$this->username,
            "password"=>$this->aes_password,  # base64密码
            "execution"=>$execution,
            "captcha"=>'',
            "_eventId"=>$_eventId,
            "cllt"=>$cllt,
            "dllt"=>$dllt,
            "lt"=>$lt,
        );
        //cookie
        $cookies = $this->readcookie();
        $header = array(
            "Host:auth.dgut.edu.cn",
            "Origin:https://auth.dgut.edu.cn",
            "Referer:https://auth.dgut.edu.cn/authserver/login",
            "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35",
            "Cookie:route=".$cookies['route']."; JSESSIONID=".$cookies['jsID']."; "."org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=zh_CN",
        );

        $conn = curl_init();
        curl_setopt($conn, CURLOPT_URL, "https://auth.dgut.edu.cn/authserver/login");
        // curl_setopt($conn,CURLOPT_FOLLOWLOCATION,1);
        curl_setopt($conn,CURLOPT_POST,1);
        curl_setopt($conn, CURLOPT_HTTPHEADER, $header);
        // curl_setopt($conn, CURLOPT_COOKIE, $cookie_file);
        curl_setopt($conn,CURLOPT_POSTFIELDS,http_build_query($post));
        curl_setopt($conn, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($conn,CURLOPT_CONNECTTIMEOUT,60);
        curl_setopt($conn, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($conn, CURLOPT_SSL_VERIFYHOST, false);
        
        curl_exec($conn);

        $rescode = curl_getinfo($conn)['http_code'];

        if($rescode == 302){
            return 1;
        }else{
            return 0;
        }

        curl_close($conn);
    }
    /**
     * 从文件中读出cookie
     */
    function readcookie(){
        $filename = "pic.cookie";
        $f = fopen($filename,'r');
        $content = fread($f,filesize($filename));
        $data = array(
            "jsID"=>'',
            "route"=>''
        );
        preg_match_all('~JSESSIONID	(.*?)\n~',$content,$jsID,2);
        preg_match_all('~route	(.*?)\n~',$content,$route,2);
        $data['jsID'] = trim($jsID[0][1]);
        $data['route'] = trim($route[0][1]);
        return $data;
    }
    /**
     * 随机字符串
     * @param $length
     * @return string
     */
    function randStr($length){
        $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        $string = '';
        for ($i = 0; $i < $length; $i++) {
            $string .= $chars[mt_rand(0, strlen($chars) - 1)];
        }
        return $string;
    }
}

// $obj = new dgutuser("xxxxx","xxxxx");
// echo $obj->login_session();

?>

