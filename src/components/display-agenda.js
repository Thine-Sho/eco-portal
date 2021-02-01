import React from 'react';
import '../CSS/components.css';


export class AgendaList extends React.Component {
  constructor(props)
   {
    super(props);
    this.state = {
        list: null,
        activeAgenda: null,
        correctPassword: false
    }
  }

  format(item){
    //   console.log(item);
      return(
          <li id="agenda-list-item" key={item.id}>
            <button onClick={()=>{this.doSomethingTest(item);}} id="list-btn">
                <ul>
                    <li>{item.date}</li>
                    <li>{item.year}</li>
                    <li>{item.title}</li>
                    <li className="lock-icon" style={{display: item.locked === "TRUE" ? 'inline-block':'none'}}><span>&#128274;</span></li>
                </ul>
            </button>
          </li>
      );
  }

  doSomethingTest = (item) => {
        if(item.locked === "TRUE"){
            this.validatePassword(item.pswd, item.link);
        }else{
            this.setState({activeAgenda: item.link});
        }
  }

  validatePassword = (pass, link) => {
      const prompt_pass = window.prompt('Enter Password: ');
      const prevAgenda = this.state.activeAgenda;
      if(prompt_pass === pass){        
          this.setState({activeAgenda: link});
          console.log("GOOD");
      }else if(prompt_pass !== pass){
          const response = window.confirm("Sorry Incorrect Password");
          if(response === true){
              this.validatePassword(pass, link);
          }
      }
  }
  
  render()
  {
    return(
        <div id="display-grid-container">
            <div id="agenda-roster" className="item-1" style={{'border-right': '2px solid grey'}}>{this.props.content.map((item, i) => {
                console.log(item);
                return this.format(item);
            })}
            </div>

            <div className="item-2" style={{display: (this.state.activeAgenda === null) ? 'none':'block'}}>
                <iframe src={this.state.activeAgenda} width="auto"></iframe>
            </div>
        </div>
    );
  }
}

export default AgendaList

