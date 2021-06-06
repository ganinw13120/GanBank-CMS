import React, { Component } from "react";
class Logout extends Component{
    componentDidMount(){
      localStorage.removeItem('token')
      localStorage.removeItem('level')
      window.location.reload();
    }
  render () {
    return (
      <>
      </>
    )
  }
}
export default Logout