import React from 'react';
import './App.css';
import store from './store';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      out: '0'
    }
    this.refOutPut = React.createRef();
  }

  tapeNumber (value){
    let currentValue = value;
    let outPut = this.refOutPut.current;
    this.setState( {
      out: currentValue
    });

    if(outPut.value === '0'){
        outPut.value = '';
    }

    outPut.value += currentValue;
  }

  tapeOperations (value){
    let outPut = this.refOutPut.current;

    if (value === 'CE'){
      if(outPut.value.length === 1){
        outPut.value = '0';
      } else {outPut.value = outPut.value.substring(0, outPut.value.length -1);}
      
    }

     else if (value === 'C'){
      outPut.value = '0';
    }

    else if (value === '='){
      try {outPut.value = eval(outPut.value);}
      catch {outPut.value = 'NOPE';
            setTimeout(() => {
              outPut.value = '0';
            }, 1500);
    }
      
    }
  }

  render(){
    return(<>
    
    <div className='container'>
      <div className='outPut'>
        <input ref={this.refOutPut} type="text" defaultValue={this.state.out} />
        <div className='buttons'>
          {store.buttons.map( (item, index) => <button key ={index} onClick={() => {this.tapeNumber(item.val)}}>{item.val}</button>)}
          {store.operations.map( (item, index) => <button key={index} onClick={() => {this.tapeOperations(item.val)}}>{item.val}</button>)}
        </div>
      </div>
    </div>
    
    
    </>)
  }
}

export default App;
