import { Link, NavLink, useLocation } from "react-router-dom"
import { Breadcrumb, Layout, Menu, Popover } from 'antd'
import bg from '../assets/logo_usth.png'
import bg_user from '../assets/img/user_admin.png'
import { ADMIN_ATTENDANCE, ADMIN_LOGIN, ADMIN_STUDENT, ADMIN_SUBJECT, ADMIN_TABLE_REGISTER, ADMIN_TEACHER, ADMIN_USER, ADMIN_POST } from '../config/path';
import './PrivateLayout.css'
import getRole from "../config/function"
import { useHistory } from "react-router-dom";
import { breakcrump } from "./Breadcrumd";
import { ROLE_TEACHER } from "../config/const";

const { Header, Sider, Content } = Layout;

const PrivateLayout = (props) => {
    const {children} = props
    const location = useLocation()
    const history = useHistory()
    const role = getRole()

    let menuItems = [
        {key: ADMIN_STUDENT, path: ADMIN_STUDENT, content: "Student"},
        {key: ADMIN_SUBJECT, path: ADMIN_SUBJECT, content: "Subject"},
        {key: ADMIN_TEACHER, path: ADMIN_TEACHER, content: "Teacher"},
        {key: ADMIN_TABLE_REGISTER, path: ADMIN_TABLE_REGISTER, content: "Table Register"},
        {key: ADMIN_ATTENDANCE, path: ADMIN_ATTENDANCE, content: "Attendance"},
        {key: ADMIN_USER, path: ADMIN_USER, content: "User Account"},
        {key: ADMIN_POST, path: ADMIN_POST, content: "Post"}
    ]

    if(role === ROLE_TEACHER){
        menuItems = [
            {key: ADMIN_STUDENT, path: ADMIN_STUDENT, content: "Student"},
            {key: ADMIN_SUBJECT, path: ADMIN_SUBJECT, content: "Subject"},
            {key: ADMIN_ATTENDANCE, path: ADMIN_ATTENDANCE, content: "Attendance"},
            {key: ADMIN_POST, path: ADMIN_POST, content: "Post"}
        ]
    }

    const onLogout = () => {
        localStorage.removeItem("user")
        history.push(ADMIN_LOGIN)
    }

    const content = (
        <div className="private-layout-log-out-btn" onClick={onLogout}>Log out</div>
    )
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
        <Breadcrumb.Item key={url}>
            <Link to={url}>{breakcrump[url]}</Link>
        </Breadcrumb.Item>
        );
    });

    return (
        <Layout style={{ minHeight: '100vh' }}  hasSider>
            <Sider
                theme={'dark'}
                breakpoint="lg"
                collapsedWidth="0"
                width={272}
                defaultCollapsed={window.innerWidth < '992'}
            >
                <img src={bg} alt='usth logo'/>
                <Menu
                    className='private-layout-menu'
                    defaultSelectedKeys={[`/${location.pathname.split('/')[1]}/${location.pathname.split('/')[2]}`]}
                    mode="inline">
                    {menuItems.map(menuI => 
                        <Menu.Item key={menuI.key}>
                            <NavLink to={menuI.path}>{menuI.content}</NavLink>
                        </Menu.Item>
                    )}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    className='private-layout-header'
                >
                    <Breadcrumb>
                        {extraBreadcrumbItems}
                    </Breadcrumb>
                    <Popover
                        trigger="click"
                        content={content}
                        placement="bottom"
                    >
                        <img src={bg_user} alt="#" className="private-layout-user-icon"/>
                    </Popover>
                </Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default PrivateLayout
