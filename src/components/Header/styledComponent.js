import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  height: 65px;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor};
  @media screen and (min-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`
export const ImgEl = styled.img`
  height: 60px;
  width: 140px; ;
`
export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const ThemeButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 9px;
`
export const ProfileImage = styled.img`
  height: 28px;
  width: 30px;
  margin-right: 9px;
`
