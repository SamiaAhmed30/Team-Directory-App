import React, { useState, useMemo } from 'react';
import { User, SortOption, SortDropdownOption } from '@/types';
import { initialUsers } from '@/data/users';
import UserCard from '@/components/UserCard';
import SearchBar from '@/components/SearchBar';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import AddUserModal from '@/components/AddUserModal';

const sortOptions: SortDropdownOption[] = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'role-asc', label: 'Role (A-Z)' },
  { value: 'role-desc', label: 'Role (Z-A)' },
];

function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'role-asc':
          return a.role.localeCompare(b.role);
        case 'role-desc':
          return b.role.localeCompare(a.role);
        default:
          return 0;
      }
    });

   
    const favoriteUsers = filtered.filter((user) => favorites.has(user.id));
    const nonFavoriteUsers = filtered.filter((user) => !favorites.has(user.id));

    return [...favoriteUsers, ...nonFavoriteUsers];
  }, [users, searchTerm, sortBy, favorites]);

  const toggleFavorite = (userId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(userId)) {
        newFavorites.delete(userId);
      } else {
        newFavorites.add(userId);
      }
      return newFavorites;
    });
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Directory</h1>
          <p className="text-gray-600">Manage and explore our amazing team members</p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name or role..."
              className="w-full"
            />
          </div>
          
          <div className="flex gap-4 flex-col sm:flex-row">
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
              label="Sort by"
              className="min-w-[150px]"
            />
            
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              className="whitespace-nowrap"
            >
              + Add Member
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Total: {users.length} members</span>
          <span>Favorites: {favorites.size}</span>
          <span>Showing: {filteredAndSortedUsers.length}</span>
        </div>

        {/* User Grid */}
        {filteredAndSortedUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first team member'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isFavorite={favorites.has(user.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={addUser}
        />
      </div>
    </div>
  );
}

export default App;