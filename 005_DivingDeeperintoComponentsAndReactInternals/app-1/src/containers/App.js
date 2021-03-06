import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxebla';
import withClass from '../hoc/WithClasses2';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

  constructor(props) {
    super(props);//Bu kesinlikler olmak zorunda
    console.log('[App.js] Inside Constructors', props);

    //Reactın eski versiyonlarında aşağıdaki şekilde bir kullanım sözkonusuydu. Modern react ta 
    //constructor içinde belirtmeden aşağıdaki kullanımda state tanımlamaları yapabiliriz.
    this.state = {
      persons: [
        { id: 'asdf', name: 'Max', age: 28 },
        { id: 'ewasdf', name: 'Manu', age: 29 },
        { id: 'asdfa', name: 'Stephanie', age: 26 },
        { id:'asfdsa',name:'İbrahim',age:45}
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked:0,
      authenticated:false
    }

  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMounth');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMounth')
  }

  /**
   * Aşağıdaki kontrolü her seferinde yapmak istemiyorsak PureComponent kullanabiliriz. PureComponent her seferinde 
   * gerekli kontrolleri bizim için gerçekleştirir. Ama her yerde de Pure Component kullanmamlıyız. Bu bizim uygulamamızın
   * performansının düşmesine neden olabilir.
   */
  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Update App.js] Inside shouldComponentUpdate');
    //Herhangi bir değişiklik olmadığı sürece render metodunu tetiklemeyecektir.
    return nextState.persons !== this.state.persons ||
      nextState.showPersons !== this.state.showPersons;
    //return true;
  }
  */

  componentWillUpdate(nextProps, nextState) {
    console.log('[Update App.js] Insided componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    //Bu noktada nextProps and nextStates currentProps and currentStates e dönüşür.
    console.log('[Update App.js] Insided componentDidUpdate');
  }

  static getDerivedStateFromProps(nextProps,prevState){
    console.log('[Update App.js] Insided getDerivedStateFromProps',nextProps,prevState);

    return prevState;
  }

  //render metodundan sonra didUpdateden önce çağrlır.
  getSnapshotBeforeUpdate(){
    console.log('[Update App.js] Insided getSnapshotBeforeUpdate');
  }
  /*
  state = {
    persons: [
      {id:'asdf', name: 'Max', age: 28 },
      {id:'ewasdf', name: 'Manu', age: 29 },
      {id:'asdfa', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  }
  */

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { id: 'asdfa', name: newName, age: 28 },
        { id: 'aasdfs', name: 'Manu', age: 29 },
        { id: 'asdfad', name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    })

  }

  togglePersonHandler = () => {
    const chagedShow = this.state.showPersons;
    
    //prevState alarak ekleme yapmak daha güvenli bir kullanım sağlar. Çünkü state herhangi bir yerde değiştirilmiş olabilir. 
    //Bu da hatalı sonuç almamıza neden olabilir.
    this.setState((prevState,props) => {
        return{
           showPersons: !chagedShow,
           toggleClicked: prevState.toggleClicked + 1
        }
    })

    /*
    this.setState({
      showPersons: !chagedShow,
      toggleClicked:this.state.toggleClicked + 1
    })
    */
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    })
  }

  loginHandler = () => {
     this.setState({authenticated:!this.state.authenticated});
  }

  render() {
    console.log('[App.js] Inseded render')

    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          click={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
        ;
    }

    return (
      <Aux>
          <button onClick = {() => {this.setState({showPersons:true})}}>Show Persons</button>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            click={this.togglePersonHandler}
            login={this.loginHandler} />
            
            <AuthContext.Provider value={this.state.authenticated}>
              {persons}
            </AuthContext.Provider>
          
      </Aux>
    );
  } 
}

export default withClass(App,classes.App);

//
//npm install --save radium
//npm run eject => geri dönüşü yoktur.
//npm install --save prop-types => Proptypes ile validation kontrolleri yapmak için kullandık
//  

/********************************************************************************
 * Developer modda ErrorBoundary sayfasını göremeyiz. Uygulamamızı bir sunucuya *
 * eklediğimiz zaman hata sayfasını gösterecektir.                              *
 *******************************************************************************/