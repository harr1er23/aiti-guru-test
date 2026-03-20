import React from "react";

export const useDebounce = <T>(value: T, delay = 400): T => {
    const [debounceValue, setDebouceValue] = React.useState<T>(value);

    React.useEffect(() => {
        const timer = setTimeout(() => setDebouceValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounceValue;
}