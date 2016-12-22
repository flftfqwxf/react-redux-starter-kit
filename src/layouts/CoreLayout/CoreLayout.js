import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Top from '../../components/Top'
// import './CoreLayout.scss'
// import '../../styles/core.scss'
export const CoreLayout = ({children}) => (
    <div class="page-wrapper">
        <Sidebar></Sidebar>
        <div class="page-content-wrapper">
            <Top></Top>
            <div class="page-content-outer">
                <div class="page-content-inner">
                    <div class="page-content">
                        <div class="page-main">
                            {children}
                        </div>
                    </div>
                    <div class="page-footer">
                        <ul class="pull-left">
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
