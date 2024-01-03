import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addMyProduct } from '../redux/ProductSlice';



let Items = [
    {
        id: 0,
        name: 'Amron',
        image: require('../images/batteries/amron.jpg'),
        price: 2000,
        qty: 0,
        frequency: 'Every 10000 kms/ 6 Months',
        duration: 'Takes 6 Hours',
        warranty: '1 Month warranty',
        services: 'Includes 15 Services',
      },
      {
        id: 1,
        name: 'Exide',
        image: require('../images/batteries/exide.jpg'),
        price: 1500,
        qty: 0,
        frequency: 'Every 10000 kms/ 6 Months',
        duration: 'Takes 6 Hours',
        warranty: '1 Month warranty',
        services: 'Includes 15 Services',
      },


];

const BatteriesMain = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      Items.forEach((item) => dispatch(addMyProduct(item)));
    }, [dispatch]);

    return (
        <Batteries />
      );

};

export default BatteriesMain;
  

                             
