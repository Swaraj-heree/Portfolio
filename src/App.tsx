import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LenisProvider } from '@/lib/LenisProvider';
import { ThemeProvider } from '@/styles/ThemeProvider';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  );
};

export default App;