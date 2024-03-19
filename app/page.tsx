'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';
import useFuse from '@/hooks/useFuse';
import SearchResults from '@/components/SearchResults';

export default function HomePage() {
  const [formData, setFormData] = useState({
    textValue: '',
    checkboxValue: true,
    customColorName: 'blue',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [loadedData, setLoadedData] = useState([]);
  const fuseSearcher = useFuse(loadedData, formData.textValue, {
    keys: ['title'],
    includeMatches: true,
    threshold: 0.15,
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw 'Wrong data format';
      }
      setSubmissionErrorMessage('');
      setLoadedData(data);
    } catch (ex) {
      setSubmissionErrorMessage('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCheckbox = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkboxValue: !prevFormData.checkboxValue,
    }));
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      textValue: e.target.value,
    }));
  };

  const onSubmit = () => {
    setIsLoading(true);
    getData();
  };

  

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 my-2 ml-1">
        <div>
          <code className="bg-cyan-400">customColorName</code> = "{formData.customColorName}"
        </div>
        <div>
          <code className="bg-green-400">textValue</code> = "{formData.textValue}"
        </div>
        <div>
          <code className="bg-purple-400">checkboxValue</code> = "{formData.checkboxValue.toString()}"
        </div>
      </div>
      <div className="flex gap-3 my-3 items-center justify-center">
        <button onClick={() => setFormData({ ...formData, customColorName: 'green' })} className="bg-slate-300 rounded-md p-1.5">
          set theme to green
        </button>
        <button onClick={() => setFormData({ ...formData, customColorName: 'blue' })} className="bg-slate-300 rounded-md p-1.5">
          set theme to blue
        </button>
        <button onClick={() => setFormData({ ...formData, textValue: 'new value' })} className="bg-slate-300 rounded-md p-1.5">
          set input value
        </button>
        <button onClick={toggleCheckbox} className="bg-slate-300 rounded-md p-1.5">
          Toggle Checkbox
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 mb-3 justify-center">
        <Checkbox
          checked={formData.checkboxValue}
          onChange={toggleCheckbox}
          registerVars={{
            ...register('checkboxChecked', {
              required: 'Checkbox true required',
            }),
          }}
          color={formData.customColorName}
        >
          Test
        </Checkbox>
        <p className="flex justify-center text-red-400">{errors.checkboxChecked?.message}</p>

        <Input
          value={formData.textValue}
          registerVars={{
            ...register('searchText', {
              required: 'search text required',
              pattern: {
                value: /^[a-zA-Z]{4,8}$/,
                message: 'Only letters and length between 4 and 8',
              },
            }),
          }}
          onChange={handleInputChange}
          color={formData.customColorName}
        />
        <p className="flex justify-center text-red-400">{errors.searchText?.message}</p>

        <div className="flex justify-center gap-2">
          <button type="submit" className="bg-slate-300 rounded-md p-1.5">
            Submit Form
          </button>
          {isLoading && <Loader />} <p className="text-red-400">{submissionErrorMessage}</p>
        </div>

        <SearchResults fuseSearcher={fuseSearcher} />
      </form>

      <Instructions />
    </div>
  );
}
