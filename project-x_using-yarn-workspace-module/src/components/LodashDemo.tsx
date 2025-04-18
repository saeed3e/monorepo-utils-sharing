'use strict';

import { useState } from 'react';
// Import specific functions from lodash-es for better tree-shaking
import { chunk, shuffle, sum, filter } from 'lodash-es';

/**
 * Component that demonstrates the use of lodash utility functions
 * @returns {JSX.Element} The rendered LodashDemo component
 */
const LodashDemo = () => {
  // Sample data for demonstration
  const [items] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [result, setResult] = useState<string>('');

  /**
   * Demonstrates various lodash operations on the sample data
   * @param {string} operation - The operation to perform
   */
  const handleOperation = (operation: string) => {
    let operationResult: number | number[] | number[][] | string;
    
    switch (operation) {
      case 'chunk':
        operationResult = chunk(items, 2);
        break;
      case 'shuffle':
        operationResult = shuffle(items);
        break;
      case 'sum':
        operationResult = sum(items);
        break;
      case 'filter':
        operationResult = filter(items, (n) => n % 2 === 0);
        break;
      default:
        operationResult = items;
    }
    
    setResult(JSON.stringify(operationResult, null, 2));
  };

  return (
    <div className="lodash-demo">
      <h2>Lodash Utility Demo</h2>
      <p>Using lodash to manipulate data: [{items.join(', ')}]</p>
      
      <div className="controls">
        <button onClick={() => handleOperation('chunk')}>
          Chunk (size 2)
        </button>
        <button onClick={() => handleOperation('shuffle')}>
          Shuffle
        </button>
        <button onClick={() => handleOperation('sum')}>
          Sum
        </button>
        <button onClick={() => handleOperation('filter')}>
          Filter Even
        </button>
      </div>
      
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default LodashDemo;
