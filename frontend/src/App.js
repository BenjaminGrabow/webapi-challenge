import React from 'react';
import water from './water.jpg';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

const StyledApp = styled.div`
background-image: linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${water});
background-position: center;
background-repeat: no-repeat; 
background-size: cover;
height: 250vh;
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

.items {
  display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  width: 50%;
  font-size: 1.5rem;
  height: 20rem;
  margin: 1rem;
}

.h1 {
  margin: 0;
}

.off {
  display: none;
}

button {
background-color: red;
border-radius: 50%;
width: 15%;
height: 10rem;
box-shadow: 1rem .5rem .5rem black;
}

input {
    border-radius: 3rem; 
    box-shadow: 1rem .5rem .5rem black;
    font-size: 1.5rem; 
}

.form {
  position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 4rem;
margin-bottom: 3rem;
display: flex;
justify-content: space-around;

button {
border-radius: 50%;
width: 15%;
height: 5rem;

}
}
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProject: '',
      name: '',
      description: '',
      dataAction: '',
      action: false,
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3500/api/project')
      .then(res => {
        this.setState({
          dataProject: res.data
        })
      })
      .catch(err => console.log(err));
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  delete = (id) => {
    axios.delete(`http://localhost:3500/api/project/${id}`)
      .then(res => {
        return axios.get('http://localhost:3500/api/project')
          .then(res => {
            this.setState({
              dataProject: res.data,
            });
          });
      })
      .catch(err => console.log(err))
  };

  update = (id) => {
    const newProject = {
      "name": this.state.name,
      "description": this.state.description,

    };

    axios.put(`http://localhost:3500/api/project/${id}`, newProject)
      .then(res => {
        return axios.get('http://localhost:3500/api/project')
          .then(res => {
            this.setState({
              dataProject: res.data,
            });
          });
      })
      .catch(err => console.log(err))

    this.setState({
      name: '',
      description: '',
    });
  };

  post = () => {
    const newProject = {
      "name": this.state.name,
      "description": this.state.description,
    };

    axios.post('http://localhost:3500/api/project', newProject)
      .then(res => {
        return axios.get('http://localhost:3500/api/project')
          .then(res => {
            this.setState({
              dataProject: res.data,
            });
          });
      })
      .catch(err => console.log(err))

    this.setState({
      name: '',
      description: '',
    });
  };

  showActions = (id) => {
    axios.get(`http://localhost:3500/api/action/${id}`)
      .then(res => {
        debugger
        this.setState({
          dataAction: res.data,
          action: true,
        });
      })
      .catch(err => console.log(err))
  }

  close = () => {
    this.setState({
      dataAction: '',
      action: false
    });
  };

  render() {
    if (this.state.dataProject) {
      return <StyledApp>
        {this.state.dataProject.map(item => {
          return <div
          className="items" 
          key={item.id}>
            <h1>Project</h1>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <button onClick={() => this.delete(item.id)}>X</button>
            <button onClick={() => this.update(item.id)}>update</button>
            <button onClick={() => this.showActions(item.id)}>Actions</button>
            {this.state.action ? (<div
              className={this.state.action ? 'on' : 'off'}>
              <p>description{this.state.dataAction.description}</p>
              <p>description{this.state.dataAction.notes}</p>
              <button onClick={this.close}>X</button>
            </div>) : null}
          </div>
        })}
        <div className="form">
        <input name="name" value={this.state.name} placeholder="name" onChange={this.changeHandler} />
        <button onClick={this.post}>add</button>
        <input name="description" value={this.state.description} placeholder="description" onChange={this.changeHandler} />
        </div>
      </StyledApp>
    }
    return (
      <div className="App">
        helloooooo
      </div>
    );
  }
}

export default App;