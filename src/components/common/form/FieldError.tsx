import classNames from "classnames";
import React from "react";

const FieldError: React.FC<{ error?: string; className?: string }> = ({
  error,
  className,
}) => {
  if (!error) return null;
  return (
    <>
      <p className={classNames(`text-sm mb-1 text-red-600`, className)}>
        {error}
      </p>
    </>
  );
};

export default FieldError;
