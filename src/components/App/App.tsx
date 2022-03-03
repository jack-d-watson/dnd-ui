import './App.css';
import { MonsterDisplay } from '../Monster/Monster';

function App() {
  return (
    <div className="App center">
      <MonsterDisplay monsterIndex="adult-black-dragon" />
      <MonsterDisplay monsterIndex="assassin" />
      <MonsterDisplay monsterIndex="bandit" />
    </div>
  );
}

export default App;
