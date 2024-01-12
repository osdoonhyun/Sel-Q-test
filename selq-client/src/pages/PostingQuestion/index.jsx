import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterQuestion } from '../../hooks/mutations/useRegisterQuestion';
import QuestionInput from './QuestionInput';
import AnswerInput from './AnswerInput';
import Confirmation from './Confirmation';
import Success from './Success';
import ProgressBar from '../../components/ProgressBar';
import TemporarySaveModal from '../../components/modal/TemporarySaveModal';
import { hasValue } from '../../utils/commonUtils';
import { PostingContainer } from '../../styles/LayoutStyles';

export default function PostingQuestion() {
  const navigate = useNavigate();

  const [showTemporarySaveModal, setShowTemporarySaveModal] = useState(false);
  const [loadTemporaryData, setLoadTemporaryData] = useState(false);
  const [step, setStep] = useState('질문입력');
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['질문입력', '답변입력', '등록하기', '등록성공'];

  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    importance: 0,
    category: '',
    hints: [],
  });
  const [answerFormData, setAnswerFormData] = useState({
    answers: '',
    question: '',
  });

  const {
    mutateAsync: registerQuestion,
    isLoading: loadingRegister,
    error: errorRegister,
  } = useRegisterQuestion();

  const deleteLocalStorageData = () => {
    localStorage.removeItem('question');
    localStorage.removeItem('answer');

    setQuestionFormData((prevData) => ({
      ...prevData,
      question: '',
      importance: 0,
      category: '',
      hints: [],
    }));
  };

  // 자동저장 데이터 불러오는 모달 띄우기
  useEffect(() => {
    const storedQuestionData = localStorage.getItem('question');
    const storedAnswerData = localStorage.getItem('answer');

    if (
      hasValue(JSON.parse(storedQuestionData)) ||
      hasValue(JSON.parse(storedAnswerData))
    ) {
      setShowTemporarySaveModal(true);
    }
  }, []);

  return (
    <>
      <PostingContainer>
        <ProgressBar steps={steps} currentStep={currentStep} />
        {step === '질문입력' && (
          <QuestionInput
            autoLoad={loadTemporaryData}
            onNext={async (data) => {
              setQuestionFormData({
                question: data.question,
                importance: data.importance,
                category: data.category,
                hints: data.hints,
              });
              setCurrentStep((prev) => prev + 1);
              setStep('답변입력');
            }}
          />
        )}
        {step === '답변입력' && (
          <AnswerInput
            autoLoad={loadTemporaryData}
            question={questionFormData.question}
            onPrevious={() => {
              setCurrentStep((prev) => prev - 1);
              setStep('질문입력');
            }}
            onNext={async (data) => {
              setAnswerFormData({
                ...answerFormData,
                answers: data.answers,
              });
              setCurrentStep((prev) => prev + 1);
              setStep('등록하기');
            }}
          />
        )}
        {step === '등록하기' && (
          <Confirmation
            question={questionFormData}
            answer={answerFormData}
            isLoading={loadingRegister}
            error={errorRegister}
            onPrevious={() => {
              setCurrentStep((prev) => prev - 1);
              setStep('답변입력');
            }}
            onNext={async () => {
              setCurrentStep((prev) => prev + 1);
              const { status, questionId } = await registerQuestion({
                question: questionFormData,
                answer: answerFormData,
              });

              if (status === 201) {
                setAnswerFormData({
                  ...answerFormData,
                  question: questionId,
                });
                setStep('등록성공');
                setCurrentStep((prev) => prev + 1);
              }
            }}
          />
        )}
        {step === '등록성공' && (
          <Success
            onNext={() => {
              deleteLocalStorageData();
              setTimeout(() => {
                navigate(`/questions/${answerFormData?.question}`);
              }, 1000);
            }}
          />
        )}
      </PostingContainer>

      <TemporarySaveModal
        showModal={showTemporarySaveModal}
        setShowModal={setShowTemporarySaveModal}
        setLoadTemporaryData={setLoadTemporaryData}
        deleteLocalStorageData={deleteLocalStorageData}
      />
    </>
  );
}
