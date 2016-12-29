import React from 'react'
import {Table} from 'antd'
import './HomeView.scss'
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
            columns: [{
                title: 'ID',
                dataIndex: 'project_id',
                key: 'project_id',
            }, {
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
                },
                {title: '操作', dataIndex: '', key: 'x', render: () => (<a href="javascript:;" onClick={this.props.delete}>删除</a>)},
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
                            <a className="btn btn-info" href="/home2/project/add.html">添加项目</a>
                                                        </span>
                        </div>
                        <div className="item-main">
                            <Table dataSource={this.props.project} columns={this.state.columns}/>
                        </div>
                    </div>
                </div>
            </div>
        )
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
    delete: function() {
        alert(2)
    }
}
// HomeView.propTypes = {
//     project:
// }
export default HomeView
