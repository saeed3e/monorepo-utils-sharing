'use strict';

import { useState } from 'react';
import { generateId } from '@your-org/utils';

/**
 * Component that demonstrates the use of the generateId utility function
 * @returns {JSX.Element} The rendered IdGenerator component
 */
const IdGenerator = () => {
  // State to store the generated IDs
  const [ids, setIds] = useState<string[]>([]);

  /**
   * Generates a new ID and adds it to the list
   */
  const handleGenerateId = () => {
    const newId = generateId();
    setIds((prevIds) => [...prevIds, newId]);
  };

  /**
   * Clears all generated IDs
   */
  const handleClearIds = () => {
    setIds([]);
  };

  return (
    <div className="id-generator">
      <h2>ID Generator</h2>
      <p>Using the shared utility function from Project_ABC</p>
      
      <div className="controls">
        <button onClick={handleGenerateId}>
          Generate New ID
        </button>
        <button onClick={handleClearIds}>
          Clear All
        </button>
      </div>
      
      {ids.length > 0 && (
        <div className="id-list">
          <h3>Generated IDs:</h3>
          <ul>
            {ids.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdGenerator;
