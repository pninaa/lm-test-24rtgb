'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
// import Fuse from 'fuse.js';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';

export default function HomePage() {
  const [textValue, setTextValue] = useState('init');
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [customColorName, setCustomColorName] = useState('blue');

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 my-2 ml-1">
        <div>
          <code className="bg-cyan-400">customColorName</code> = "{customColorName}"
        </div>
        <div>
          <code className="bg-green-400">textValue</code> = "{textValue}"
        </div>
        <div>
          <code className="bg-purple-400">checkboxValue</code> = "{checkboxValue.toString()}"
        </div>
      </div>
      <div className="flex gap-3 my-3 items-center justify-center">
        <button onClick={() => setCustomColorName('green')} className="bg-slate-300 rounded-md p-1.5">
          set theme to green
        </button>
        <button onClick={() => setCustomColorName('blue')} className="bg-slate-300 rounded-md p-1.5">
          set theme to blue
        </button>

        <button onClick={() => setTextValue('new value')} className="bg-slate-300 rounded-md p-1.5">
          set input value
        </button>
        {/* This button should toggle checkbox state */}
        <button className="bg-slate-300 rounded-md p-1.5">
          <span className="bg-yellow-300">TODO: toggle checkbox</span>
        </button>
      </div>

      <div className="flex flex-col gap-5 mb-3 justify-center">
        <Checkbox color={customColorName}>Test</Checkbox>
        <Input value={textValue} onChange={setTextValue} color={customColorName} />
        <div className="flex justify-center gap-2">
          <button className="bg-slate-300 rounded-md p-1.5">
            <span className="bg-yellow-300">TODO: form submit</span>
          </button>
          <Loader />
        </div>
        <div className="font-bold text-center">Results:</div>
        <div className="text-center">
          <span className="bg-yellow-300">TODO: render filtered results here</span>
        </div>
      </div>

      <Instructions />
    </div>
  );
}
