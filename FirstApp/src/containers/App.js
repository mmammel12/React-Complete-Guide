import React, { PureComponent, Fragment } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: [
        { id: '123', name: 'Max', age: 28 },
        { id: '234', name:'Manu', age: 29 },
        { id: '345', name:'Marty', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
      console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);

    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');

    return null;
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // Below works on newer React, older versions initialize state in constructor()
  // state = {
  //   persons: [
  //     { id: '123', name: 'Max', age: 28 },
  //     { id: '234', name:'Manu', age: 29 },
  //     { id: '345', name:'Marty', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]; // ... is spread operator, in this case creates new array instead of reference
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // above function is more modern version of below
    // const person = Object.assign({}, this.state.persons[personIndex]); 

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => { 
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    } );
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render');
    let persons = null;


    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} 
        />
      );
    }

    return (
      <Fragment>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            login={this.loginHandler}
            clicked={this.togglePersonsHandler}
          />
          <AuthContext.Provider value={this.state.authenticated}>
            {persons}
          </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default withClass(App, classes.App);
