import React from 'react';
import '../CSS/components.css';


export class QueryList extends React.Component {
  constructor(props)
   {
    super(props);
    this.state = {
        list: null,
        search: "",
        securtiy: "false",
        date: ""
    }
  }
  
  componentDidMount(){}

  updateInputState = (event) => {
    
    let name = event.target.name;
    let val = event.target.value;

    if(val.length > -1){
        this.setState({[name]: val});
    }
  }

  render()
  {
    return(
        <ul id="query-container">
            <li>
                <input type='text' name="search" value={this.state.search} onClick={this.updateInputState} placeholder="Search"/>
            </li>
            <li>
                <input type='date' name="date" value={this.state.date} onClick={this.updateInputState} />
            </li>
            <li>
                <select name="security" value={this.state.security} onClick={this.updateInputState} >
                    <option value="true">secure</option>
                    <option value="false">unsecure</option>
                </select>
            </li>
        </ul>
    );
  }
}

export default  QueryList

