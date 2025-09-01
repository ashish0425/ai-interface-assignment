import React from 'react';
import { Button } from '../components/ui/Button';

export const ButtonDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Button Component Demo</h1>
      
      {/* Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Variants</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Sizes</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="primary" size="sm">Small Button</Button>
          <Button variant="primary" size="md">Medium Button</Button>
          <Button variant="primary" size="lg">Large Button</Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-lg font-semibold mb-4">States</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary" loading>Loading Button</Button>
          <Button variant="primary" disabled>Disabled Button</Button>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Interactive Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <Button 
            variant="primary" 
            onClick={() => alert('Primary clicked!')}
          >
            Click Me (Primary)
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log('Outline clicked!')}
          >
            Click Me (Outline)
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;
