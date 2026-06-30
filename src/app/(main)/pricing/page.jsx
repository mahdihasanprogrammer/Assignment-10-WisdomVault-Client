import React from 'react';
import PricingPage from './PricingPage';
import { getUserSession } from '@/lib/session';

const MainPricingPage =async () => {
    const user = await getUserSession();
    return (
        <div>
            <PricingPage user ={user}/>
        </div>
    );
};

export default MainPricingPage;