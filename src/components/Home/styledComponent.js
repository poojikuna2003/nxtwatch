import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 93vh;
  margin-top: 58px;
  @media screen and (min-width: 768px) {
    margin-top: 63px;
    margin-left: 220px;
  }
`

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 10px;
  height: 30vh;
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  padding: 10px;
`
export const BannerImg = styled.img`
  height: 70px;
  width: 180px;
`
export const BannerGetButton = styled.button`
  background-color: transparent;
  border: 1px solid #606060;
  width: 100px;
`
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  align-self: flex-start;
`

export const HomeBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`
export const SearchInput = styled.input`
  margin-left: 9px;
  width: 600px;
  display: flex;
  flex-direction: row;
`
