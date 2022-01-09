import React, {Component} from 'react';
import './App.css';
import {XO} from "./components/XO";

class App extends Component {


    render() {
        return (
            <div className="App">

                <XO/>
            </div>
        )
    }
}

export default App;