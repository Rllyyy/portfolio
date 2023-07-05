// const [localStorageValue, setLocalStorageValue] = useAdvancedLocalStorage();
import { useSyncExternalStore } from "react";

export default function App() {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage();

  return (
    <div className='App mt-44'>
      <button type='button' onClick={setLocalStorageValue}>
        Change localStorage value
      </button>
      <p>{localStorageValue}</p>
    </div>
  );
}

const useLocalStorage = () => {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

  const value = typeof item === "string" ? JSON.parse(item) : null;

  const setValue = () => {
    localStorage.setItem("item", JSON.stringify("new-value"));
    //The event name has to match the eventListeners defined in the subscribe function
    window.dispatchEvent(new StorageEvent("custom-storage-event-name"));
  };

  return [value, setValue] as const;
};

function subscribe(callback: () => void) {
  window.addEventListener("custom-storage-event-name", callback);
  return () => {
    window.removeEventListener("custom-storage-event-name", callback);
  };
}

//Return the current value from the browser API
function getSnapshot() {
  //alert("localStorage changed")
  return localStorage.getItem("item");
}

const useAdvancedLocalStorage = () => {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);
  // The third parameter getServerSnapshot is used for applications that use server-side rendering.

  // Parse the json string
  // You should probably further narrow down the JSON.parse type because JSON.parse return any
  const value = typeof item === "string" ? JSON.parse(item) : 0;

  const setValue = (newValue: number | ((prev: number) => number)) => {
    const updatedValue = typeof newValue === "function" ? newValue(value) : newValue;

    localStorage.setItem("item", JSON.stringify(updatedValue));
    //The event name has to match the eventListeners defined in the subscribe function
    window.dispatchEvent(new StorageEvent("custom-storage-event-name"));
  };

  return [value, setValue] as const;
};
