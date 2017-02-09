import React from 'react'
import {Table} from 'antd'
import './AddProject.scss'
import ProjectForm from './ProjectForm'
class AddProject extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {project: dataSource};
    }

    handleSubmit = (values) => {
        // Do something with the form values

        this.props.saveProjectInfo(values);
        return false;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="item">
                        <h4>
                            {/*{this.props.project.project_name ? '修改 项目' : '添加 项目'}*/}
                        </h4>
                        <div className="item-main">
                            <ProjectForm onSubmit={this.handleSubmit} initialValues={this.props.project}/>
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
    loadProjectInfo: React.PropTypes.func.isRequired,
    saveProjectInfo: React.PropTypes.func.isRequired
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
}
// HomeView.propTypes = {
//     project:
// }
export default AddProject
