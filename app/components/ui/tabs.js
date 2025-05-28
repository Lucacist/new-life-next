"use client";

import React, { createContext, useState, useContext } from 'react';

// Création du contexte pour les tabs
const TabsContext = createContext(null);

export function Tabs({ children, defaultValue, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = "" }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`${className} ${isActive ? 'active-tab' : ''}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = "" }) {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div className={className} role="tabpanel">
      {children}
    </div>
  );
}
