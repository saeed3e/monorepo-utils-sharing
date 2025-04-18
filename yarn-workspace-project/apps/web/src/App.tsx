import React from 'react';
import { Button, Card, Alert } from 'ui';
import { formatDate } from 'utils';

function App() {
  const currentDate = formatDate(new Date());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Yarn Workspace Monorepo</h1>
          <p className="mt-2 text-gray-600">Today is {currentDate}</p>
        </div>
        
        <Alert 
          type="success" 
          message="Your Yarn workspace monorepo has been set up successfully!"
        />
        
        <Card
          title="UI Component Library"
          description="This card is imported from the UI package. It demonstrates how components can be shared across multiple applications in the monorepo."
          footer={
            <div className="flex justify-end">
              <Button variant="primary" size="sm">Learn More</Button>
            </div>
          }
        />
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
        
        <div className="space-y-4">
          <Alert type="info" message="Info alert from the UI package" />
          <Alert type="warning" message="Warning alert from the UI package" />
          <Alert type="error" message="Error alert from the UI package" />
        </div>
      </div>
    </div>
  );
}

export default App;