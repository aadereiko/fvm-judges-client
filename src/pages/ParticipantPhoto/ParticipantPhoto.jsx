import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ParticipantPhotoWrapperElement,
  PhotoWrapperElement,
  PhotoInfoBlockElement,
  StarsWrapperElement,
  StarIconElement,
  StarFillIconElement,
  MarkLabelElement,
  MarksWrapperElement,
  ArrowLeftIconElement,
  ArrowRightIconElement,
} from './elements';
import { photoPropType } from '../../shared/propTypes';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const getMarkStar = (currentMark, setMark, section, clickCallback = () => {}) => {
  const props = {
    key: `${section}-${currentMark}`,
    height: '1.3rem',
    width: '1.3rem',
    onClick: clickCallback,
  };

  return currentMark > setMark ? (
    <StarIconElement {...props} />
  ) : (
    <StarFillIconElement {...props} />
  );
};

export const ParticipantPhoto = ({ participantId, nominationId, nominationName, photo }) => {
  const marks = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  const [look, setLook] = useState(photo.mark);
  const [idea, setIdea] = useState(photo.mark);

  return (
    (photo && (
      <ParticipantPhotoWrapperElement>
        <PhotoWrapperElement>
          <ArrowLeftIconElement width="6%" height="6%" />
          <ArrowRightIconElement width="6%" height="6%" />

          <img src={photo.img} alt="Фото номинации" onClick={() => setShowPicture(true)}></img>
        </PhotoWrapperElement>
        <PhotoInfoBlockElement>
          <h3>{nominationName}</h3>
          <p className="text-muted">Участник {participantId}</p>
          <MarksWrapperElement>
            <h4>Оценки:</h4>
            <span>Идея:</span>
            <StarsWrapperElement>
              {marks.map((mark) => getMarkStar(mark, idea, 'idea', () => setIdea(mark)))}
              <MarkLabelElement className="text-muted">{idea}</MarkLabelElement>
            </StarsWrapperElement>
            <span>Исполнение:</span>
            <StarsWrapperElement>
              {marks.map((mark) => getMarkStar(mark, look, 'look', () => setLook(mark)))}
              <MarkLabelElement className="text-muted">{look}</MarkLabelElement>
            </StarsWrapperElement>
            <span className="text-muted">Cредняя оценка - {(look + idea) / 2}</span>
          </MarksWrapperElement>
          <Button as={Link} variant="dark" to={`/participants/${participantId}`}>
            Профиль участника
          </Button>
          <Button as={Link} variant="dark" to={`/nominations/${nominationId}`}>
            Профиль номинации
          </Button>
        </PhotoInfoBlockElement>
      </ParticipantPhotoWrapperElement>
    )) || <h3>Фото не найдено</h3>
  );
};

ParticipantPhoto.propTypes = {
  participantId: PropTypes.string.isRequired,
  nominationId: PropTypes.string.isRequired,
  photo: photoPropType,
  nominationName: PropTypes.string.isRequired,
};
