import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const signUpHandler = async (userInput) => {
  try {
    const { status } = await serverApi.post('/auth/signup', userInput);
    if (status === 201) {
      return status;
    }
  } catch (error) {
    throw error;
  }
};

const useSignUpHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => signUpHandler(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.log('Sign Up Error', error.message);
    },
  });
};

const verifyRegisteredEmail = async (email) => {
  try {
    const { status } = await serverApi.post('/users/email', {
      email,
    });

    if (status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};

const useVerifyRegisteredEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => verifyRegisteredEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['email'],
      });
    },
    onError: (error) => {
      console.log('Verify Registered Email Error', error.message);
    },
  });
};

const sendEmailVerification = async (email) => {
  try {
    const { status, statusText } = await serverApi.post('/auth/email/send', {
      email,
    });

    if (status === 201) {
      console.log('이메일 인증 전송', status, statusText);
    }
  } catch (error) {
    throw error;
  }
};

const useSendEmailVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => sendEmailVerification(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['send'],
      });
    },
    onError: (error) => {
      console.log('Send Email Verification Error', error.message);
    },
  });
};

const checkEmailVerification = async (data) => {
  const { email, code } = data;

  try {
    const { status } = await serverApi.post('/auth/email/check', {
      email,
      code,
    });

    if (status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const useCheckEmailVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => checkEmailVerification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['check'],
      });
    },
    onError: (error) => {
      console.log('Check Email Verifiaction Error', error.message);
    },
  });
};

export {
  useSignUpHandler,
  useVerifyRegisteredEmail,
  useSendEmailVerification,
  useCheckEmailVerification,
};
