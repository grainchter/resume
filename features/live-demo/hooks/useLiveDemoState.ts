import { useState } from 'react';

export const useLiveDemoState = () => {
  const [framework, setFramework] = useState<'react'>('react');
  const [output, setOutput] = useState<string>('Click "Run" to see the demo');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Demo is running below →');
    setTimeout(() => setIsRunning(false), 500);
  };

  return {
    framework,
    setFramework,
    output,
    handleRun,
    isRunning,
  };
};