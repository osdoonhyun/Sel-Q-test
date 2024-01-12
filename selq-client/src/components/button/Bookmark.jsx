import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../../store/Slices/bookmark';
import LoginModal from '../modal/LoginModal';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { BookmarkButton } from '../../styles/ButtonStyles';

export default function Bookmark({ question }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [clicked, setClicked] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    question?.isBookmarked ?? false
  );

  const handleClose = () => setOpenLoginModal(false);

  const handleBookmark = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setIsBookmarked((prev) => !prev);
    setClicked(true);
    dispatch(toggleBookmark(question));
  };

  return (
    <>
      <BookmarkButton
        $isBookmarked={isBookmarked}
        $clicked={clicked}
        onClick={handleBookmark}
        icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
        size='xl'
      />

      <LoginModal openLoginModal={openLoginModal} handleClose={handleClose} />
    </>
  );
}
