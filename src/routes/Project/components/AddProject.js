import React from 'react'
import {Table} from 'antd'
import './AddProject.scss'
import {IndexLink, Link} from 'react-router'
class AddProject extends React.Component {
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
        super(props)
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
                    render: text => {
                        return text === 1 ? '开启' : '关闭'
                    }
                }
                ,
                {
                    title: '操作', dataIndex: '', key: 'x', render: () => {
                    return (
                        <span>
                            <a href="javascript:;" onClick={this.props.delete}>删除</a>&nbsp;
                            <a href="javascript:;" onClick={this.props.edit}>修改</a>&nbsp;
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
                        <h4>
                            {this.props.project.project_name ? '修改 项目' : '添加 项目'}
                        </h4>
                        <div className="item-main">
                            <form className="form-horizontal" id="formId" method="post" action="/home2/project/update">
                                <div className="form-group-dashed">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">
                                            <span className="common-required">*</span>项目名称
                                            <input type="hidden" name="project_id" value={ this.props.project.project_id }/>
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="project_name" value={ this.props.project.project_name } className="form-control"/>
                                            <p className="help-block">用于区分不同项目的接口</p>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <label className="col-sm-2 control-label">
                                            项目二次代理前缀
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" name="proxy_url" value={ this.props.project.proxy_url } className="form-control" placeholder="请输入要求输入的内容"/>
                                            <p className="help-block">格式如:http://192.168.1.2</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group-dashed">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label"></label>
                                        <div className="col-sm-10">
                                            <button className="btn btn-default" type="button">取消</button>
                                            <button className="btn btn-info" type="submit">保存修改</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount() {
        if (this.props.params.project_id) {
            this.props.loadProjectInfo(this.props.params.project_id);
        }
    }
}
AddProject.propTypes = {
    loadProjectInfo: React.PropTypes.func.isRequired
}
AddProject.defaultProps = {
    columns: [],
    // project: dataSource
    delete: function() {
        alert(2)
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
export default AddProject
