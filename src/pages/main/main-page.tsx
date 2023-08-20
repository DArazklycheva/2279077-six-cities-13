import Header from '../../components/header/header.tsx';
import { CardsList } from '../../components/cards-list/cards-list.tsx';
import { Sorting } from '../../components/sorting/sorting.tsx';
import { TSorting } from '../../types/sorting.ts';
import { Offer } from '../../types/offer.ts';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/index.ts';
import { CitiesList } from '../../components/cities-list/cities-list.tsx';
import { findOffersByCity, sorting } from '../../utils.ts';
import { fetchOffers } from '../../store/actions.ts';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const [currentSorting, setCurrentSorting] = useState<TSorting>('Popular');

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const offersByCity = sorting[currentSorting](findOffersByCity(offers, currentCity.name));

  const handleMouseEnterItem = (id: string | undefined) => {
    const currentCard = offers.find((offer) => offer.id === id);
    setActiveCard(currentCard);
  };

  const handleSortChange = (newSorting: TSorting) => {
    setCurrentSorting(newSorting);
  };

  useEffect(() => {
    dispatch(fetchOffers);
  }, [dispatch]);

  return(
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Helmet>
          <title>6 городов</title>
        </Helmet>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
              <Sorting
                currentSorting={currentSorting}
                onChange={handleSortChange}
              />
              <CardsList
                offers={offersByCity}
                onCardMouseEnter={handleMouseEnterItem}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={offersByCity}
                activeCard={activeCard}
                city={currentCity}
                isMainPage
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
