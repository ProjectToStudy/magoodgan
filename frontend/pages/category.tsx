import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileNavigator from '../components/organisms/MobileNavigator';

const Category: NextPage = () => {
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    useEffect(() => {
        setIsMobileState(isMobile);
    }, [isMobile]);

    if (isMobileState) return <MobileNavigator />;
    return <div>404</div>;
};

export default Category;
