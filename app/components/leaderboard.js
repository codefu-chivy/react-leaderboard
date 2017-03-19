import React from "react";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leadArr: [],
    }
  }
  componentDidMount = () => {
    $.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent", (data) => {
      this.setState({
        leadArr: data,
      })
    })
  };
  sortData = (e) => {
    if (e.target.textContent.indexOf("recent") !== -1) {
      this.setState({
        leadArr: this.state.leadArr.sort(function(a, b) {return b.recent - a.recent})
      })
    }
    else {
      this.setState({
        leadArr: this.state.leadArr.sort(function(a, b) {return b.alltime - a.alltime})
      })
    }
  };
  render() {
    const div = this.state.leadArr.map(function(ele, index){return <div key={index} className="content"><a className="link" href={"https://www.freecodecamp.com/" + ele.username} target="_blank"><img src={ele.img}/>
      <h3>{index+=1}</h3>
      <h3 id="name">{ele.username}</h3>
      <h4>Recent Score: <span>{ele.recent}</span></h4>
      <h4>Alltime Score: <span>{ele.alltime}</span></h4>
      </a>
    </div>
    });
    return(
      <div>
        <h1>freeCodeCamp Leaderboard: Top 100</h1>
        <a onClick={this.sortData} className="sort" href="#">Sort by recent</a>
        <a onClick={this.sortData} className="sort" href="#">Sort by all time</a>
        <div className="wrapper">
          {div}
        </div>  
      </div>  
    )
  }
}