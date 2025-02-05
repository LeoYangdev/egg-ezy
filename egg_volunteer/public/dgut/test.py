#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2024/5/15 0:30
# @Author  : Shenghao Yang
# @FileName: test.py.py
# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2023/9/21 23:47
# @Author  : Shenghao Yang
# @FileName: order_main.py
from dgut import DgutUser, AuthError
import argparse

class DgutXgxt(DgutUser):
    AUTH_URL = "https://sa.dgut.edu.cn"

    def __init__(self, username: str, password: str, timeout: int = 30):
        super().__init__(username, password, timeout)
        self.session.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                          ' Chrome/87.0.4280.141 Safari/537.36'
        }
        self.header = {
            "Referer": "https://sa.dgut.edu.cn/sahWeb/sys/casLogin.do",
            'Content-Type': 'application/json'
        }

    def set_authorization(self):
        """设置authorization"""
        self.login()
        self.is_authenticated = True
        res = self._auth()

    # 该应用仅需token，请求支付接口即可
    def _auth(self):
        resp = self.session.get("https://sa.dgut.edu.cn/sahWeb/sys/casLogin.do", allow_redirects=False)
        # 重定向获取token
        for _ in range(4):
            redir = resp.headers.get("Location")
            resp = self.session.get(redir, allow_redirects=False)

        return 0

    def test(self):
        resp = self.session.get("https://sa.dgut.edu.cn/sahWeb/affairs/hall/sms/basicinfo/getbasicInfo.do",
                                headers=self.header)
        return resp.json()

    def run(self):
        """ 函数入口 """
        self.set_authorization()
        print(self.test())


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--userid', help='用户名', default='201121202')
    parser.add_argument('-p', '--origin_password', help='密码', default='123456')
    args = parser.parse_args()
    u = DgutXgxt(args.userid, args.origin_password)
    u.run()
