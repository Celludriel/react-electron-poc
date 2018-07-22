import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import * as RxDB from 'rxdb';
import {QueryChangeDetector} from 'rxdb';
import { schema } from './../db/Schema';

import DataList from './components/DataList';

//Electron setup
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const app = electron.remote.app;

//RXDB setup
QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

RxDB.plugin(require('pouchdb-adapter-idb'));

const dbName = 'carddb';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            data: {"cards": []}
        }
    }

    async createDatabase() {
      // password must have at least 8 characters
      const db = await RxDB.create(
        {name: dbName, adapter: 'idb', password: '12345678'}
      );
      console.dir(db);

      // show who's the leader in page's title
      db.waitForLeadership().then(() => {
        document.title = '♛ ' + document.title;
      });

      // create collection
      await db.collection({
        name: 'cards',
        schema: schema
      });

      return db;
    }

    async componentDidMount() {
        const appPath = app.getAppPath();
        console.log(appPath);
        const path = app.getPath('userData');
        console.log(path);
        fs.readdir(appPath + '/data', (err, files) => {
            this.setState({files: files});
        });

        const data = JSON.parse(fs.readFileSync(appPath + '/data/data.json', 'utf-8'));
        this.setState({
            data: Object.assign({}, this.state.data, {cards: data.cards})
        });

        this.db = await this.createDatabase();
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit
                <code>src/App.js</code>
                and save to reload.
            </p>
            <DataList data={this.state.data.cards.slice(0,10)} />
        </div>);
    }
}

export default App;
