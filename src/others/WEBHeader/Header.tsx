import React from "react";

import Button from "../../components/Button";
import "./header.css";

type User = {
  name: string;
};

interface HeaderProps {
  /** 登录后的用户信息 */
  user?: User;
  /** 左边图标 */
  icon?: React.ReactNode;
  /** 头部标题 */
  title?: string;
  /** 登录按钮点击回调函数 */
  onLogin: () => void;
  /** 退出按钮点击回调函数 */
  onLogout: () => void;
  /** 注册按钮点击回调函数 */
  onCreateAccount: () => void;
}
/**
 * ###用于快速搭建页面结构的组合组件
 *
 * Header组件，常用于pc端网站头部
 *
 * ### 使用：
 *
 * ~~~js
 * import { WEBHeader } from 'orgui'
 * ~~~
 *
 * ### 登录后示例：
 */
export const WEBHeader = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
  icon,
  title,
}: HeaderProps) => (
  <header>
    <div className="wrapper">
      <div>
        {icon}
        <h1>{title}</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              欢迎👏👏👏, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout}>
              退出
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin}>
              登录
            </Button>
            <Button btnType="primary" size="small" onClick={onCreateAccount}>
              注册
            </Button>
          </>
        )}
      </div>
    </div>
  </header>
);

export default WEBHeader;
WEBHeader.defaultProps = {
  icon: (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3431"
      width="32"
      height="32"
    >
      <path
        d="M511.7 510.3m-447.7 0a447.7 447.7 0 1 0 895.4 0 447.7 447.7 0 1 0-895.4 0Z"
        fill="#F6C635"
        p-id="3432"
      ></path>
      <path
        d="M511.3 510.3m-393.5 0a393.5 393.5 0 1 0 787 0 393.5 393.5 0 1 0-787 0Z"
        fill="#F7FBC9"
        p-id="3433"
      ></path>
      <path
        d="M576.9 257.4c0 76.3-28.7 139.6-66.3 190.8-42.9-62.1-69.6-119.4-69.6-195.7s39.9-80.6 69.6-80.6c29.6 0 66.3 9.3 66.3 85.5zM445.1 766.8c0-76.3 28.7-139.6 66.3-190.8 42.9 62.2 69.6 119.4 69.6 195.7s-39.9 80.6-69.6 80.6c-29.7 0-66.3-9.2-66.3-85.5zM767.7 577.7c-76.3 0-139.6-28.7-190.8-66.3 62.2-42.9 119.4-69.6 195.7-69.6s80.6 39.9 80.6 69.6c0 29.7-9.2 66.3-85.5 66.3zM258.3 445.9c76.3 0 139.6 28.7 190.8 66.3-62.2 42.9-119.4 69.6-195.7 69.6s-80.6-39.9-80.6-69.6c0-29.7 9.2-66.3 85.5-66.3zM760.1 359.3c-53.9 53.9-119 78.4-181.8 88 13.6-74.3 35.2-133.6 89.2-187.6 53.9-53.9 85.2-28.8 106.2-7.8s40.3 53.4-13.6 107.4zM266.3 665.7c53.9-53.9 119-78.4 181.8-88-13.6 74.3-35.2 133.6-89.2 187.6-53.9 53.9-85.2 28.8-106.2 7.8-20.9-21-40.3-53.4 13.6-107.4zM665.5 758.7c-53.9-53.9-78.4-119-88-181.8 74.3 13.6 133.6 35.2 187.6 89.2 53.9 53.9 28.8 85.2 7.8 106.2-21 20.9-53.4 40.3-107.4-13.6zM359.1 264.9c53.9 53.9 78.4 119 88 181.8-74.3-13.6-133.6-35.2-187.6-89.2s-28.8-85.2-7.8-106.2 53.4-40.3 107.4 13.6z"
        fill="#FFC324"
        p-id="3434"
      ></path>
    </svg>
  ),
  title: "WebHeader",
};
