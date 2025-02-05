<?php

namespace app\common;
use think\facade\Db;

class SystemLog
{
    const OPERATION_TYPE_CREATE = 1;
    const OPERATION_TYPE_UPDATE = 2;
    const OPERATION_TYPE_DELETE = 3;

    // 记录日志
    public static function log($userId, $operationType, $operationDesc, $relatedId = null)
    {
        // 获取当前时间
        $operationTime = date('Y-m-d H:i:s');

        // 插入日志数据
        Db::name('system_log')->insert([
            'user_id' => $userId,
            'operation_time' => $operationTime,
            'operation_type' => $operationType,
            'operation_desc' => $operationDesc,
            'related_id' => $relatedId,
        ]);
    }

    // 查询日志
    public static function getLogs($userId = null, $operationType = null, $startDate = null, $endDate = null)
    {
        $query = Db::name('system_log');

        // 添加条件
        if ($userId !== null) {
            $query->where('user_id', $userId);
        }
        if ($operationType !== null) {
            $query->where('operation_type', $operationType);
        }
        if ($startDate !== null) {
            $query->where('operation_time', '>=', $startDate);
        }
        if ($endDate !== null) {
            $query->where('operation_time', '<=', $endDate);
        }

        // 查询并返回结果
        return $query->select();
    }
}

