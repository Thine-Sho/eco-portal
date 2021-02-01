import React from 'react';
import '../CSS/components.css';

import SubmissionForm from './submit-agenda';
import AgendaList from './display-agenda';

import { GoogleSpreadsheet } from "google-spreadsheet";

const gconfig = require('../portal-database.json');
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
const SPREADSHEET_ID = '1p0xCazg52rs2XVjsMh7BtZyQygm2H7oM5BcPARUIheA';
const SHEET_ID = '1177978586';

export class DatabaseHandler extends React.Component {
  constructor(props)
   {
    super(props);

    this.loadSpreadsheet = this.loadSpreadsheet.bind(this);
    this.sheetHandler = this.sheetHandler.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.pullData = this.pullData.bind(this);

    this.state = {
        doc: null,
        info: {},
        rows: null,
        btnChoiceContent: -1,
        displaySubmissionForm: false,
        promiseResolved: false,
        alertM: ""
    }
  }

    async loadSpreadsheet(obj={}, choice=-1){
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        this.setState({doc: doc}, function(){
            this.setState({info: obj});
            this.sheetHandler(choice);
        });
    }

    async sheetHandler(choice){
        try {
        await this.state.doc.useServiceAccountAuth(gconfig, gconfig.client_email);
        await this.state.doc.loadInfo();
        const sheet = this.state.doc.sheetsById[SHEET_ID];
        switch(choice){
            case 0:
                this.uploadData(this.state.info, sheet);
                break;
            case 1:
                this.pullData(sheet);
                break;
            default:
                console.error("ERROR: sheetHandler(); {NO CHOICE}");
                break;
        }
        } catch (e) {
        console.error('Error: ', e);
        }
    }

//########################################
    async uploadData(row, sheet){
        try{
            const result = await sheet.addRow(row);
            console.log("UPLOADED TO: " + sheet.title);
            this.setState((state) => ({isValid: true}));
            this.setState({alertM: "UPLOADED TO: " + sheet.title});
            setTimeout(()=>{this.setState({alertM: ""});}, 2000);
        } catch (e) {
            console.error("ERROR: " + e);
        }
    }
    async pullData(sheet){
        this.setState({loaded: false});
        try{
            const rows = await sheet.getRows();
            // const result = Promise.resolve(rows);
            this.setState({rows: rows});
            console.log("PULLED FROM: " + sheet.title);
        } catch (e) {
            console.error("ERROR: " + e);
        }
        if(this.state.rows.length >= 1){
            this.setState({promiseResolved: true});
        }
    }
//########################################

componentDidMount(){
    this.loadSpreadsheet({}, 1);
}

displaySubForm = (e) => {
    this.setState({displaySubmissionForm: !this.state.displaySubmissionForm});
    console.log("Working: " + this.state.displaySubmissionForm);
}

  render()
  {
    let component = null;
    if(this.state.rows){
        component = <AgendaList content={this.state.rows}/>
    }else{
        component = "loading...";
    }

    let primary_component = null;
    if(this.state.displaySubmissionForm){
        primary_component = <SubmissionForm upload={this.loadSpreadsheet}/>
    }

    return(
        <div>
            <div className="alert-message" style={{display: (this.state.alertM.length >= 1)? 'inline-block':'none'}}>{this.state.alertM}</div>
            <div id="task-bar">
                <li><button onClick={this.displaySubForm}>{(this.state.displaySubmissionForm) ? 'Hide':'Upload'}</button></li>
            </div> 
            <section>
                <div>{primary_component}</div>
                <div>{component}</div>
            </section>
        </div>
    );
  }
}

export default DatabaseHandler
