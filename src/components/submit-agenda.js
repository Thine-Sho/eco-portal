import React from 'react';
import '../CSS/components.css';

var randomWords = require('random-words');

export class SubmissionForm extends React.Component {
  constructor(props)
   {
    super(props);
    this.state = {
        id: "",
        date: "",
        year: new Date().getFullYear(),
        title: "",
        link: "",
        locked: "false",
        pswd: "",
        errorM: ""
    };
  }

  updateInputState = (event) => {
    
    let name = event.target.name;
    let val = event.target.value;

    if(val.length > -1){
        this.setState({[name]: val});
    }
  }

  updateId = () => {
      const id = randomWords()+"_"+Math.floor(Math.random() * Math.floor(1500));
      let encrypt = null;
      for(let i=0; i<id.length; i++){
          encrypt += id.charCodeAt(i);
      }
      encrypt = randomWords()[1] + "#" + encrypt.toString(16) + "@_" + randomWords()[0];
      this.setState({id: encrypt});
      console.log(encrypt);
  }

  upload = () => {
      this.updateId();
      if(this.state.date && this.state.title.length >= 1){
          if(this.state.id && this.state.link.length >= 5){
              this.setState({errorM: ""});
              this.props.upload(this.state, 0);
              setTimeout(()=>{this.emptyTextField();}, 1000)
          }else if(this.state.link.length <= 5){
            this.setState({errorM: "MISSING INFO"});
          }
      }else if(!this.state.date || this.state.title.length <= 1 ){
        this.setState({errorM: "MISSING INFO"});
      }
  }

  componentDidMount(){
    this.updateId();
  }

  emptyTextField = () =>{
      this.setState(
          {
            id: "",
            date: "",
            title: "",
            link: "",
            locked: "false",
            pswd: ""
          }
      );
  }

  render()
  {
    return(
        <div id="submissiton-form">
            <div className="error-message" style={{display: (this.state.errorM.length >= 1)? 'inline-block':'none'}}>{this.state.errorM}</div>
            <input type="date" name="date" value={this.state.date} onChange={this.updateInputState} placeholder="yyyy-mm-dd"/>
            <input type="text" name="title" value={this.state.title} onChange={this.updateInputState} placeholder="Title"/>
            <input type="text" name="link" value={this.state.link} onChange={this.updateInputState} placeholder="Link to File"/>
            <select name="locked" value={this.state.locked} onChange={this.updateInputState}>
                <option value="true">secure</option>
                <option value="false">unsecure</option>
            </select>
            <input type="text" name="pswd" value={this.state.pswd} style={{display: (this.state.locked === "false") ? 'none':'block'}} onChange={this.updateInputState} placeholder="password"/>
            <button id="smf-upload"onClick={()=>{this.upload();}}>Upload</button>
        </div>
    );
  }
}

export default SubmissionForm

