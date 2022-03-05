import './App.css';
import { MonsterSelector } from '../Selectors/MonsterSelector';
import { Route, Routes } from 'react-router-dom';
import { SpellSelector } from '../Selectors/SpellSelector';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/monsters" element={<MonsterSelector />} />
        <Route path="/spells" element={<SpellSelector />} />
      </Routes>
    </div>
  );
}

export default App;
