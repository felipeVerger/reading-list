import { FC } from 'react'
import { useFormContext } from 'react-hook-form';

interface Props {
  type: string;
  name: string;
  label: string;
  autoFocus?: boolean;
  error: string | undefined;
  isError: boolean
}

const Input:FC<Props> = ({ type, name, label, autoFocus, error, isError }) => {
  const { register } = useFormContext();

  return (
    <label htmlFor={label} className='auth-label'>
        {label}
        <input
            className={`auth-input ${isError && 'border-red-400'}`}
            {...register(name)}
            type={type}
            id={label}
            autoFocus={autoFocus}
        />
        <small className='text-red-400'>{error}</small>
    </label>
  )
}

export default Input