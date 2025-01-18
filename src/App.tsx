import './App.css'
import Dragdrop from './components/DragdropList';
import List from './components/List';

let initialList = [
  { title: 'List 1', color: 'red', id: 1 },
  { title: 'List 2', color: 'blue', id: 2 },
  { title: 'List 3', color: 'green', id: 3 },
];

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <Dragdrop>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <List list={initialList} />
        <List list={[]} />
        <List list={[]} />
      </div>
    </Dragdrop>
  )
}

export default App;
