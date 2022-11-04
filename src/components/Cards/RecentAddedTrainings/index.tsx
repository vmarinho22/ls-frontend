import TrainingSimpleCard from '@components/Cards/TrainingSimpleCard';
import { FC } from 'react';

interface Props {
  name: string;
  userPicture: string;
  about: string;
  trainingName: string;
  endedIn: Date;
  validity: number;
}

const RecentAddedTrainings: FC<Props> = ({
  name,
  userPicture,
  about,
  trainingName,
  endedIn,
  validity,
}) => {
  return (
    <TrainingSimpleCard
      name={name}
      userPicture={userPicture}
      about={about}
      trainingName={trainingName}
      endedIn={endedIn}
      validity={validity}
      validityUnit={'months'}
    />
  );
};

export default RecentAddedTrainings;
