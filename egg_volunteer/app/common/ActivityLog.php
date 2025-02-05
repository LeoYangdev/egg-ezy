<?php
namespace app\common;
use think\facade\Db;

class ActivityLog
{
    const OPERATION_TYPE_AUDIT = 1;
    const OPERATION_TYPE_USER = 2;
    const OPERATION_TYPE_ACTIVITY = 3;
    const OPERATION_TYPE_OTHER = 4;

    // 记录日志
    public static function log($operatorId, $operationType, $operationContent, $relatedId=null)
    {
        // 获取当前时间
        $operationTime = date('Y-m-d H:i:s');

        // 插入日志数据
        Db::name('activity_log')->insert([
            'operator_id' => $operatorId,
            'related_id' => $relatedId,
            'operation_time' => $operationTime,
            'operation_type' => $operationType,
            'operation_content' => $operationContent,
        ]);
    }

    // 查询日志
    public static function getLogs($operatorId = null, $operationType = null, $startDate = null, $endDate = null)
    {
        $query = Db::name('activity_logs');

        // 添加条件
        if ($operatorId !== null) {
            $query->where('operator_id', $operatorId);
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