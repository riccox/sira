import React, { useState } from "react";
import { useIsomorphicEffect } from "./use-isomorphic-effect";

const randomId = () => `sira-${Math.random().toString(36).slice(2, 11)}`;

const useReactId: () => string | undefined =
  (React as any)["useId".toString()] || (() => undefined);

function useClientId() {
  const [uuid, setUuid] = useState("");

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  return uuid;
}

function getReactId() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id = useReactId();
  return id ? `sira-${id.replace(/:/g, "")}` : "";
}

export function useId(staticId?: string) {
  return typeof staticId === "string"
    ? staticId
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      getReactId() || useClientId();
}
