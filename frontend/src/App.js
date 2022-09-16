import { useEffect, useState } from 'react';

import './App.css';

import AddWilderForm from './components/AddWilderForm';
import Wilder from './components/Wilder';

export const easyFetch = async (url, callback) => {
    const fetchData = await fetch(url);
    const response = await fetchData.json();

    callback(response);
};

function App() {
    const [wildersData, setWildersData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [displayAddWilderForm, setDisplayAddWilderForm] = useState(false);

    useEffect(() => {
        easyFetch('http://localhost:3001/api/wilder', setWildersData);
    }, []);

    return (
        <>
            <header>
                <div className="container">
                    <h1>Wilders Book</h1>
                </div>
            </header>
            <main className="container">
                <button
                    className="button"
                    onClick={() =>
                        setDisplayAddWilderForm(!displayAddWilderForm)
                    }
                >
                    Add new wilder
                </button>

                {displayAddWilderForm && (
                    <AddWilderForm
                        setWildersData={setWildersData}
                        setDisplayAddWilderForm={setDisplayAddWilderForm}
                    />
                )}
                <h2>Wilders</h2>
                <section className="card-row">
                    {wildersData.map((data, index) => {
                        return (
                            <Wilder
                                key={index}
                                data={data}
                                setWildersData={setWildersData}
                            />
                        );
                    })}
                </section>
            </main>
            <footer>
                <div className="container">
                    <p>&copy; 2022 Wild Code School</p>
                </div>
            </footer>
        </>
    );
}

export default App;
