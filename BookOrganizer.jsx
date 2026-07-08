import React, { useState, useEffect, useCallback } from 'react';

// ============================================================================
// HOOK PERSONALIZADO: useLocalStorage
// ============================================================================
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error leyendo localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// ============================================================================
// COMPONENTE: BookCard
// ============================================================================
const BookCard = ({ book, onUpdate, onDelete, onDragStart, isDragOver }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${isDragOver ? 'opacity-50 bg-blue-50' : ''}`}>
      {/* Handle para drag */}
      <div
        draggable
        onDragStart={onDragStart}
        className="mb-3 cursor-grab active:cursor-grabbing p-2 -m-2 rounded hover:bg-gray-50 flex items-center justify-center"
        title="Arrastra para reordenar"
      >
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 5a2 2 0 11-4 0 2 2 0 014 0zM8 12a2 2 0 11-4 0 2 2 0 014 0zM8 19a2 2 0 11-4 0 2 2 0 014 0zM14 5a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM14 19a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      {/* Título del libro */}
      <input
        type="text"
        value={book.title}
        onChange={(e) => onUpdate(book.id, 'title', e.target.value)}
        placeholder="Título del libro"
        className="w-full text-lg font-semibold text-gray-900 mb-2 bg-transparent border-b border-gray-200 focus:border-blue-500 focus:outline-none pb-2"
      />

      {/* Autor */}
      <input
        type="text"
        value={book.author}
        onChange={(e) => onUpdate(book.id, 'author', e.target.value)}
        placeholder="Autor"
        className="w-full text-sm text-gray-600 mb-3 bg-transparent border-b border-gray-200 focus:border-blue-500 focus:outline-none pb-1"
      />

      {/* Descripción */}
      <textarea
        value={book.description}
        onChange={(e) => onUpdate(book.id, 'description', e.target.value)}
        placeholder="Descripción, notas o comentarios del libro..."
        className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
        rows="3"
      />

      {/* Botón de eliminar */}
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onDelete(book.id)}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE: App Principal
// ============================================================================
export default function BookOrganizer() {
  const [books, setBooks] = useLocalStorage('books', [
    {
      id: 1,
      title: 'El Quijote',
      author: 'Miguel de Cervantes',
      description: 'Una novela clásica sobre las aventuras de un hidalgo. Arrastra el ícono de puntos para reordenar tus libros.',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [nextId, setNextId] = useState(2);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  // Crear nuevo libro
  const handleAddBook = () => {
    if (newTitle.trim() === '') {
      alert('Por favor, ingresa el título del libro');
      return;
    }

    const newBook = {
      id: nextId,
      title: newTitle,
      author: newAuthor,
      description: '',
    };

    setBooks([...books, newBook]);
    setNextId(nextId + 1);
    setNewTitle('');
    setNewAuthor('');
  };

  // Actualizar libro (título, autor o descripción)
  const handleUpdateBook = (id, field, value) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, [field]: value } : book
    ));
  };

  // Eliminar libro
  const handleDeleteBook = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  // Manejo de drag
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      const oldIndex = books.findIndex(b => b.id === draggedId);
      const newIndex = books.findIndex(b => b.id === targetId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newBooks = [...books];
        [newBooks[oldIndex], newBooks[newIndex]] = [newBooks[newIndex], newBooks[oldIndex]];
        setBooks(newBooks);
      }
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            📚 Organizador de Libros
          </h1>
          <p className="text-gray-600">Gestiona tu colección de libros y agrega notas sobre cada uno</p>
        </div>

        {/* Input para crear nuevo libro */}
        <div className="mb-8 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="space-y-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddBook()}
              placeholder="Título del libro..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddBook()}
              placeholder="Autor..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddBook}
              className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium"
            >
              + Agregar Libro
            </button>
          </div>
        </div>

        {/* Lista de libros */}
        <div className="space-y-4">
          {books.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📖 No hay libros aún.</p>
              <p className="text-gray-400 text-sm mt-2">¡Agrega tu primer libro para comenzar!</p>
            </div>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                onDragOver={(e) => handleDragOver(e, book.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, book.id)}
              >
                <BookCard
                  book={book}
                  onUpdate={handleUpdateBook}
                  onDelete={handleDeleteBook}
                  onDragStart={(e) => handleDragStart(e, book.id)}
                  isDragOver={dragOverId === book.id}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {books.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              {books.length} {books.length === 1 ? 'libro' : 'libros'} en tu colección
            </p>
            <p className="text-xs text-gray-400 mt-2">
              💾 Los datos se guardan automáticamente en tu navegador
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
