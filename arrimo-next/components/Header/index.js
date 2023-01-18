import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/dist/client/router";
import { checkAuth, clearUserInfoFromLocalStorage } from "../../utils/localStorageUtils/userInfo";

const Header = () => {

  const router = useRouter();

  const handleLogout = () => {
    clearUserInfoFromLocalStorage();
    router.push('/auth');
  }

  return (
    <header className="mb-4 orange">

      <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '20px' }}>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          {checkAuth() ?
            <div>
              <Link href={'/users'}><Button className="color-btn" >Users</Button></Link>
              <Link href={'/calendar-events'}><Button className="color-btn" >Events</Button></Link>
              <Button className="color-btn" onClick={handleLogout} >Logout</Button>
            </div> : null
          }
        </div>
      </nav>


      {/* <nav className="navbar navbar-expand-lg orange nav_bg mb-5" id="mainNav">
        <div className="container p-4 px-lg-5 d-flex">
          <div>
            <strong style={{ color: '#ffffff', cursor: "pointer" }}>Arimo Calendar</strong>
          </div>
          {checkAuth() ?
            <div>

              <Link href={'/users'}><span className="color-animo me-5">Users</span></Link>
              <Link href={'/calendar-events'}><span className="color-animo me-5">Events</span></Link>
              <Button className="color-btn" onClick={handleLogout} >Logout</Button>
            </div> : null
          }
        </div>
      </nav> */}
    </header>
  );
};

export default Header;
