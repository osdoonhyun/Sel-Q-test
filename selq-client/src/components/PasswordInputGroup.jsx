import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import { EyeIcon, GreyButton } from '../styles/ButtonStyles';

export default function PasswordInputGroup({
  register,
  name,
  placeholder,
  controlStyle,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputGroup>
      <Form.Control
        style={controlStyle || {}}
        {...register(name, { required: true })}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <GreyButton
        $greyBorder
        variant='Light'
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeIcon icon={faEye} />
        ) : (
          <EyeIcon icon={faEyeSlash} />
        )}
      </GreyButton>
    </InputGroup>
  );
}
