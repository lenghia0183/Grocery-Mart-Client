'use client';

import { useState, useTransition } from 'react';

function TestV2() {
  const [inputValue, setInputValue] = useState<string>('');
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    startTransition(() => {
      const newNumbers = generateRandomNumbers(newValue);
      setRandomNumbers(newNumbers);
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending ? (
        <p>loading...</p>
      ) : (
        <ul>
          {randomNumbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Thêm kiểu cho hàm generateRandomNumbers
function generateRandomNumbers(input: string): number[] {
  const num = parseInt(input);
  const numbers: number[] = [];
  for (let i = 0; i < 100000; i++) {
    numbers.push(num + Math.floor(Math.random() * 10000));
  }
  return numbers;
}

export default TestV2;
