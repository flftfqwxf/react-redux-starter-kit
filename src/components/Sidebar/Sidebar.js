import React from 'react'
import {IndexLink, Link} from 'react-router'
// import './Header.scss'
export const Sidebar = () => (
    <div className="page-sidebar">
        <a href="index.html" className="logo"></a>
        <ul className="nav" id="nav">
            <li>
                <a href="#nav2" data-toggle="collapse" data-parent="#nav" aria-expanded="true">
                    <i className="gm-icon gm-peer-plan"></i>
                    <span>项目管理</span>
                </a>
                <ul className="collapse in" id="nav2">
                    <li>
                        <IndexLink to='/' activeClassName='route--active'>
                            项目列表
                        </IndexLink>
                    </li>
                    <li>
                        <Link to='/project/add' activeClassName='route--active'>
                            添加项目
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#nav3" data-toggle="collapse" data-parent="#nav" aria-expanded="true">
                    <i className="gm-icon gm-peer-plan"></i>
                    <span>接口管理</span>
                </a>
                <ul className="collapse in" id="nav3">
                    <li>
                        <Link to='/api' activeClassName='route--active'>
                            接口管理
                        </Link>
                    </li>
                    <li>
                        <Link to='/api/add' activeClassName='route--active'>
                            添加接口
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#nav4" data-toggle="collapse" data-parent="#nav" aria-expanded="true">
                    <i className="gm-icon gm-peer-plan"></i>
                    <span>系统管理</span>
                </a>
                <ul className="collapse in" id="nav3">
                    <li>
                        <Link to='/system/add' activeClassName='route--active'>
                            全局参数设置
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

)
export default Sidebar
