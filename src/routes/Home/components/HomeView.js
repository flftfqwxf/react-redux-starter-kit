import React from 'react'
import {Table} from 'antd'
import './HomeView.scss'
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];
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
        this.state = {project: dataSource};
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
                            <Table dataSource={this.props.project} columns={columns}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
HomeView.defaultProps = {
    project: dataSource
}
// HomeView.propTypes = {
//     project:
// }
export default HomeView
