import './App.css'
import Dragdrop from './components/DragdropList';
import List from './components/List';

let initialList = [
  { title: 'List 1', color: 'red', id: 1 },
  // { title: 'List 2', color: 'blue', id: 2 },
  // { title: 'List 3', color: 'green', id: 3 },
  // { title: 'List 4', color: 'yellow', id: 4 },
  // { title: 'List 5', color: 'purple', id: 5 },
];

let initialList2 = [
  { title: 'List 6', color: 'teal', id: 6 },
  // { title: 'List 7', color: 'orange', id: 7 },
  // { title: 'List 8', color: 'pink', id: 8 },
  // { title: 'List 9', color: 'brown', id: 9 },
  // { title: 'List 10', color: 'gray', id: 10 },
];

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <Dragdrop>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <List list={initialList} />
        <List list={initialList2} />
        <List list={[]} />
      </div>
    </Dragdrop>
  )
}

export default App;
