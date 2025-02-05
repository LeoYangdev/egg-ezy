<?php
namespace app\controller\admin;

use app\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use think\facade\Db;

class CreditConvert
{
    public function generateUserProfileExcel(Request $request)
    {
        $rate = $request->param('rate');
        // 查询 user_profile 数据
        $userProfiles = Db::name('user_profile')
            ->alias('u')
            ->leftJoin('department d', 'u.department_id = d.department_id')
            ->field(['u.user_id', 'u.name', 'u.volunteer_hours', 'd.department_name'])
            ->select();

        if (empty($userProfiles)) {
            return json(['message' => 'No data found.'], 404);
        }

        // 创建一个新的电子表格对象
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // 设置表头
        $sheet->setCellValue('A1', '用户ID');
        $sheet->setCellValue('B1', '姓名');
        $sheet->setCellValue('C1', '所属部门');
        $sheet->setCellValue('D1', '志愿时长');
        $sheet->setCellValue('E1', '学分');

        // 填充数据
        $row = 2; // 从第二行开始
        foreach ($userProfiles as $profile) {
            $sheet->setCellValue('A' . $row, $profile['user_id']);
            $sheet->setCellValue('B' . $row, $profile['name']);
            $sheet->setCellValue('C' . $row, $profile['department_name']);
            $sheet->setCellValue('D' . $row, $profile['volunteer_hours']);
            $sheet->setCellValue('E' . $row, $profile['volunteer_hours'] / $rate);
            $row++;
        }

        // 生成 Excel 文件
        $writer = new Xlsx($spreadsheet);
        $filename = 'credit_convert_' . time() . '.xlsx';
        $filePath = public_path() . 'uploads/' . $filename;
        $writer->save($filePath);

        // 提供下载链接
        $downloadLink = request()->domain() . '/download-excel/' . $filename;

        return json([
            'message' => 'Excel file generated successfully.',
            'download_link' => $downloadLink
        ]);
    }

    public function downloadAndDelete($filename)
    {
        $filePath = public_path() . 'uploads/' . $filename;

        if (!file_exists($filePath)) {
            return json(['message' => 'File not found.'], 404);
        }
        // 发送文件下载响应
        $response = download($filePath, $filename);

        // 使用 register_shutdown_function 注册一个在脚本执行完成后执行的回调函数来删除文件
        register_shutdown_function(function() use ($filePath) {
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        });

        return $response;
    }
}
