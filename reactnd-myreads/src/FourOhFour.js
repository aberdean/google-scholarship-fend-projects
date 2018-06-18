import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FourOhFour extends Component {
  render() {
    return (
      <div className="container">
        <div className="background"
          style={{ backgroundImage: 'url("/road-less-traveled.jpg")'}}>
        </div>
        <section>
          <h1>Looks like you just hit a Four Oh Four!</h1>
          <h2>You are now at a MyReads fork.</h2>
          <p>
            You may take the road less traveled and head deep into the woods,<br/>
            which may very well make all the difference,<br/>
            or you can go back to the safety of your bookshelves.
          </p>
          <Link to="/">
            <button>Back to Safety</button>
          </Link>
        </section>
      </div>
    )
  }
}

export default FourOhFour
