import { useFormContext } from 'react-hook-form';

const TitleField: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div>
      <h4 className='confirmDialogItemLabel'>
        Название статьи <span>(обязательно)</span>
      </h4>
      <div className='inputWrapper'>
        <input maxLength={203} placeholder='Добавь название статьи' {...register('title')} />
      </div>
    </div>
  );
};

export default TitleField;
