import React, { createContext, useContext, useState, ReactNode } from "react";

interface ArticleModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setRefetch: (refetch: () => void) => void;
  refetch: (() => void) | null;
}

const ArticleModalContext = createContext<ArticleModalContextType | undefined>(
  undefined
);

export const ArticleModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState<(() => void) | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ArticleModalContext.Provider
      value={{ isOpen, openModal, closeModal, refetch, setRefetch }}
    >
      {children}
    </ArticleModalContext.Provider>
  );
};

export const useArticleModal = (): ArticleModalContextType => {
  const context = useContext(ArticleModalContext);
  if (!context) {
    throw new Error(
      "useArticleModal debe usarse dentro de un ArticleModalProvider"
    );
  }
  return context;
};
