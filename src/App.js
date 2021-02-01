import React from 'react';
import './CSS/App.css';

import DatabaseHandler from './components/database-module';

export class App extends React.Component {
  render()
  {
    return(
       <section>
        <DatabaseHandler />
       </section>
    );
  }
}

export default App

