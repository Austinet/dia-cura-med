import React from "react";

const ErrorMessage = ({
  message,
  trigger,
}: {
  message: string;
  trigger: boolean;
}) => {
  if (trigger) {
    return <>{trigger && <span className="text-red-600">{message}</span>}</>;
  }
};

export default ErrorMessage;
