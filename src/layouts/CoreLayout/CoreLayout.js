import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Top from '../../components/Top'
// import './CoreLayout.scss'
// import '../../styles/core.scss'
export const CoreLayout = ({children}) => (
    <div className="page-wrapper">
        <Sidebar></Sidebar>
        <div className="page-content-wrapper">
            <Top></Top>
            <div className="page-content-outer">
                <div className="page-content-inner">
                    <div className="page-content">
                        <div className="page-main">
                            {children}
                        </div>
                    </div>
                    <div className="page-footer">
                        <ul className="pull-left">
                            <li>github：github.com/flftfqwxf</li>
                            <li>qq：120377576</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}
export default CoreLayout
