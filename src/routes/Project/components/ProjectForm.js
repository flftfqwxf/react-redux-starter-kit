import React from 'react'
import {Field, reduxForm} from 'redux-form/immutable'
class ProjectForm extends React.Component {
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
                <div className="form-group-dashed">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">
                            <span className="common-required">*</span>项目名称
                            {/*<input type="hidden" name="project_id" value={ this.props.project.project_id }/>*/}
                        </label>
                        <div className="col-sm-10">
                            <Field name="project_name" className="form-control" type="text" component="input"/>
                            <p className="help-block">用于区分不同项目的接口</p>
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label">
                            项目二次代理前缀
                        </label>
                        <div className="col-sm-10">
                            <Field name="proxy_url" className="form-control" type="text" component="input"/>
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
        )
    }
}
ProjectForm = reduxForm({
    form: 'simple',  // a unique identifier for this form
    // fields: ['project_name','proxy_url'],
    // initialValues: {project_name: "abc",proxy_url:'ddd'},
    // destroyOnUnmount: false
    enableReinitialize: true
})(ProjectForm)
export default ProjectForm