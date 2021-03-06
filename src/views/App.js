import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import DataList from './components/DataList';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const app = electron.remote.app;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            data: []
        }
    }

    componentDidMount() {
        const appPath = app.getAppPath();
        console.log(appPath);
        const path = app.getPath('userData');
        console.log(path);
        fs.readdir(appPath + '/data', (err, files) => {
            this.setState({files: files});
        });

        const data = JSON.parse(fs.readFileSync(appPath + '/data/data.json', 'utf-8'));
        this.setState({
            ...this.state,
            'data': data
        });
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
            <DataList data={this.state.data.slice(0,10)} />
        </div>);
    }
}

export default App;
