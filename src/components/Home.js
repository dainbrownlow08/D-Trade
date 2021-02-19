import React from 'react' 

class Home extends React.Component{
    render(){
        return(
            <div>
            <div style={{ color: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center',}}><h1>Welcome to D-Trade</h1>
            </div><br></br><br></br>
            <div style={{color: '#c0c0c0'}}>
            <h2>We wanted to create a web application where people new to the cryptocurrency world can practice safely in a real market situation without the risk of using their own money. There are many first time traders today with the digital age and more people then ever having access to the market on the web. Our goal was to create a succinct and fun user experience from the mind of someone brand new to trading.</h2>
            </div>
            <footer style={{color: '#c0c0c0', position: 'absolute', bottom: '0', height: '2.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Created By: Dain Brownlow and Dustin Rothschild</footer>
            </div>
        )
        }
}

export default Home
