"use client";

import React, { createContext, useContext, useState } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reportsData, setReportsData] = useState({});
  const [loading, setLoading] = useState({});

  return (
    <ReportsContext.Provider
      value={{ reportsData, setReportsData, loading, setLoading }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => useContext(ReportsContext);
