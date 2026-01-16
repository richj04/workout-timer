import React from 'react';

export default function ShopPage({ buyBasicChest, buyAdvancedChest, buyGold }){
    return(
        <div>
            <h1>Shop</h1>

            <div>
                <h2>LootBoxes:</h2>

                <button onClick={() => buyBasicChest()} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                    Basic Box: 100 Gold
                </button>

                <button onClick={() => buyAdvancedChest()} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                    Premium Box: 1,000 Gold
                </button>
            </div>

            <div>
                <h2>Support Me!</h2>

                <button onClick={() => buyGold(9007199254740991)} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                    INFINITE GOLD BUTTON
                </button>
            </div>
        </div>
    );
}