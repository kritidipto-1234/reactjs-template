import './App.css'
import data from './data.ts';
import Comment from './Comment.tsx';

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <>
      <Comment data={data} />
    </>
  )
}

export default App;
