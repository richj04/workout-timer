import React from 'react';

export default function ShopPage({ buyBasicChest }){
    return(
        <div>
            <h1>Shop</h1>

            <div>
                <h2>LootBoxes:</h2>

                <button onClick={() => buyBasicChest}>
                    Basic Box: 100 Gold
                </button>

                <button onClick={() => buyBasicChest}>
                    Premium Box: 1,000 Gold
                </button>
            </div>

            <div>
                <h2>Support Me!</h2>

                <button onClick={() => buyBasicChest}>
                    $1.00 - 10,000 Gold
                </button>
            </div>
        </div>
    );
}