import React from 'react';
import { User } from '@/types';
import Button from './Button';

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isFavorite, onToggleFavorite }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 ${isFavorite ? 'ring-2 ring-yellow-400' : ''}`}>
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=white&size=64`;
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex items-center">
            {user.name}
            {isFavorite && (
              <span className="ml-2 text-yellow-500">
                ⭐
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600 truncate">{user.role}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => onToggleFavorite(user.id)}
          variant={isFavorite ? 'favorite' : 'secondary'}
          size="sm"
        >
          {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;