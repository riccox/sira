import { useState } from "react";

export const useClipboard = ({ timeout = 2000 } = {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout>();

  const handleCopyResult = (value: boolean) => {
    clearTimeout(copyTimeout);
    setIsCopied(value);
    setCopyTimeout(setTimeout(() => setIsCopied(false), timeout));
  };

  const copy = (valueToCopy: any) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(
        new Error("[sira] useClipboard: navigator.clipboard is not supported")
      );
    }
  };

  const reset = () => {
    setIsCopied(false);
    setError(null);
    clearTimeout(copyTimeout);
  };

  return { copy, reset, error, isCopied };
};
