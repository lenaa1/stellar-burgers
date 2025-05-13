import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { feedsThunk, selector } from './../../../src/services/feedSlice';
import { AppDispatch } from './../../../src/services/store';
import { useSelector } from './../../../src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(feedsThunk());
  }, []);
  if (!orders.length) {
    return <Preloader />;
  } else
    return (
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(feedsThunk());
        }}
      />
    );
};
