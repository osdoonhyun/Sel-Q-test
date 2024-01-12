import { IMPORTANCE_OPTIONS } from '../constant/options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

export default function ImportanceCount({ importance }) {
  const MAX_LEVEL = IMPORTANCE_OPTIONS.length - 1;
  const MIN_LEVEL = 0;

  return (
    <>
      {Array.from({ length: MAX_LEVEL }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={index >= MAX_LEVEL - importance ? faStarSolid : faStarRegular}
          size='xl'
          style={{
            color:
              IMPORTANCE_OPTIONS[
                importance >= MAX_LEVEL - index ? index + 1 : MIN_LEVEL
              ].color,
          }}
        />
      ))}
    </>
  );
}
