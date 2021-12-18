import React from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from "classnames";

type Props = {
  title?: string;
  onDrop: (files: File[]) => void;
  mimeTypes?: string[];
  isLoading?: boolean;
  className?: string;
};
export const FileDrop = ({
  title = 'Click or Drag and drop files here',
  onDrop,
  isLoading,
  mimeTypes = [],
  className
}: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <button
      {...getRootProps()}
      className={classNames(className, { 'highlighted': isDragActive, 'loading': isLoading})}>
      <input {...getInputProps()} accept={mimeTypes.join(',')} />
      <span>{isLoading ? 'Uploading...' : title}</span>
    </button>
  );
};

