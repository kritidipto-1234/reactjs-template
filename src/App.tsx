//@ts-nocheck
import { useState,useEffect } from 'react';
import SelectableGrid from './SelectableGrid';

export default function App() {

  return (
    <div>
      <h1>Drag and select cells</h1>
      <h1>oj</h1>
      <h1>oj</h1>
      <SelectableGrid maxRows={10} maxColumns={10}/>
    </div>
  );
}
