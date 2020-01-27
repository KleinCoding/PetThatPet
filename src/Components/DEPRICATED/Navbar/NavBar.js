import React from 'react'
import {HashRouter, Link} from 'react-router-dom'
import './NavBar.css';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            menuStatus: 'drop-down-menu'
        }
    }

    handleClick = () => {
        if (this.state.menuStatus === 'drop-down-menu-open') {
            this.setState({ menuStatus: 'drop-down-menu-closed'})
        } else {
            this.setState({ menuStatus: 'drop-down-menu-open'})
        }
    }

    render() {
        return (
            <HashRouter>
            <header>
                
                <link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Montserrat:400,400i,900|Roboto+Slab&display=swap" rel="stylesheet"></link>
                <h2 className = "site_name">Pet That Pet!!</h2>
                <ul id='site-nav'>
                    <li className='menu-text'><Link to='/Home'>Login</Link></li>
                    <li className='menu-text'><Link to='/Landing'>Profile</Link></li>
                    <li className='menu-text'><Link to='/'>Pets</Link></li>
                    <li>
                        <img className ="MenuIcon"
                            onClick={this.handleClick}
                            src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
                            alt='Menu icon'
                        />
                    </li>
                    <ul className={this.state.menuStatus}>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Donate!</li>
                    </ul>
                </ul>
                <div></div>
            </header>
            </HashRouter>
        )
    }
}
