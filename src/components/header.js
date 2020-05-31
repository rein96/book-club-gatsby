import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from './firebase/index';
import styled from 'styled-components';

const Header = ({ siteTitle }) => {

  const { firebase, user } = useContext(FirebaseContext)
  console.log({ firebase, user })

  const handleLogoutClick = () => {
    firebase.logout().then(() => {
      navigate('/login')
    })
  }

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: 'flex',
        }}
      >
        <h1 style={{ margin: 0, flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div style={{ margin: 'auto 0' }}>
          {
            user && user.email
            &&
            <div>
              Hello, {user.email}
              <div style={{ textAlign: 'right' }}>
                <LogoutLink onClick={handleLogoutClick}>
                  Logout
              </LogoutLink>
              </div>
            </div>
          }
          {
            (!user || !user.email) &&
            <div>
              <Link to='/login'>
                Login
            </Link>
            </div>
          }
        </div>

      </div>
    </header>
  )
}
const LogoutLink = styled.span`
  color: white;
  cursor:pointer;
  
  &:hover{
    text-decoration: underline;
  }
`

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  
  >h1{
    margin: 0;
    flex-grow:1;
    
    >a{
      color: white;
      text-decoration: none;
    }
   
  }
  >div{
      margin: auto 0;
    }
`

const UserInfo = styled.div`
  text-align: right;
  color: white;
`

const LoginLink = styled.div`
  margin: auto 0;
  a{
    color:white;
  }
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

const AdminLink = styled.span`
  a{
    color: white;
  }
`

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
