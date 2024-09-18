import React, { createContext, useContext, useState, useEffect } from 'react';


export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

interface GlobalStateContextProps {
    name: string;
    email: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    breeds: string[];
    dogs: Dog[];
    favorites: string[];
    match: Dog | null;
    selectedBreed: string;
    sortOrder: "asc" | "desc";
    page: number;
    dogsPerPage: number;
    totalPages: number | null;
    handleLogin: (name: string, email: string) => Promise<void>;
    addToFavorites: (dogId: string) => void;
    generateMatch: () => Promise<void>;
    handlePageChange: (pageNum: number) => void;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
    handleClick: () => void;
    showMatch: boolean;
    btnText: string;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const BASE_URL = 'https://frontend-take-home-service.fetch.com';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [breeds, setBreeds] = useState<string[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [match, setMatch] = useState<Dog | null>(null);

    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [dogsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [, setIsLastPage] = useState(false);
    const [showMatch, setShowMatch] = useState(false);
    const [btnText, setBtnText] = useState('Generate Match');


    // Fetch Breeds when the user is authenticated
    useEffect(() => {
        const fetchBreeds = async () => {
            if (!isAuthenticated) return;

            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/dogs/breeds`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setBreeds(data);
                if (data?.length) {
                    setTotalPages(Math.ceil(data.length / dogsPerPage));
                    setPage(0);
                }
                setIsLastPage(data.dogs?.length < dogsPerPage);
            } catch (error) {
                console.error('Error fetching breeds:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBreeds();
    }, [isAuthenticated, dogsPerPage]);


    useEffect(() => {
        const searchDogs = async () => {
            if (!isAuthenticated) return;

            setIsLoading(true);
            const params = new URLSearchParams();
            if (selectedBreed) params.append('breeds', selectedBreed);
            params.append('size', dogsPerPage.toString());
            params.append('from', (page * 10).toString());
            params.append('sort', `breed:${sortOrder}`);

            try {
                const response = await fetch(`${BASE_URL}/dogs/search?${params.toString()}`, {
                    credentials: 'include',
                });
                const { resultIds } = await response.json();

                const dogResponse = await fetch(`${BASE_URL}/dogs`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resultIds),
                    credentials: 'include',
                });
                const dogData: Dog[] = await dogResponse.json();
                setDogs(dogData);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        searchDogs();
    }, [isAuthenticated, selectedBreed, page, sortOrder, dogsPerPage]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string) => {
        return name.trim() !== '';
    };

    const handleLogin = async (name: string, email: string) => {
        if (!validateName(name)) {
            alert('Please enter your name');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
                credentials: 'include',
            });
            if (response.ok) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin(name, email);
        }
    };

    const addToFavorites = (dogId: string) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.includes(dogId)) {
                return [...prevFavorites, dogId];
            }
            return prevFavorites;
        });
    };


    const generateMatch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/dogs/match`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(favorites),
                credentials: 'include',
            });
            const { match } = await response.json();

            const dogResponse = await fetch(`${BASE_URL}/dogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([match]),
                credentials: 'include',
            });
            const dogData: Dog[] = await dogResponse.json();
            setMatch(dogData[0]);
        } catch (error) {
            console.error('Error generating match:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // Handle Page Change
    const handlePageChange = (pageNum: number) => {
        setPage(pageNum);
    };

    const handleClick = () => {
        setShowMatch((prev) => !prev);
        generateMatch()
        if (showMatch) {
            setBtnText('Generate Match');
        } else {
            setBtnText('Show available');
        }
    }

    return (
        <GlobalStateContext.Provider
            value={{
                name,
                email,
                isAuthenticated,
                isLoading,
                breeds,
                dogs,
                favorites,
                match,
                selectedBreed,
                sortOrder,
                page,
                dogsPerPage,
                totalPages,
                handleLogin,
                addToFavorites,
                generateMatch,
                handlePageChange,
                setName,
                setEmail,
                setSelectedBreed,
                setPage,
                handleClick,
                showMatch,
                btnText,
                handleKeyDown,
                setIsLoading,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to access the context
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

