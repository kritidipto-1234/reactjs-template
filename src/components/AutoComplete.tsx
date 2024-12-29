import { useState, useEffect, useRef } from 'react';
import styles from './AutoComplete.module.scss';

const performSearch = async (term:string):Promise<string> => {
    console.log('performSearch', term);
    // Your API call or search logic here
    return new Promise((resolve, reject) => {
        // if (term.includes('lulu')){
        //     resolve('lulu');
        // }
        setTimeout(() => {
            const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            resolve(`${term}${randomDigits}lulu`);
        }, 100);
    });
};

function SearchComponent() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState('');
  const latestRequestId = useRef(0);

  // Debounce search term
  useEffect(() => {
    if (results.startsWith(input))  return;//dont do anything if the results are already starting with the input
    setResults('');
    const timer = setTimeout(() => {
      setSearchTerm(input);
    }, 500); // 500ms delay

    // Cleanup function
    return () => clearTimeout(timer);
  }, [input,results]);

  // Effect for handling the actual search
  useEffect(() => {
    async function search() {
      if (searchTerm) {
        const currentRequestId = ++latestRequestId.current;
        const result:string = await performSearch(searchTerm);
        console.log('search result', result);
        if (currentRequestId === latestRequestId.current) {
            setResults(result);
        }
      }
    }

    search();
  }, [searchTerm]);


  return (
    <div className={styles.container}>
        <div className={styles.inputWrapper}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
                style={{ caretColor: 'black' }}
            />
            <input
                type="text"
                value={results}
                className={styles.autocomplete}
            />
        </div>
    </div>
  );
}

export default SearchComponent;