import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import * as S from '../styles/ProgressBarStyles';

export default function ProgressBar({ currentStep, steps }) {
  return (
    <S.ProgressBarWrapper>
      <S.ProgressBarList>
        {steps.map((step, index) => (
          <S.ProgressBarStep
            key={index}
            className={`ProgressBar-step ${
              currentStep === index
                ? 'is-current'
                : currentStep > index
                ? 'is-complete'
                : ''
            } ${currentStep === steps.length ? ' is-finished' : ''}`}
          >
            <S.ProgressBarIcon>
              <FontAwesomeIcon icon={faCheck} />
            </S.ProgressBarIcon>
            <S.ProgressBarStepLabel>{step}</S.ProgressBarStepLabel>
          </S.ProgressBarStep>
        ))}
      </S.ProgressBarList>
    </S.ProgressBarWrapper>
  );
}
