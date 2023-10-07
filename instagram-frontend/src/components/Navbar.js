import Home from './Navbar/Home';
import './Navbar.css';
import Search from './Navbar/Search';
import Post from './Navbar/Post';
import Profile from './Navbar/Profile';

function Navbar({ homeRedir, searchRedir, postRedir, profileRedir }) {
    return (
        <>
            <div className="navbar">
                <Home homeRedir={homeRedir}/>
                <Search searchRedir={searchRedir}/>
                <Post postRedir={postRedir}/>
                <Profile profileRedir={profileRedir}/>
            </div>
        </>
    )
}

export default Navbar;
//<HomeNav />
//<SearchNav />
//<PostNav />
//<ProfileNav />