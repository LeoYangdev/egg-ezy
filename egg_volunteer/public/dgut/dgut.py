#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2023/7/29 16:45
# @Author  : Shenghao Yang
# @FileName: dgut.py
# coding=utf-8
import json.decoder
from typing import Any, NoReturn, Callable
import re
from functools import wraps
import base64
from random import choices

import requests
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES


__all__ = [
    "validate_type",
    "LoginError", "AuthError", "ObjectTypeError", "GetAesKeyError", "AESEncryptError",
    "DgutUser", "dgutUser",
]


def validate_type(obj: Any, type_: type) -> NoReturn:
    """
    类型校验器

    :param obj: 被检查的对象
    :param type_: 被检查对象应属于的类型
    :return: None or except
    """
    if not isinstance(type_, type):
        raise TypeError(f"参数type_必须是type类型，而不能是{type(type_)}类型")
    if not isinstance(obj, type_):
        raise ObjectTypeError(f"校验失败，输入数据应该是{type_}类型，而不是{type(obj)}类型")


class DgutUser(object):
    """莞工用户类"""

    LOGIN_URL = "https://auth.dgut.edu.cn/authserver/login"  # 登录URL
    AUTH_URL = ""  # 认证URL

    def __init__(self, username: str, password: str, timeout: int = 30) -> None:
        """
        :param username: 中央认证账号
        :param password: 中央认证密码
        :return: None
        """
        validate_type(username, str)
        validate_type(password, str)
        validate_type(timeout, int)

        self.username = username
        self.__password = password
        self._aes_key = None  # aes key of bytes
        self._aes_password = None  # aes password by aes key encrypt
        self.is_authenticated = False

        # 创建一个会话
        self.session = requests.Session()
        # 设置请求超时时间
        self.timeout = timeout

        self.session.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        }

    def login(self) -> requests.Response:
        """
        登录

        :return: requests.Response
        """
        headers = {
            "Host": "auth.dgut.edu.cn",
            "Origin": "https://auth.dgut.edu.cn",
            "Referer": "https://auth.dgut.edu.cn/authserver/login",
        }
        # 1. 获取pwdEncryptSalt(AES key)和execution
        resp = self.session.get(self.LOGIN_URL, headers=headers, timeout=self.timeout)
        try:
            regex = r'id="_eventId".*?value="(.*?)".*?' \
                    r'id="cllt".*?value="(.*?)".*?' \
                    r'id="dllt".*?value="(.*?)".*?' \
                    r'id="lt".*?value="(.*?)".*?' \
                    r'id="pwdEncryptSalt".*?value="(.*?)".*?' \
                    r'id="execution".*?value="(.*?)"'
            _eventId, cllt, dllt, lt, pwd_encrypt_salt, execution = re.search(regex, resp.text).groups()
        except AttributeError as e:
            raise GetAesKeyError() from e
        self._aes_key = pwd_encrypt_salt.encode("utf-8")

        # 2. 生成加密密码
        try:
            self._aes_password = self._encrypt(self.__password, self._aes_key)
        except (TypeError, ObjectTypeError, TypeError, ValueError) as e:
            raise AESEncryptError() from e

        # 3. 发送登录请求
        data = {
            "username": self.username,
            "password": base64.b64encode(self._aes_password).decode(),  # base64密码
            "execution": execution,
            "captcha": "",
            "_eventId": _eventId,
            "cllt": cllt,
            "dllt": dllt,
            "lt": lt,
        }
        resp = self.session.post(self.LOGIN_URL, data=data, headers=headers, timeout=self.timeout)
        if resp.status_code == 401:
            raise LoginError("账号或密码错误")
        if not (resp.ok and resp.history):
            raise LoginError("非预期的错误，登录失败")
        return resp

    @staticmethod
    def _encrypt(text: str, key: bytes) -> bytes:
        """
        AES 128位CBC模式加密，使用pkcs7填充。iv随机生成

        :param text: 明文
        :param key: 密钥
        :return: bytes密文
        """
        validate_type(text, str)
        validate_type(key, bytes)

        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
        password = pad(
            "".join(choices(chars, k=64)).encode("utf-8") + text.encode("utf-8"),
            AES.block_size,
            'pkcs7'
        )
        iv = "".join(choices(chars, k=16)).encode("utf-8")
        aes = AES.new(key, AES.MODE_CBC, iv)
        return aes.encrypt(password)

    def _auth(self):
        """认证"""
        if not self.AUTH_URL:
            return
        resp = self.session.get(self.AUTH_URL, timeout=self.timeout)
        if not resp.ok:
            raise AuthError("认证失败")
        return resp

    @staticmethod
    def login_decorator(func: Callable) -> Callable:
        """
        登录装饰器

        :param func: Callable
        :return: Callable
        """

        @wraps(func)
        def wrapper(self, *args, **kwargs):
            if self.is_authenticated is False:
                self.login()
                self.is_authenticated = True
            self._auth()  # 认证
            return func(self, *args, **kwargs)

        return wrapper


class LoginError(Exception):
    """登录错误类"""

    def __init__(self, reason: str = None):
        super().__init__()
        self.reason = reason \
            if reason is not None \
            else "登录错误"

    def __str__(self):
        return self.reason


class AuthError(Exception):
    """认证错误类"""

    def __init__(self, reason: str = None):
        super().__init__()
        self.reason = reason \
            if reason is not None \
            else "认证失败"

    def __str__(self):
        return self.reason


class ObjectTypeError(TypeError):
    """对象类型错误"""

    def __init__(self, reason: str = None):
        super().__init__()
        self.reason = reason \
            if reason is not None \
            else "类型错误"

    def __str__(self):
        return self.reason


class GetAesKeyError(Exception):
    """获取AES密钥错误"""

    def __str__(self):
        return "获取AES加密密钥失败"


class AESEncryptError(Exception):
    """AES加密错误"""

    def __str__(self):
        return "AES加密错误"


dgutUser = DgutUser
