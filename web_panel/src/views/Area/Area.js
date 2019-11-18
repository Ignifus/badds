import React from 'react';
import {Link} from 'react-router-dom';

class Area extends React.PureComponent {
    render() {
        return (
            <ul>
                <li><Link to="/ads/publishers">Publisher Area</Link></li>
                <li><Link to="/ads/advertisers">Advertiser Area</Link></li>
            </ul>
        )
    }
}

export default Area;
