import React from 'react'
import {Table, message} from 'antd'
import './HomeView.scss'
import {IndexLink, Link} from 'react-router'
class HomeView extends React.Component {
    constructor(props) {
        // props.project = [{
        //     key: '1',
        //     name: '胡彦斌',
        //     age: 32,
        //     address: '西湖区湖底公园1号'
        // }, {
        //     key: '2',
        //     name: '胡彦祖',
        //     age: 42,
        //     address: '西湖区湖底公园1号'
        // }];
        super(props);
        this.state = {
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'project_id',
                    key: 'project_id',
                },
                {
                    title: '项目名称',
                    dataIndex: 'project_name',
                    key: 'project_name',
                }, {
                    title: '代理前缀',
                    dataIndex: 'proxy_url',
                    key: 'proxy_url',
                },
                {
                    title: '状态',
                    dataIndex: 'open_proxy',
                    key: 'open_proxy',
                    render: text => {
                        return text === 1 ? '开启' : '关闭'
                    }
                },
                {
                    title: '操作', dataIndex: '', render: (item) => {
                    return (
                        <span>
                            <a href="javascript:;" onClick={()=>this.delete(item.project_id)}>删除</a>&nbsp;
                            <Link to={{pathname: '/project/edit/' + item.project_id}} activeClassName='route--active'>
                                    修改
                                </Link>&nbsp;
                            <a href="javascript:;" onClick={this.props.copy}>复制</a>&nbsp;
                            <a href="javascript:;" onClick={this.props.show}>查看接口</a>
                        </span>
                    )
                }
                },
            ]
        };
        // this.state = {project: dataSource};
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="item">
                        <div className="item-head clearfix">
                            <h4 className="pull-left">项目列表</h4>
                            <span style={{paddingRight: '20px', float: 'right'}}>
                                <Link className="btn btn-info" to='/project/add' activeClassName='route--active'>
                                    添加项目
                                </Link>
                           </span>
                        </div>
                        <div className="item-main">
                            <Table rowKey="project_id" dataSource={this.props.projectList} columns={this.state.columns}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    delete(id, index) {
        this.props.deleteProjectInfo(id, function(data) {
            message.info(data.msg);
        });
    }

    componentWillMount() {
        this.props.loadProjectList();
    }
}
HomeView.propTypes = {
    loadProjectList: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
}
HomeView.defaultProps = {
    columns: [],
    // project: dataSource
    delete: function(id) {
        this.props.deleteProjectInfo(id, function(data) {
            message.info(data.msg);
        });
    },
    copy(){
    },
    show(){
    },
    edit(){
    }
}
// HomeView.propTypes = {
//     project:
// }
export default HomeView
