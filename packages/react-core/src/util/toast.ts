import { Slide, toast as ReactToastify, ToastOptions } from "react-toastify";
import { getLocalStorageTheme } from "./theme";
import { Sira } from "../types";
import { MouseEvent, ReactNode } from "react";

type ToastId = string | number;
type ToastContent = ReactNode;

interface CloseButtonProps {
  closeToast: (e: MouseEvent<HTMLElement>) => void;
}

export interface IToastProps {
  position?: Sira.RelativePosition;
  scene?: Sira.Scene;
  className?: string;
  toastId?: ToastId;
  /** in ms */
  delay?: number;
  autoClose?: number | false;
  isLoading?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onClick?: () => void;
  closeButton?: boolean | ((props: CloseButtonProps) => ReactNode);
  role?: string;
  icon?: false | ReactNode;
}

const convertProps = (props?: IToastProps): ToastOptions => {
  const theme = getLocalStorageTheme();

  // convert type value
  let type: ToastOptions["type"];
  switch (props?.scene) {
    case "warn":
      type = "warning";
      break;
    case "danger":
      type = "error";
      break;
    default:
      type = props?.scene || "default";
  }
  return {
    theme: theme.color.mode === "dark" ? "dark" : "light",
    position: props?.position || "bottom-right",
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: props?.autoClose ?? 4500,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    delay: props?.delay ?? 0,
    type,
    transition: Slide,
    className: `${props?.className ?? ""}`,
    style: { borderRadius: theme.borderRadius },
    toastId: props?.toastId,
    isLoading: props?.isLoading,
    onOpen: props?.onOpen,
    onClose: props?.onClose,
    onClick: props?.onClick,
    closeButton: props?.closeButton,
    icon: props?.icon,
    role: props?.role,
  };
};

export const toast = (content: ToastContent, props?: IToastProps) => {
  return ReactToastify(content, convertProps(props));
};

export const updateToast = (
  tid: ToastId,
  opt?: {
    content?: ToastContent;
    props?: IToastProps;
  }
) =>
  ReactToastify.update(tid, {
    ...convertProps(opt?.props),
    render: opt?.content,
  });
export const removeToast = (tid?: ToastId) => ReactToastify.dismiss(tid);
export const isToastDisplaying = (tid: ToastId): boolean =>
  ReactToastify.isActive(tid);
