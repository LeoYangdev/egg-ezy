-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost:3306
-- 生成日期： 2024-05-18 23:53:15
-- 服务器版本： 5.6.51-log
-- PHP 版本： 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `egg`
--

-- --------------------------------------------------------

--
-- 表的结构 `egg_activity_log`
--

CREATE TABLE `egg_activity_log` (
  `log_id` int(11) NOT NULL COMMENT '日志ID',
  `operator_id` int(11) NOT NULL COMMENT '操作者ID',
  `related_id` int(11) DEFAULT NULL COMMENT '相关ID',
  `operation_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  `operation_type` int(11) NOT NULL COMMENT '操作类型',
  `operation_content` text COLLATE utf8_unicode_ci COMMENT '操作内容'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='活动日志表';

--
-- 转存表中的数据 `egg_activity_log`
--

INSERT INTO `egg_activity_log` (`log_id`, `operator_id`, `related_id`, `operation_time`, `operation_type`, `operation_content`) VALUES
(1, 1, NULL, '2024-05-16 01:07:21', 3, '生成签到/签退二维码1活动id1'),
(2, 1, NULL, '2024-05-16 12:36:30', 3, '生成签到/签退二维码2活动id1'),
(3, 1, NULL, '2024-05-16 12:48:20', 3, '发布活动科技中心讲解员志愿活动'),
(4, 1, NULL, '2024-05-16 14:44:35', 3, '发布活动计算机装机志愿活动'),
(5, 1, 5, '2024-05-16 14:45:41', 1, '审核活动报名1'),
(6, 1, NULL, '2024-05-16 14:50:43', 3, '生成签到/签退二维码1活动id10'),
(7, 1, NULL, '2024-05-16 14:59:19', 3, '发布工作学生活动中心助理240516'),
(8, 1, NULL, '2024-05-16 15:36:42', 3, '发布活动北门车辆管理志愿'),
(9, 1, NULL, '2024-05-16 16:44:33', 3, '生成签到/签退二维码2活动id10'),
(10, 1, NULL, '2024-05-16 16:55:44', 3, '更新活动10计算机装机志愿活动'),
(11, 1, NULL, '2024-05-16 16:57:02', 3, '生成签到/签退二维码1活动id10'),
(12, 1, NULL, '2024-05-16 16:58:09', 3, '生成签到/签退二维码1活动id10'),
(13, 1, NULL, '2024-05-16 17:15:04', 3, '生成签到/签退二维码1活动id10'),
(14, 1, NULL, '2024-05-16 17:15:06', 3, '生成签到/签退二维码2活动id10'),
(15, 1, NULL, '2024-05-16 17:17:41', 3, '生成签到/签退二维码1活动id10'),
(16, 1, NULL, '2024-05-16 17:17:43', 3, '生成签到/签退二维码2活动id10'),
(17, 1, NULL, '2024-05-16 17:18:53', 3, '生成签到/签退二维码1活动id10'),
(18, 1, NULL, '2024-05-16 17:18:54', 3, '生成签到/签退二维码2活动id10'),
(19, 1, NULL, '2024-05-16 23:05:40', 3, '生成签到/签退二维码1活动id10'),
(20, 1, NULL, '2024-05-17 08:43:56', 3, '发布活动图书馆摆书志愿活动'),
(21, 1, 6, '2024-05-17 08:44:33', 1, '审核活动报名1'),
(22, 1, NULL, '2024-05-17 08:44:54', 3, '生成签到/签退二维码2活动id12');

-- --------------------------------------------------------

--
-- 表的结构 `egg_announcement`
--

CREATE TABLE `egg_announcement` (
  `announcement_id` int(11) NOT NULL COMMENT '通知ID',
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '通知标题',
  `content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '通知内容',
  `author_id` int(11) NOT NULL COMMENT '作者',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
  `published_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `priority` int(11) NOT NULL COMMENT '优先级',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='公告表';

--
-- 转存表中的数据 `egg_announcement`
--

INSERT INTO `egg_announcement` (`announcement_id`, `title`, `content`, `author_id`, `status`, `published_time`, `priority`, `create_time`, `update_time`) VALUES
(2, '系统通知内容111', '你好，这是测试内容', 1, 0, '2024-05-15 21:16:53', 2, '2024-05-15 21:16:54', '2024-05-15 21:16:54'),
(3, '计算机学院志愿活动通知', '重要通知\n2024年东莞理工学院计算机与网络空间安全学院改名，所有原网安学院和原计科学院的学生均被归为，计算机科学技术学院，软件学院，网络空间安全学院。', 1, 0, '2024-05-16 15:11:24', 2, '2024-05-16 15:11:25', '2024-05-16 15:11:25');

-- --------------------------------------------------------

--
-- 表的结构 `egg_approval`
--

CREATE TABLE `egg_approval` (
  `approval_id` int(11) NOT NULL COMMENT '审核ID',
  `registration_id` int(11) NOT NULL COMMENT '报名ID',
  `activity_type` int(2) NOT NULL COMMENT '活动类型',
  `admin_id` int(11) NOT NULL COMMENT '管理员ID',
  `approval_result` int(11) NOT NULL COMMENT '审核结果(1表示通过，2表示拒绝)',
  `approval_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '审核时间',
  `remarks` text COLLATE utf8_unicode_ci COMMENT '备注信息',
  `is_notification_sent` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已发送通知'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='审核表';

--
-- 转存表中的数据 `egg_approval`
--

INSERT INTO `egg_approval` (`approval_id`, `registration_id`, `activity_type`, `admin_id`, `approval_result`, `approval_time`, `remarks`, `is_notification_sent`) VALUES
(2, 2, 1, 1, 1, '2024-05-12 15:28:36', 'hellow', 0),
(3, 2, 1, 1, 1, '2024-05-12 15:29:04', 'null', 0),
(4, 2, 1, 1, 1, '2024-05-12 15:39:09', 'null', 0),
(5, 2, 1, 1, 1, '2024-05-12 15:44:07', 'null', 0),
(6, 2, 1, 1, 2, '2024-05-12 15:46:33', 'null', 0),
(7, 2, 1, 1, 1, '2024-05-12 15:50:11', 'null', 0),
(8, 2, 1, 1, 2, '2024-05-12 16:17:27', 'null', 0),
(9, 2, 1, 1, 1, '2024-05-12 16:17:30', 'null', 0),
(10, 2, 1, 1, 1, '2024-05-12 16:19:32', 'null', 0),
(11, 2, 1, 1, 1, '2024-05-12 16:21:28', 'null', 0),
(12, 2, 1, 1, 1, '2024-05-12 16:23:55', 'null', 0),
(14, 3, 1, 1, 1, '2024-05-12 16:47:56', 'null', 0),
(17, 3, 2, 0, 0, '2024-05-12 18:26:26', NULL, 0),
(18, 3, 2, 1, 1, '2024-05-13 00:29:36', 'null', 0),
(19, 3, 2, 1, 2, '2024-05-13 00:30:09', 'null', 0),
(20, 3, 2, 1, 1, '2024-05-13 00:30:26', 'null', 0),
(21, 3, 2, 1, 1, '2024-05-13 00:37:52', 'null', 0),
(22, 3, 2, 1, 2, '2024-05-13 00:43:57', 'null', 0),
(23, 3, 2, 1, 1, '2024-05-13 00:44:14', 'null', 0),
(24, 3, 2, 1, 1, '2024-05-13 00:45:43', 'null', 0),
(25, 3, 2, 1, 2, '2024-05-13 00:45:51', 'null', 0),
(26, 3, 2, 1, 1, '2024-05-13 00:46:00', 'null', 0),
(27, 3, 2, 1, 2, '2024-05-13 00:46:05', 'null', 0),
(28, 3, 2, 1, 1, '2024-05-13 00:47:56', 'null', 0),
(29, 3, 2, 1, 2, '2024-05-13 00:48:22', '审核被撤销！', 0),
(30, 3, 2, 1, 1, '2024-05-13 00:48:55', 'null', 0),
(31, 3, 2, 1, 2, '2024-05-13 00:49:11', '审核被撤销！', 0),
(32, 3, 2, 1, 2, '2024-05-13 00:50:16', 'null', 0),
(33, 3, 2, 1, 1, '2024-05-13 00:51:05', 'null', 0),
(34, 3, 2, 1, 0, '2024-05-13 00:51:09', '审核被撤销！', 0),
(35, 3, 2, 1, 2, '2024-05-13 00:51:24', 'null', 0),
(36, 3, 2, 1, 1, '2024-05-13 00:53:14', 'null', 0),
(37, 3, 2, 1, 0, '2024-05-13 00:53:18', '审核被撤销！', 0),
(38, 3, 2, 1, 2, '2024-05-13 00:53:27', '不通过', 0),
(39, 3, 2, 1, 1, '2024-05-13 13:47:23', 'null', 0),
(40, 2, 1, 1, 1, '2024-05-13 22:33:33', 'null', 0),
(41, 3, 1, 1, 2, '2024-05-13 22:35:11', '2', 0),
(42, 3, 1, 1, 1, '2024-05-13 22:35:35', 'null', 0),
(43, 2, 1, 1, 2, '2024-05-13 22:41:40', '22', 0),
(44, 2, 1, 1, 1, '2024-05-13 22:41:42', 'null', 0),
(45, 4, 1, 0, 0, '2024-05-16 12:49:17', NULL, 0),
(46, 5, 1, 0, 0, '2024-05-16 14:45:16', NULL, 0),
(47, 5, 1, 1, 1, '2024-05-16 14:45:41', 'null', 0),
(48, 6, 1, 0, 0, '2024-05-17 08:44:06', NULL, 0),
(49, 6, 1, 1, 1, '2024-05-17 08:44:33', 'null', 0);

-- --------------------------------------------------------

--
-- 表的结构 `egg_article`
--

CREATE TABLE `egg_article` (
  `article_id` int(11) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `author_id` int(11) NOT NULL,
  `published_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='文章表';

--
-- 转存表中的数据 `egg_article`
--

INSERT INTO `egg_article` (`article_id`, `category`, `title`, `content`, `status`, `author_id`, `published_time`, `create_time`, `update_time`) VALUES
(7, 0, '文传学院书房清洁活动回顾', '2024年5月1日，文传学院举行了2024年第6次活动，活动顺利举行，并且很不错，成效很好。', 0, 1, '2024-05-16 00:14:42', '2024-05-16 00:14:43', '2024-05-16 00:14:43'),
(6, 1, '计算机学院办公室助理', '办公室助理其实不错的还好真的不错啊。', 0, 1, '2024-05-13 16:16:03', '2024-05-13 16:16:03', '2024-05-13 16:16:03'),
(8, 0, '机械学院机房装机活动', '2024年3月25日，没写要得很少很少看看就好好还会，部门会提示在什么嘛。', 0, 1, '2024-05-16 04:58:43', '2024-05-16 04:58:43', '2024-05-16 04:58:43'),
(9, 0, '科技中心讲解志愿顺利举行', '科技中心讲解志愿顺利举行1111科技中心讲解志愿顺利举行科技中心讲解志愿顺利举行科技中心讲解志愿顺利举行', 0, 1, '2024-05-16 15:01:59', '2024-05-16 15:02:00', '2024-05-16 15:02:00'),
(10, 0, '我想发一个文章', '发一个文章测试', 0, 1, '2024-05-16 23:18:34', '2024-05-16 23:18:35', '2024-05-16 23:18:35');

-- --------------------------------------------------------

--
-- 表的结构 `egg_department`
--

CREATE TABLE `egg_department` (
  `department_id` int(11) NOT NULL COMMENT '部门ID',
  `department_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '部门名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='部门表';

--
-- 转存表中的数据 `egg_department`
--

INSERT INTO `egg_department` (`department_id`, `department_name`, `create_time`, `update_time`) VALUES
(1, '计算机科学与技术学院（软件学院、网络空间安全学院）', '2024-05-13 21:19:10', '2024-05-13 22:59:27'),
(2, '文学与传媒学院', '2024-05-13 21:19:10', '2024-05-07 13:49:04'),
(3, '机械工程学院', '2024-05-13 21:21:05', '2024-05-13 23:02:11'),
(4, '化学工程与能源技术学院', '2024-05-13 23:15:12', '2024-05-13 23:15:12');

-- --------------------------------------------------------

--
-- 表的结构 `egg_department_admin`
--

CREATE TABLE `egg_department_admin` (
  `department_admin_id` int(11) NOT NULL COMMENT '部门管理员ID',
  `department_id` int(11) NOT NULL COMMENT '部门ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='部门管理员表';

--
-- 转存表中的数据 `egg_department_admin`
--

INSERT INTO `egg_department_admin` (`department_admin_id`, `department_id`, `user_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `egg_feedback`
--

CREATE TABLE `egg_feedback` (
  `feedback_id` int(11) NOT NULL COMMENT '反馈ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `feedback_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '反馈时间',
  `feedback_type` int(11) NOT NULL COMMENT '反馈类型（0:建议,1:投诉）',
  `feedback_title` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '反馈标题',
  `feedback_content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '反馈内容',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '处理状态（0:待处理,1:处理中,2:已完成）',
  `handler_id` int(11) DEFAULT NULL COMMENT '处理人员ID',
  `handle_time` datetime DEFAULT NULL COMMENT '处理时间',
  `remarks` text COLLATE utf8_unicode_ci COMMENT '备注'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户反馈表';

--
-- 转存表中的数据 `egg_feedback`
--

INSERT INTO `egg_feedback` (`feedback_id`, `user_id`, `feedback_time`, `feedback_type`, `feedback_title`, `feedback_content`, `status`, `handler_id`, `handle_time`, `remarks`) VALUES
(1, 1, '2024-04-22 09:57:53', 0, '111', '我要反馈一下这个系统的不好用', 0, NULL, NULL, NULL),
(2, 1, '2024-04-22 10:07:08', 0, '111', '我真的在测试反馈', 1, 1, '2024-05-16 17:21:33', '处理了'),
(3, 1, '2024-05-13 18:08:08', 0, '1111', '11111111', 1, 1, '2024-05-13 20:22:44', 'ok\n'),
(4, 1, '2024-05-13 18:08:59', 0, '反馈以下', '反馈内容没那个', 1, 1, '2024-05-13 20:36:44', '11111'),
(5, 1, '2024-05-16 16:52:47', 1, '哈哈哈哈', '黄河鬼棺', 1, 1, '2024-05-16 17:01:25', '刚刚回家不复返哈哈哈发的风格'),
(6, 1, '2024-05-16 23:02:53', 1, 'hello', 'hello', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `egg_like_record`
--

CREATE TABLE `egg_like_record` (
  `like_id` int(11) NOT NULL COMMENT '点赞记录ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `article_id` int(11) NOT NULL COMMENT '文章ID',
  `is_cancel` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否取消点赞',
  `like_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='点赞记录表';

--
-- 转存表中的数据 `egg_like_record`
--

INSERT INTO `egg_like_record` (`like_id`, `user_id`, `article_id`, `is_cancel`, `like_time`, `update_time`) VALUES
(2, 1, 6, 0, '2024-05-16 03:05:50', '2024-05-16 03:11:26'),
(3, 1, 7, 0, '2024-05-16 03:11:10', '2024-05-16 04:59:24'),
(4, 1, 8, 1, '2024-05-16 04:58:58', '2024-05-16 15:31:38'),
(5, 1, 9, 0, '2024-05-16 15:31:42', '2024-05-16 22:48:11');

-- --------------------------------------------------------

--
-- 表的结构 `egg_message`
--

CREATE TABLE `egg_message` (
  `message_id` int(11) NOT NULL COMMENT '消息ID',
  `sender_id` int(11) NOT NULL COMMENT '发送者ID',
  `receiver_id` int(11) NOT NULL COMMENT '接收者ID',
  `content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '消息内容',
  `is_read` int(1) NOT NULL DEFAULT '0' COMMENT '已读标识',
  `sent_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  `message_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息类型'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='消息表';

--
-- 转存表中的数据 `egg_message`
--

INSERT INTO `egg_message` (`message_id`, `sender_id`, `receiver_id`, `content`, `is_read`, `sent_time`, `message_type`) VALUES
(1, 1, 1, 'helloworld', 1, '2024-05-14 23:22:01', '1'),
(2, 1, 1, '112121212121', 1, '2024-05-14 23:22:05', '1'),
(3, 1, 115, '你好，这是一条测试消息', 0, '2024-05-14 23:41:37', '1'),
(4, 1, 119, '更何况那个方法', 0, '2024-05-16 16:58:50', '1'),
(5, 1, 118, '分分合合快乐', 0, '2024-05-16 17:15:49', '1'),
(6, 1, 119, 'hello', 0, '2024-05-16 17:19:37', '1'),
(7, 1, 120, '傻逼温景辉', 0, '2024-05-16 21:03:38', '1');

-- --------------------------------------------------------

--
-- 表的结构 `egg_permission_management`
--

CREATE TABLE `egg_permission_management` (
  `permission_id` int(11) NOT NULL COMMENT '权限ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role` int(4) NOT NULL DEFAULT '0' COMMENT '角色'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='权限管理表';

--
-- 转存表中的数据 `egg_permission_management`
--

INSERT INTO `egg_permission_management` (`permission_id`, `user_id`, `role`) VALUES
(6, 102, 0),
(5, 101, 0),
(4, 100, 0),
(7, 3111, 0),
(8, 1, 1),
(9, 103, 0),
(10, 104, 0),
(11, 105, 0),
(12, 106, 0),
(13, 107, 0),
(15, 110, 0),
(16, 113, 0),
(17, 114, 0),
(18, 115, 2),
(19, 116, 0),
(20, 117, 0),
(21, 118, 0),
(22, 119, 2),
(23, 120, 2);

-- --------------------------------------------------------

--
-- 表的结构 `egg_read_announcement`
--

CREATE TABLE `egg_read_announcement` (
  `read_id` int(11) NOT NULL,
  `announcement_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='已读公告表';

--
-- 转存表中的数据 `egg_read_announcement`
--

INSERT INTO `egg_read_announcement` (`read_id`, `announcement_id`, `user_id`, `create_time`) VALUES
(1, 1, 1, '2024-05-15 22:09:18'),
(2, 2, 1, '2024-05-15 22:22:57'),
(3, 3, 1, '2024-05-16 16:50:09');

-- --------------------------------------------------------

--
-- 表的结构 `egg_system_log`
--

CREATE TABLE `egg_system_log` (
  `log_id` int(11) NOT NULL COMMENT '日志ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `operation_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  `operation_type` int(11) NOT NULL COMMENT '操作类型',
  `operation_desc` text COLLATE utf8_unicode_ci COMMENT '操作描述',
  `related_id` int(11) DEFAULT NULL COMMENT '相关ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='系统日志表';

--
-- 转存表中的数据 `egg_system_log`
--

INSERT INTO `egg_system_log` (`log_id`, `user_id`, `operation_time`, `operation_type`, `operation_desc`, `related_id`) VALUES
(1, 1, '2024-05-16 00:14:42', 1, '新增文章信息', NULL),
(2, 1, '2024-05-16 04:58:42', 1, '新增文章信息', NULL),
(3, 1, '2024-05-16 15:01:59', 1, '新增文章信息', NULL),
(4, 1, '2024-05-16 15:11:24', 1, '发布公告计算机学院志愿活动通知', NULL),
(5, 1, '2024-05-16 17:00:06', 3, '删除公告1', NULL),
(6, 1, '2024-05-16 17:15:39', 2, '更新用户119状态为-1', 119),
(7, 1, '2024-05-16 17:15:42', 2, '更新用户119状态为1', 119),
(8, 1, '2024-05-16 17:19:28', 2, '更新用户119状态为-1', 119),
(9, 1, '2024-05-16 17:19:30', 2, '更新用户119状态为1', 119),
(10, 1, '2024-05-16 23:18:34', 1, '新增文章信息', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `egg_user`
--

CREATE TABLE `egg_user` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `user_wxid` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户微信标识',
  `dgut_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '中央认证账户',
  `dgut_password` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '中央认证密码',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态(-1:禁用,1:启用)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

--
-- 转存表中的数据 `egg_user`
--

INSERT INTO `egg_user` (`user_id`, `user_wxid`, `dgut_id`, `dgut_password`, `status`, `create_time`, `update_time`) VALUES
(1, 'orce068VKfT0bpqH_WIXK1WvWDY8', '202041413126', 'MjAwMjA5MjZ5WQ==', 1, '2024-04-17 14:47:02', '2024-05-15 14:04:41'),
(100, 'ces', NULL, NULL, 1, '2024-04-21 10:17:08', '2024-04-21 10:17:42'),
(101, '1111889', NULL, NULL, 1, '2024-04-21 10:40:30', '2024-04-21 21:14:39'),
(102, 'orce061EwTWKj69HHxiiamU5eJlE', NULL, NULL, 1, '2024-04-21 22:18:12', '2024-04-21 22:18:12'),
(103, 'orce0', NULL, NULL, 1, '2024-05-07 12:57:09', '2024-05-07 12:57:09'),
(104, 'xiaoming123456', NULL, NULL, 1, '2024-05-12 16:32:46', '2024-05-12 16:32:46'),
(105, 'orce011', NULL, NULL, 1, '2024-05-14 16:35:28', '2024-05-14 16:35:28'),
(106, 'orceceshi1002', NULL, NULL, 1, '2024-05-14 16:36:52', '2024-05-14 16:36:52'),
(107, 'orceceshi1111', NULL, NULL, 1, '2024-05-14 16:38:20', '2024-05-14 16:38:20'),
(110, 'orceceshi1111165656', NULL, NULL, 1, '2024-05-14 16:43:47', '2024-05-14 16:43:47'),
(111, 'orceceshi11111656511116', NULL, NULL, 1, '2024-05-14 16:45:05', '2024-05-14 16:45:05'),
(113, 'ceshi103220', NULL, NULL, 1, '2024-05-14 16:46:43', '2024-05-14 16:46:43'),
(114, 'ceshceshxiashjkjdhsadkhasjkh', NULL, NULL, 1, '2024-05-14 16:46:56', '2024-05-14 19:28:32'),
(115, 'ceshi1111023', NULL, NULL, 1, '2024-05-14 16:48:28', '2024-05-14 17:29:24'),
(116, 'orce067QO-FfOejuJXOanXTnV1ko', NULL, NULL, 1, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(117, 'orce06yJFsP1CxxgYDCFBAEUFEkY', NULL, NULL, 1, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(118, 'orce065UaeNY0yPdJI42dFNTqF0o', NULL, NULL, 1, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(119, 'orce061c6AvmoCPXGOKBBSq4SLgs', NULL, NULL, 1, '2024-05-16 09:20:53', '2024-05-16 17:19:30'),
(120, 'orce06wFRqc-IlnHwT3z0xyFlf8I', NULL, NULL, 1, '2024-05-16 21:00:56', '2024-05-16 21:00:56');

-- --------------------------------------------------------

--
-- 表的结构 `egg_user_profile`
--

CREATE TABLE `egg_user_profile` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `department_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '微信用户' COMMENT '姓名',
  `gender` int(2) NOT NULL DEFAULT '0' COMMENT '性别',
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像(URL)',
  `user_type` int(4) NOT NULL DEFAULT '3' COMMENT '用户类型(学生/老师/其它)',
  `phone` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `idcard` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '身份证号',
  `volunteer_hours` float(5,0) DEFAULT '0' COMMENT '总志愿时长',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户详细信息表';

--
-- 转存表中的数据 `egg_user_profile`
--

INSERT INTO `egg_user_profile` (`user_id`, `department_id`, `name`, `gender`, `avatar`, `user_type`, `phone`, `email`, `birthday`, `idcard`, `volunteer_hours`, `create_time`, `update_time`) VALUES
(1, 1, '杨升浩', 0, 'https://cdn.shenghao.xyz/upload/avatar/20240516/1715849463353.jpg', 1, '13242000219', '15222@qq.com', '2002-10-31', '430321200210310117', 5, '2024-04-18 00:34:41', '2024-05-17 08:46:14'),
(101, NULL, '微信用户9850', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-04-21 10:40:30', '2024-04-21 10:40:30'),
(100, NULL, '微信用户9632', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-04-21 10:17:09', '2024-04-21 10:17:09'),
(102, NULL, '微信用户5202', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-04-21 22:18:12', '2024-04-21 22:18:12'),
(105, NULL, '微信用户7343', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-14 16:35:29', '2024-05-14 16:35:29'),
(103, NULL, '微信用户9176', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-07 12:57:10', '2024-05-07 12:57:10'),
(104, 3, '小黑黑同学', 0, 'https://cdn.shenghao.xyz/upload/avatar/20240512/1715502909884.png', 3, '13555262235', '151167222@qq.com', '2002-05-12', NULL, 0, '2024-05-12 16:32:46', '2024-05-14 16:08:20'),
(106, NULL, '微信用户2444', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-14 16:36:53', '2024-05-14 16:36:53'),
(107, NULL, '微信用户1527', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-14 16:38:20', '2024-05-14 16:38:20'),
(110, NULL, '微信用户2045', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-14 16:43:47', '2024-05-14 16:43:47'),
(111, 3, '微信用户5383', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-14 16:45:06', '2024-05-16 04:51:26'),
(113, 4, '微信用户2741', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-14 16:46:43', '2024-05-16 04:51:14'),
(114, 2, '微信用户6487', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-14 16:46:56', '2024-05-16 04:51:03'),
(115, 1, '微信用户5924', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-14 16:48:28', '2024-05-15 17:05:58'),
(116, NULL, '微信用户7288', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(117, NULL, '微信用户7583', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(118, NULL, '微信用户6677', 0, NULL, 3, NULL, NULL, NULL, NULL, 0, '2024-05-16 04:38:45', '2024-05-16 04:38:45'),
(119, 1, '微信用户6732', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-16 09:20:53', '2024-05-16 16:35:16'),
(120, 1, 'wjh', 0, NULL, 3, NULL, NULL, '1970-01-01', NULL, 0, '2024-05-16 21:00:56', '2024-05-16 21:02:13');

-- --------------------------------------------------------

--
-- 表的结构 `egg_volunteer_activity`
--

CREATE TABLE `egg_volunteer_activity` (
  `activity_id` int(11) NOT NULL COMMENT '活动ID',
  `activity_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '活动名称',
  `activity_place` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '活动地点',
  `activity_pic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '活动封面图',
  `need_person` int(11) NOT NULL COMMENT '招募人数',
  `sign_person` int(11) NOT NULL DEFAULT '0' COMMENT '已报名人数',
  `access_person` int(11) NOT NULL DEFAULT '0' COMMENT '录用人数',
  `contact_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系人',
  `contact_phone` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系方式',
  `limitation` tinyint(1) NOT NULL DEFAULT '0' COMMENT '报名限制（仅限本组织）',
  `deadline` datetime NOT NULL COMMENT '截止时间',
  `guarantee` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '服务保障',
  `requirement` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '报名要求',
  `detail_info` text COLLATE utf8_unicode_ci NOT NULL COMMENT '活动描述',
  `other_req` text COLLATE utf8_unicode_ci COMMENT '其它要求',
  `status` int(4) DEFAULT '0' COMMENT '状态',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `organizer_id` int(11) NOT NULL COMMENT '组织者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='志愿活动表';

--
-- 转存表中的数据 `egg_volunteer_activity`
--

INSERT INTO `egg_volunteer_activity` (`activity_id`, `activity_name`, `activity_place`, `activity_pic`, `need_person`, `sign_person`, `access_person`, `contact_name`, `contact_phone`, `limitation`, `deadline`, `guarantee`, `requirement`, `detail_info`, `other_req`, `status`, `start_time`, `end_time`, `organizer_id`, `create_time`, `update_time`) VALUES
(1, '测试活动0419', '东莞理工学院', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 10, 2, 2, '小明', '13242000219', 0, '2024-05-12 23:59:59', '12w', '无', '扫地', 'null', 0, '2024-05-13 11:12:12', '2024-05-15 11:12:12', 1, '2024-04-19 22:34:59', '2024-05-16 01:05:43'),
(2, '图书馆清洁活动1', '东莞理工学院图书馆', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 5, 0, 0, '小样', '13255632225', 15, '2024-04-25 00:00:00', NULL, NULL, '按照要求清洁图书馆', NULL, 0, '2024-04-27 23:07:01', '2024-04-28 23:07:07', 1, '2024-04-19 23:07:18', '2024-04-20 16:28:59'),
(3, '图书馆清洁活动2', '东莞理工学院图书馆', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 5, 0, 0, '小样', '13255632225', 15, '2024-04-25 00:00:00', NULL, NULL, '按照要求清洁图书馆', NULL, 0, '2024-04-28 10:36:50', '2024-04-29 10:37:00', 1, '2024-04-20 10:37:26', '2024-04-20 16:28:59'),
(4, '图书馆清洁活动3', '东莞理工学院图书馆', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 5, 0, 0, '小样', '13255632225', 15, '2024-04-25 00:00:00', NULL, NULL, '按照要求清洁图书馆', NULL, 0, '2024-04-28 10:36:50', '2024-04-29 10:37:00', 1, '2024-04-20 10:38:15', '2024-04-20 16:28:59'),
(5, '图书馆清洁活动4', '东莞理工学院图书馆', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 5, 0, 0, '小样', '13255632225', 15, '2024-04-25 00:00:00', NULL, NULL, '按照要求清洁图书馆', NULL, 0, '2024-04-28 10:36:50', '2024-04-29 10:37:00', 1, '2024-04-20 10:38:18', '2024-04-20 16:28:59'),
(6, '图书馆清洁活动5', '东莞理工学院图书馆', 'https://image.izyz.org/obs-izy/upload/pictures/20240420/bdaf55ca-9eef-4f56-8283-1dd1f0169bf2-i%E5%BF%97%E6%84%BF%E9%85%8D%E5%9B%BE.jpg', 5, 0, 0, '小样', '13255632225', 15, '2024-04-25 00:00:00', NULL, NULL, '按照要求清洁图书馆', NULL, 0, '2024-04-28 10:36:50', '2024-04-29 10:37:00', 1, '2024-04-20 14:37:34', '2024-04-20 16:28:59'),
(9, '科技中心讲解员志愿活动', '东莞理工学院科技创新中心', 'https://cdn.shenghao.xyz/upload/image/20240516/1715834603491.jpg', 2, 1, 0, '小明', '13555269996', 0, '2024-05-17 12:00:00', '矿泉水\n志愿者服装', '一有责任心，二按时准点', '东莞理工科技创新院活动，将于2024年5月17号举行，特此需要招募几名志愿者参与活动并提供讲解服务。', NULL, 0, '2024-05-17 12:59:00', '2024-05-17 15:00:00', 1, '2024-05-16 12:48:20', '2024-05-16 22:56:08'),
(10, '计算机装机志愿活动', '下沉广场', 'https://cdn.shenghao.xyz/upload/image/20240516/1715840968917.jpg', 5, 1, 1, '小茗同学', '13245886598', 0, '2024-05-16 14:50:00', '志愿者服装，矿泉水', '东莞理工学院学生', '活动测试的', NULL, 0, '2024-05-16 14:55:00', '2024-05-16 15:45:00', 1, '2024-05-16 14:44:35', '2024-05-16 16:55:44'),
(11, '北门车辆管理志愿', '东莞理工学院北门', 'https://cdn.shenghao.xyz/upload/image/20240516/1715844890510.jpg', 3, 0, 0, '小白先生', '13222522236', 0, '2024-05-16 16:38:20', '矿泉水\n志愿服装', '东莞理工学院学生即可', '该活动在北门，相关数据对加沙的就是看到加了加了奖励空间参考拉萨的环境打卡上班的反抗精神客家话2考湖1恐惧和空间和2课好12开机后空间2好困好困机会', NULL, 0, '2024-05-16 18:38:20', '2024-05-16 19:38:20', 1, '2024-05-16 15:36:42', '2024-05-16 15:36:42'),
(12, '图书馆摆书志愿活动', '图书馆', 'https://cdn.shenghao.xyz/upload/image/20240517/1715906534478.jpg', 3, 1, 1, '杨升浩', '13522265533', 1, '2024-05-17 09:30:00', 'hello', '测试', '测', NULL, 0, '2024-05-17 06:30:00', '2024-05-17 11:30:00', 1, '2024-05-17 08:43:57', '2024-05-17 08:44:33');

-- --------------------------------------------------------

--
-- 表的结构 `egg_volunteer_activity_registration`
--

CREATE TABLE `egg_volunteer_activity_registration` (
  `registration_id` int(11) NOT NULL COMMENT '报名ID',
  `activity_id` int(11) NOT NULL COMMENT '活动ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `is_cancle` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否取消',
  `status` int(4) DEFAULT '0' COMMENT '状态',
  `check_in_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '签到状态',
  `check_out_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '签退状态',
  `check_in_time` datetime DEFAULT NULL COMMENT '签到时间',
  `check_out_time` datetime DEFAULT NULL COMMENT '签退时间',
  `duration` int(8) DEFAULT '0' COMMENT '志愿时长',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='志愿活动报名表';

--
-- 转存表中的数据 `egg_volunteer_activity_registration`
--

INSERT INTO `egg_volunteer_activity_registration` (`registration_id`, `activity_id`, `user_id`, `is_cancle`, `status`, `check_in_status`, `check_out_status`, `check_in_time`, `check_out_time`, `duration`, `create_time`, `update_time`) VALUES
(2, 1, 1, 0, 1, 1, 1, '2024-05-12 16:29:34', '2024-05-12 18:29:44', 0, '2024-05-12 14:45:39', '2024-05-13 22:41:42'),
(3, 1, 104, 0, 1, 1, 1, '2024-05-12 16:48:03', '2024-05-12 16:48:38', 0, '2024-05-12 16:34:06', '2024-05-13 22:35:35'),
(4, 9, 1, 0, 0, 0, 0, NULL, NULL, 0, '2024-05-16 12:49:18', '2024-05-16 22:56:09'),
(5, 10, 1, 0, 1, 1, 1, '2024-05-16 14:55:00', '2024-05-16 15:45:00', 0, '2024-05-16 14:45:17', '2024-05-16 16:52:05'),
(6, 12, 1, 0, 1, 1, 1, '2024-05-17 06:30:40', '2024-05-17 08:46:14', 0, '2024-05-17 08:44:07', '2024-05-17 08:46:15');

-- --------------------------------------------------------

--
-- 表的结构 `egg_workstudy_activity`
--

CREATE TABLE `egg_workstudy_activity` (
  `work_study_id` int(11) NOT NULL COMMENT '勤工俭学ID',
  `job_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '工作名称',
  `job_pic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '工作封面图',
  `job_place` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '工作地点',
  `need_person` int(11) NOT NULL COMMENT '招募人数',
  `sign_person` int(11) NOT NULL DEFAULT '0' COMMENT '已报名人数',
  `access_person` int(11) NOT NULL DEFAULT '0' COMMENT '录用人数',
  `contact_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '联系人',
  `contact_phone` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系方式',
  `description` text COLLATE utf8_unicode_ci COMMENT '工作描述',
  `other_req` text COLLATE utf8_unicode_ci COMMENT '其它要求',
  `question` text COLLATE utf8_unicode_ci COMMENT '报名填写题目',
  `deadline` datetime NOT NULL COMMENT '截止时间',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `status` int(4) DEFAULT '0' COMMENT '状态',
  `creator_id` int(11) NOT NULL COMMENT '发布者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='勤工俭学表';

--
-- 转存表中的数据 `egg_workstudy_activity`
--

INSERT INTO `egg_workstudy_activity` (`work_study_id`, `job_name`, `job_pic`, `job_place`, `need_person`, `sign_person`, `access_person`, `contact_name`, `contact_phone`, `description`, `other_req`, `question`, `deadline`, `start_time`, `end_time`, `status`, `creator_id`, `create_time`, `update_time`) VALUES
(1, '机械学院办公室助理', 'https://img01.51jobcdn.com/fansImg/CompLogo/7/6882/6881171/6881171_300.png?637765487395415817', '东莞理工学院', 1, 1, 1, '张老师', '13422566635', '需要一位责任心强的学生', NULL, NULL, '2024-05-14 22:15:50', '2024-05-14 23:15:53', '2024-05-17 23:15:59', 0, 1, '2024-04-19 23:16:10', '2024-05-13 13:47:23'),
(2, '大学生活超市招聘收银员', 'https://cdn.shenghao.xyz/upload/image/20240513/1715570370751.png', '东莞理工学院大超', 3, 0, 0, '小明', '13555623335', '负责收银工作和其它工作。\n整理货架、摆放物品。\n收银清点结算。11', NULL, NULL, '2024-05-15 23:59:59', '2024-05-19 11:19:13', '2024-05-28 11:19:13', 0, 1, '2024-05-13 11:22:04', '2024-05-13 11:32:34'),
(3, '学生活动中心助理240516', 'https://cdn.shenghao.xyz/upload/image/20240516/1715842659080.jpg', '学生活动中心', 2, 0, 0, '李志康', '135556233362', '学生活动中心助理，负责活动师管理，前台值班等操作', NULL, NULL, '2024-05-18 20:00:00', '2024-05-16 20:00:00', '2024-05-18 20:00:00', 0, 1, '2024-05-16 14:59:19', '2024-05-16 14:59:19');

-- --------------------------------------------------------

--
-- 表的结构 `egg_workstudy_activity_registration`
--

CREATE TABLE `egg_workstudy_activity_registration` (
  `registration_id` int(11) NOT NULL COMMENT '报名ID',
  `work_study_id` int(11) NOT NULL COMMENT '勤工俭学ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `is_cancle` int(2) DEFAULT '0' COMMENT '是否取消',
  `answer` text COLLATE utf8_unicode_ci COMMENT '问题答案',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='勤工俭学报名表';

--
-- 转存表中的数据 `egg_workstudy_activity_registration`
--

INSERT INTO `egg_workstudy_activity_registration` (`registration_id`, `work_study_id`, `user_id`, `is_cancle`, `answer`, `status`, `create_time`, `update_time`) VALUES
(3, 1, 1, 0, NULL, 1, '2024-05-12 18:26:26', '2024-05-13 13:47:24');

--
-- 转储表的索引
--

--
-- 表的索引 `egg_activity_log`
--
ALTER TABLE `egg_activity_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `operator_id` (`operator_id`);

--
-- 表的索引 `egg_announcement`
--
ALTER TABLE `egg_announcement`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `author_id` (`author_id`);

--
-- 表的索引 `egg_approval`
--
ALTER TABLE `egg_approval`
  ADD PRIMARY KEY (`approval_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- 表的索引 `egg_article`
--
ALTER TABLE `egg_article`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `author_id` (`author_id`);

--
-- 表的索引 `egg_department`
--
ALTER TABLE `egg_department`
  ADD PRIMARY KEY (`department_id`);

--
-- 表的索引 `egg_department_admin`
--
ALTER TABLE `egg_department_admin`
  ADD PRIMARY KEY (`department_admin_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 表的索引 `egg_feedback`
--
ALTER TABLE `egg_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id_index` (`user_id`),
  ADD KEY `handler_id_index` (`handler_id`);

--
-- 表的索引 `egg_like_record`
--
ALTER TABLE `egg_like_record`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `article_id` (`article_id`);

--
-- 表的索引 `egg_message`
--
ALTER TABLE `egg_message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- 表的索引 `egg_permission_management`
--
ALTER TABLE `egg_permission_management`
  ADD PRIMARY KEY (`permission_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 表的索引 `egg_read_announcement`
--
ALTER TABLE `egg_read_announcement`
  ADD PRIMARY KEY (`read_id`),
  ADD KEY `announcement_id` (`announcement_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 表的索引 `egg_system_log`
--
ALTER TABLE `egg_system_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 表的索引 `egg_user`
--
ALTER TABLE `egg_user`
  ADD PRIMARY KEY (`user_id`);

--
-- 表的索引 `egg_user_profile`
--
ALTER TABLE `egg_user_profile`
  ADD PRIMARY KEY (`user_id`);

--
-- 表的索引 `egg_volunteer_activity`
--
ALTER TABLE `egg_volunteer_activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `organizer_id` (`organizer_id`);

--
-- 表的索引 `egg_volunteer_activity_registration`
--
ALTER TABLE `egg_volunteer_activity_registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 表的索引 `egg_workstudy_activity`
--
ALTER TABLE `egg_workstudy_activity`
  ADD PRIMARY KEY (`work_study_id`) USING BTREE,
  ADD KEY `creator_id` (`creator_id`);

--
-- 表的索引 `egg_workstudy_activity_registration`
--
ALTER TABLE `egg_workstudy_activity_registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `work_study_id` (`work_study_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `egg_activity_log`
--
ALTER TABLE `egg_activity_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志ID', AUTO_INCREMENT=23;

--
-- 使用表AUTO_INCREMENT `egg_announcement`
--
ALTER TABLE `egg_announcement`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通知ID', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `egg_approval`
--
ALTER TABLE `egg_approval`
  MODIFY `approval_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '审核ID', AUTO_INCREMENT=50;

--
-- 使用表AUTO_INCREMENT `egg_article`
--
ALTER TABLE `egg_article`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `egg_department`
--
ALTER TABLE `egg_department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门ID', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `egg_department_admin`
--
ALTER TABLE `egg_department_admin`
  MODIFY `department_admin_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门管理员ID', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `egg_feedback`
--
ALTER TABLE `egg_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '反馈ID', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `egg_like_record`
--
ALTER TABLE `egg_like_record`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '点赞记录ID', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `egg_message`
--
ALTER TABLE `egg_message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息ID', AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `egg_permission_management`
--
ALTER TABLE `egg_permission_management`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限ID', AUTO_INCREMENT=24;

--
-- 使用表AUTO_INCREMENT `egg_read_announcement`
--
ALTER TABLE `egg_read_announcement`
  MODIFY `read_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `egg_system_log`
--
ALTER TABLE `egg_system_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志ID', AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `egg_user`
--
ALTER TABLE `egg_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID', AUTO_INCREMENT=121;

--
-- 使用表AUTO_INCREMENT `egg_volunteer_activity`
--
ALTER TABLE `egg_volunteer_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动ID', AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `egg_volunteer_activity_registration`
--
ALTER TABLE `egg_volunteer_activity_registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '报名ID', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `egg_workstudy_activity`
--
ALTER TABLE `egg_workstudy_activity`
  MODIFY `work_study_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '勤工俭学ID', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `egg_workstudy_activity_registration`
--
ALTER TABLE `egg_workstudy_activity_registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '报名ID', AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
