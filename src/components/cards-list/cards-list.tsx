import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import { MouseEvent } from 'react';

type CardsListProps = {
  offers: Offer[];
  onCardMouseEnter: (id: string | undefined) => void;
}

function CardsList({offers, onCardMouseEnter}: CardsListProps): JSX.Element {
  const handleMouseEnterItem = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardMouseEnter(event.currentTarget.dataset.id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <PlaceCard key={offer.id} offer={offer} onMouseEnterHandler={handleMouseEnterItem} />)}
    </div>
  );
}
export {CardsList};
