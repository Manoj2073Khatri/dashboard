
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { HiLogin, HiLogout ,HiArrowNarrowDown} from 'react-icons/hi'
import { MdOutlineDesktopWindows } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import { RiAdminFill } from 'react-icons/ri'
import type { RootState } from '../../reduxStore/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleArrowState } from '../../reduxStore/reducer/sidebarToggleSlice'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/VerySmart.png';

const Sidebar = () => {
    const show = useSelector((state: RootState) => state.sidebarToggle.value)
    const dispatch = useDispatch()

    return (
        // <!-- aside navigation starts -->
        <>
            <aside className="sidebar">
                <div className=" navbar-vertical">
                    <div className="navbar-logo">
                        <a className="navbar-brand text-white h4 mb-0 fw-bold text-decoration-none" href='/'>
                            <span className="navbar-brand-icon me-1"><img width={20} height={20} src={logo} alt='VS'></img></span>
                            <span className="navbar-brand-text">VerySmart</span>
                        </a>

                        {/* <i className="menu-fold uil uil-left-arrow-from-left"></i> */}
                        <OverlayTrigger
                            //    className="navbar-toggle" 
                            key={'right'}
                            placement={'right'}

                            rootClose
                            overlay={
                                <Tooltip id={`right`}>
                                    <strong>Show/Hide Sidebar</strong>.
                                </Tooltip>
                            }
                        >
                            <span className="navbar-toggle" onClick={() => dispatch(toggleArrowState())}>
                                {
                                    show ? <HiLogout className='menu-fold uil-left-arrow-from-left' /> : <HiLogin className='menu-unfold uil-arrow-to-right' />
                                }


                            </span>


                        </OverlayTrigger>

                       
                    </div>
                    <div className="navbar-wrapper">
                       
                        <ul className="navbar-nav">
                            <li className="nav-item">

                                <NavLink to="/dashboard" className="nav-link">
                                    <span className="nav-icon d-flex"><MdOutlineDesktopWindows /></span>

                                    <span className="nav-text">Dashboard</span>
                                </NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to="/admins" className="nav-link">
                                <span className="nav-icon d-flex"><RiAdminFill /></span>
                                <span className="nav-text">Manage Admins</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/extractedDocuments" className="nav-link">
                                <span className="nav-icon d-flex"><CgFileDocument /></span>
                                <span className="nav-text">Extracted Documents</span>
                                </NavLink>
                            </li>
                            {/* <li className="nav-item has-collapse">
                                <a className="nav-link" href="#sdsd" title="Case Group">
                                    <span className="nav-icon"><CgFileDocument /></span>
                                    <span className="nav-text">Menu</span>
                                    <span className="nav-toggle"><HiArrowNarrowDown/></span>
                                </a>
                                <div className="navbar-submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                           <NavLink to="/extractedDocuments" className="nav-link">
                                                <span className="nav-text">Sub menu 1</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/dashboard" className="nav-link">
                                                <span className="nav-text">Sub menu 2</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}

                             
                        </ul>
                    </div>
                    <div className="navbar-footer">
                        <span>&copy; VerySmart 2022. All Rights Reserved.</span>
                    </div>
                </div>
            </aside>
        </>
        // <!-- aside navigation ends -->
        
    )
}

export default Sidebar