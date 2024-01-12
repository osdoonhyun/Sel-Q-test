import { useEffect } from 'react';

export default function Success({ onNext }) {
  useEffect(() => {
    onNext();
  }, [onNext]);

  return <h1 className='mt-5'>등록한 게시물로 이동 중...</h1>;
}
