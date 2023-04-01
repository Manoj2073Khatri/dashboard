
import { RiSearchLine } from 'react-icons/ri';
import { BiEnvelope } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GoThreeBars } from 'react-icons/go';
import { useDispatch} from 'react-redux'
import { toggleArrowState } from '../../reduxStore/reducer/sidebarToggleSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logOut } from '../../reduxStore/reducer/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeaderTopBar = () => {

    const [user, setUser] = useState<string>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut=()=>{
        sessionStorage.removeItem('user')
        navigate('/login');

    } 

    useEffect(() => {
        let name = JSON.parse(sessionStorage.getItem('user')??'{name:""}').name?? '';
      setUser(name)
      return () => {
      }
    }, [])
    
    return (
        <>
            <div className="header-topbar">
                <div className="d-flex d-md-none">
                    <button type="button" className="bg-transparent border-0 fs-5 navbar-toggle" onClick={() => dispatch(toggleArrowState())}><GoThreeBars /></button>
                    <a href="/Dashboard" className="fs-5 fw-bold p-2 text-decoration-none text-body">VerySmart</a>
                </div>
                {/* <div className="search-bar">
                    <span className="search-icon">
                        <RiSearchLine />
                    </span>
                    <input type="text" className="search-input form-control" placeholder="Quick search..." />
                    <span className="search-shortcut-key">Ctrl K</span>
                </div> */}
                <div className="user-actions d-flex align-items-center gap-2">
                    <OverlayTrigger
                        placement={'bottom'}
                       
                        rootClose
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                <strong>Message</strong>.
                            </Tooltip>
                        }
                    >
                        <button type="button">
                            <BiEnvelope />
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement={'bottom'}
                      
                        rootClose
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                <strong>Notification</strong>
                            </Tooltip>
                        }
                    >
                        <button type="button">
                            <BiBell />
                        </button>
                    </OverlayTrigger>
                   
                    <DropdownButton
                        variant=''
                        align="end"
                        title={ <FaRegUserCircle />}
                        id="dropdown-menu-align-end"
                        >
                        <div className='px-3 py-2 d-flex justify-content-center align-items-center'>
                            <FaRegUserCircle size={54}  className='me-3 text-black-50'/>
                            <div className='flex-grow-1'>
                                <h6 className='m-0 text-black'>Name</h6>
                                <span className='small text-muted'> {user} </span>
                            </div>
                        </div>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" >Profile</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={()=>logOut()}>Logout</Dropdown.Item>
                    </DropdownButton>
                   


                </div>
            </div>

        </>
    )
}

export default HeaderTopBar