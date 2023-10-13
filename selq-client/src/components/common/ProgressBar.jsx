import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ProgressBar.css';

export default function ProgressBar({ currentStep, steps }) {
  return (
    <div className='wrapper'>
      <ol className='ProgressBar'>
        {steps.map((step, index) => (
          <li
            key={index}
            className={`ProgressBar-step ${
              currentStep === index
                ? 'is-current'
                : currentStep > index
                ? 'is-complete'
                : ''
            } ${currentStep === steps.length ? ' is-finished' : ''}`}
          >
            <span className='ProgressBar-icon'>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className='ProgressBar-stepLabel'>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
