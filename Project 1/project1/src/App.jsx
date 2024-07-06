import './App.css';
import Menu from './components/Menu'
import headerimage from './assets/Images/header.png';

const App = () => {

  return (
    <div className="App">
         <img src={headerimage} alt="twinscroll" className="header-image"/>
        <h1>Resources for studying Japanese</h1>
        <h2>日本語を勉強しましょう！</h2> 
        <Menu />     
    </div>
  )
}

export default App

